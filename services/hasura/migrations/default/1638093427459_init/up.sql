SET check_function_bodies = false;
CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
CREATE TABLE public."AccountProvider" (
    value text NOT NULL,
    comment text NOT NULL
);
CREATE TABLE public."AnonymousSession" (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    hostname text,
    browser text,
    os text NOT NULL,
    screen text NOT NULL,
    language text NOT NULL,
    country text NOT NULL,
    device text NOT NULL,
    "projectId" uuid NOT NULL
);
COMMENT ON TABLE public."AnonymousSession" IS 'Session for events';
COMMENT ON COLUMN public."AnonymousSession".screen IS 'Screen dimensions, it should be {width} x {height}';
COMMENT ON COLUMN public."AnonymousSession".device IS 'desktop, laptop or mobile';
CREATE TABLE public."Comment" (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    "pageId" uuid NOT NULL,
    "parentId" uuid,
    depth integer NOT NULL,
    "userId" integer NOT NULL,
    content jsonb NOT NULL,
    "deletedAt" timestamp with time zone
);
CREATE TABLE public."Event" (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    type text NOT NULL,
    url text NOT NULL,
    "sessionId" uuid NOT NULL,
    referrer text,
    params jsonb
);
COMMENT ON TABLE public."Event" IS 'Event for telemetry';
COMMENT ON COLUMN public."Event".type IS 'Event type, e.g. ''pageview'', ''buttonClick''';
CREATE TABLE public."Like" (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    "commentId" uuid NOT NULL,
    "compoundId" text NOT NULL,
    "userId" integer NOT NULL
);
COMMENT ON COLUMN public."Like"."compoundId" IS 'Make sure a user like a comment no more than once';
CREATE TABLE public."Member" (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    "teamId" uuid NOT NULL,
    role text NOT NULL,
    "userId" integer NOT NULL
);
CREATE TABLE public."Page" (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    url text NOT NULL,
    title text NOT NULL,
    "projectId" uuid NOT NULL
);
CREATE TABLE public."Project" (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    name text NOT NULL,
    "teamId" uuid,
    theme jsonb,
    domain text NOT NULL,
    "userId" integer
);
CREATE TABLE public."Role" (
    value text NOT NULL,
    comment text
);
COMMENT ON TABLE public."Role" IS 'This role table isn''t map to hasura role, use UserType instead.';
CREATE TABLE public."Team" (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    name text NOT NULL,
    uid text
);
CREATE TABLE public."UserType" (
    value text NOT NULL,
    comment text
);
COMMENT ON TABLE public."UserType" IS 'UserType map to Hasura role';
CREATE TABLE public.accounts (
    id integer NOT NULL,
    compound_id character varying NOT NULL,
    user_id integer NOT NULL,
    provider_type character varying NOT NULL,
    provider_id character varying NOT NULL,
    provider_account_id character varying NOT NULL,
    refresh_token text,
    access_token text,
    access_token_expires timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE SEQUENCE public.accounts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.accounts_id_seq OWNED BY public.accounts.id;
CREATE TABLE public.sessions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    expires timestamp with time zone NOT NULL,
    session_token character varying NOT NULL,
    access_token character varying NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;
CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying,
    email character varying,
    email_verified timestamp with time zone,
    image character varying,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    username character varying,
    type text,
    bio text,
    website text,
    "twitterUserName" text
);
CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
CREATE TABLE public.verification_requests (
    id integer NOT NULL,
    identifier character varying NOT NULL,
    token character varying NOT NULL,
    expires timestamp with time zone NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE SEQUENCE public.verification_requests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.verification_requests_id_seq OWNED BY public.verification_requests.id;
ALTER TABLE ONLY public.accounts ALTER COLUMN id SET DEFAULT nextval('public.accounts_id_seq'::regclass);
ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);
ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
ALTER TABLE ONLY public.verification_requests ALTER COLUMN id SET DEFAULT nextval('public.verification_requests_id_seq'::regclass);
ALTER TABLE ONLY public."AccountProvider"
    ADD CONSTRAINT "AccountProvider_pkey" PRIMARY KEY (value);
ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Event"
    ADD CONSTRAINT "Event_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Like"
    ADD CONSTRAINT "Like_compoundId_key" UNIQUE ("compoundId");
