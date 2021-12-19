SET check_function_bodies = false;
CREATE FUNCTION public."set_current_timestamp_updatedAt"() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updatedAt" = NOW();
  RETURN _new;
END;
$$;
CREATE TABLE public."Account" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "userId" uuid NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    "refreshToken" text,
    "accessToken" text,
    "expiresAt" timestamp with time zone,
    "tokenType" text,
    scope text,
    "idToken" text,
    "sessionState" text,
    "oauthTokenSecret" text,
    "oauthToken" text
);
CREATE TABLE public."Comment" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "pageId" uuid NOT NULL,
    "parentId" uuid,
    "userId" uuid NOT NULL,
    content jsonb NOT NULL,
    "deletedAt" timestamp with time zone
);
CREATE TABLE public."Like" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "commentId" uuid NOT NULL,
    "userId" uuid NOT NULL
);
CREATE TABLE public."Member" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "teamId" uuid NOT NULL,
    "userId" uuid NOT NULL,
    role text NOT NULL
);
CREATE TABLE public."Page" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    url text NOT NULL,
    title text,
    "projectId" uuid NOT NULL
);
CREATE TABLE public."Project" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    name text NOT NULL,
    "teamId" uuid,
    "userId" uuid,
    theme jsonb,
    domain text NOT NULL
);
CREATE TABLE public."Role" (
    value text NOT NULL,
    comment text
);
COMMENT ON TABLE public."Role" IS 'User''s role in teams';
CREATE TABLE public."Session" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "sessionToken" text NOT NULL,
    "userId" uuid NOT NULL,
    expires timestamp with time zone NOT NULL
);
CREATE TABLE public."Team" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    name text NOT NULL,
    uid text
);
CREATE TABLE public."User" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    name text,
    email text,
    "emailVerified" timestamp with time zone,
    image text,
    username text,
    type text,
    bio text,
    website text,
    "twitterUserName" text
);
CREATE TABLE public."UserType" (
    value text NOT NULL,
    comment text NOT NULL
);
CREATE TABLE public."VerificationToken" (
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp with time zone NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);
ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_providerAccountId_provider_key" UNIQUE ("providerAccountId", provider);
ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Like"
    ADD CONSTRAINT "Like_commentId_userId_key" UNIQUE ("commentId", "userId");
ALTER TABLE ONLY public."Like"
    ADD CONSTRAINT "Like_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Member"
    ADD CONSTRAINT "Member_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Member"
    ADD CONSTRAINT "Member_teamId_userId_key" UNIQUE ("teamId", "userId");
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
ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_sessionToken_key" UNIQUE ("sessionToken");
ALTER TABLE ONLY public."Team"
    ADD CONSTRAINT "Team_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Team"
    ADD CONSTRAINT "Team_uid_key" UNIQUE (uid);
ALTER TABLE ONLY public."UserType"
    ADD CONSTRAINT "UserType_pkey" PRIMARY KEY (value);
ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_email_key" UNIQUE (email);
ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_username_key" UNIQUE (username);
ALTER TABLE ONLY public."VerificationToken"
    ADD CONSTRAINT "VerificationToken_identifier_token_key" UNIQUE (identifier, token);
ALTER TABLE ONLY public."VerificationToken"
    ADD CONSTRAINT "VerificationToken_pkey" PRIMARY KEY (id);
CREATE TRIGGER "set_public_Comment_updatedAt" BEFORE UPDATE ON public."Comment" FOR EACH ROW EXECUTE FUNCTION public."set_current_timestamp_updatedAt"();
COMMENT ON TRIGGER "set_public_Comment_updatedAt" ON public."Comment" IS 'trigger to set value of column "updatedAt" to current timestamp on row update';
CREATE TRIGGER "set_public_Like_updatedAt" BEFORE UPDATE ON public."Like" FOR EACH ROW EXECUTE FUNCTION public."set_current_timestamp_updatedAt"();
COMMENT ON TRIGGER "set_public_Like_updatedAt" ON public."Like" IS 'trigger to set value of column "updatedAt" to current timestamp on row update';
CREATE TRIGGER "set_public_Member_updatedAt" BEFORE UPDATE ON public."Member" FOR EACH ROW EXECUTE FUNCTION public."set_current_timestamp_updatedAt"();
COMMENT ON TRIGGER "set_public_Member_updatedAt" ON public."Member" IS 'trigger to set value of column "updatedAt" to current timestamp on row update';
CREATE TRIGGER "set_public_Page_updatedAt" BEFORE UPDATE ON public."Page" FOR EACH ROW EXECUTE FUNCTION public."set_current_timestamp_updatedAt"();
COMMENT ON TRIGGER "set_public_Page_updatedAt" ON public."Page" IS 'trigger to set value of column "updatedAt" to current timestamp on row update';
CREATE TRIGGER "set_public_Project_updatedAt" BEFORE UPDATE ON public."Project" FOR EACH ROW EXECUTE FUNCTION public."set_current_timestamp_updatedAt"();
COMMENT ON TRIGGER "set_public_Project_updatedAt" ON public."Project" IS 'trigger to set value of column "updatedAt" to current timestamp on row update';
CREATE TRIGGER "set_public_Session_updatedAt" BEFORE UPDATE ON public."Session" FOR EACH ROW EXECUTE FUNCTION public."set_current_timestamp_updatedAt"();
COMMENT ON TRIGGER "set_public_Session_updatedAt" ON public."Session" IS 'trigger to set value of column "updatedAt" to current timestamp on row update';
CREATE TRIGGER "set_public_Team_updatedAt" BEFORE UPDATE ON public."Team" FOR EACH ROW EXECUTE FUNCTION public."set_current_timestamp_updatedAt"();
COMMENT ON TRIGGER "set_public_Team_updatedAt" ON public."Team" IS 'trigger to set value of column "updatedAt" to current timestamp on row update';
CREATE TRIGGER "set_public_User_updatedAt" BEFORE UPDATE ON public."User" FOR EACH ROW EXECUTE FUNCTION public."set_current_timestamp_updatedAt"();
COMMENT ON TRIGGER "set_public_User_updatedAt" ON public."User" IS 'trigger to set value of column "updatedAt" to current timestamp on row update';
ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES public."Page"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public."Comment"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."Like"
    ADD CONSTRAINT "Like_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES public."Comment"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."Like"
    ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."Member"
    ADD CONSTRAINT "Member_role_fkey" FOREIGN KEY (role) REFERENCES public."Role"(value) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."Member"
    ADD CONSTRAINT "Member_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public."Team"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."Member"
    ADD CONSTRAINT "Member_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."Page"
    ADD CONSTRAINT "Page_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public."Team"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_type_fkey" FOREIGN KEY (type) REFERENCES public."UserType"(value) ON UPDATE CASCADE ON DELETE CASCADE;