ALTER TABLE ONLY public."Like"
    ADD CONSTRAINT "Like_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Member"
    ADD CONSTRAINT "Member_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY (id);
ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);
ALTER TABLE ONLY public.verification_requests
    ADD CONSTRAINT "PK_c5d405ea25e8abd5b0b096a4f6f" PRIMARY KEY (id);
ALTER TABLE ONLY public."Page"
    ADD CONSTRAINT "Page_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Page"
    ADD CONSTRAINT "Page_url_key" UNIQUE (url);
ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_domain_key" UNIQUE (domain);
ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_pkey" PRIMARY KEY (value);
ALTER TABLE ONLY public."AnonymousSession"
    ADD CONSTRAINT "Session_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Team"
    ADD CONSTRAINT "Team_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Team"
    ADD CONSTRAINT "Team_uid_key" UNIQUE (uid);
ALTER TABLE ONLY public.verification_requests
    ADD CONSTRAINT "UQ_77287cef70a4627091ae6d19c4d" UNIQUE (token);
ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT "UQ_95843cea26fc65b1a9d9b6e1d2b" UNIQUE (compound_id);
ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "UQ_b02a7acc05fe8194bed8433cf25" UNIQUE (access_token);
ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "UQ_f10db2949bbea55b44f31108e1a" UNIQUE (session_token);
ALTER TABLE ONLY public."UserType"
    ADD CONSTRAINT "UserType_pkey" PRIMARY KEY (value);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
CREATE INDEX "providerAccountId" ON public.accounts USING btree (provider_account_id);
CREATE INDEX "providerId" ON public.accounts USING btree (provider_id);
CREATE INDEX "userId" ON public.accounts USING btree (user_id);
CREATE TRIGGER "set_public_Comment_updated_at" BEFORE UPDATE ON public."Comment" FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_public_Comment_updated_at" ON public."Comment" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER "set_public_Event_updated_at" BEFORE UPDATE ON public."Event" FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_public_Event_updated_at" ON public."Event" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER "set_public_Like_updated_at" BEFORE UPDATE ON public."Like" FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_public_Like_updated_at" ON public."Like" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER "set_public_Member_updated_at" BEFORE UPDATE ON public."Member" FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_public_Member_updated_at" ON public."Member" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER "set_public_Page_updated_at" BEFORE UPDATE ON public."Page" FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_public_Page_updated_at" ON public."Page" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER "set_public_Project_updated_at" BEFORE UPDATE ON public."Project" FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_public_Project_updated_at" ON public."Project" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER "set_public_Session_updated_at" BEFORE UPDATE ON public."AnonymousSession" FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_public_Session_updated_at" ON public."AnonymousSession" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER "set_public_Team_updated_at" BEFORE UPDATE ON public."Team" FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_public_Team_updated_at" ON public."Team" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES public."Page"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public."Comment"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."Event"
    ADD CONSTRAINT "Event_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES public."AnonymousSession"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."Like"
    ADD CONSTRAINT "Like_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES public."Comment"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."Like"
    ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."Member"
    ADD CONSTRAINT "Member_role_fkey" FOREIGN KEY (role) REFERENCES public."Role"(value) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."Member"
    ADD CONSTRAINT "Member_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public."Team"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."Member"
    ADD CONSTRAINT "Member_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."Page"
    ADD CONSTRAINT "Page_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public."Team"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."AnonymousSession"
    ADD CONSTRAINT "Session_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_type_fkey FOREIGN KEY (type) REFERENCES public."UserType"(value) ON UPDATE CASCADE ON DELETE SET NULL;
