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
CREATE TABLE public."Account" (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    "compoundId" text NOT NULL,
    "userId" uuid
);
COMMENT ON TABLE public."Account" IS 'Account info for third part auth providers';
COMMENT ON COLUMN public."Account"."compoundId" IS 'providerName + providerAccountId = compoundId, to make sure the account unique.';
CREATE TABLE public."AccountProvider" (
    value text NOT NULL,
    comment text NOT NULL
);
CREATE TABLE public."Comment" (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    "userId" uuid NOT NULL,
    content jsonb NOT NULL,
    "pageId" uuid NOT NULL,
    "replyId" uuid NOT NULL,
    "parentId" uuid NOT NULL
);
CREATE TABLE public."Like" (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    "userId" uuid NOT NULL,
    "commentId" uuid NOT NULL
);
CREATE TABLE public."Member" (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    "userId" uuid NOT NULL,
    "teamId" uuid NOT NULL,
    role text NOT NULL
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
    "userId" uuid
);
CREATE TABLE public."Role" (
    value text NOT NULL,
    comment text
);
CREATE TABLE public."Team" (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    name text NOT NULL,
    uid text
);
CREATE TABLE public."User" (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    "displayName" text NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    avatar text NOT NULL,
    type text NOT NULL
);
COMMENT ON COLUMN public."User".username IS 'Unique name, used for search a person, e.g. at some one in a comment.';
CREATE TABLE public."UserType" (
    value text NOT NULL,
    comment text
);
COPY public."Account" (id, created_at, updated_at, provider, "providerAccountId", "compoundId", "userId") FROM stdin;
d13a82b2-3391-4a82-b6d6-57d9a401f5f2	2021-03-03 15:21:14.857452+00	2021-03-03 15:21:16.012766+00	GitHub	7880675	GitHub:7880675	304cdf07-61e2-4c8f-bac7-22f2e39f1e83
\.
COPY public."AccountProvider" (value, comment) FROM stdin;
GitHub	
Google	
Apple	
Facebook	
Twitter	
Microsoft	
\.
COPY public."Comment" (id, created_at, updated_at, "userId", content, "pageId", "replyId", "parentId") FROM stdin;
\.
COPY public."Like" (id, created_at, updated_at, "userId", "commentId") FROM stdin;
\.
COPY public."Member" (id, created_at, updated_at, "userId", "teamId", role) FROM stdin;
\.
COPY public."Page" (id, created_at, updated_at, url, title, "projectId") FROM stdin;
\.
COPY public."Project" (id, created_at, updated_at, name, "teamId", "userId") FROM stdin;
\.
COPY public."Role" (value, comment) FROM stdin;
user	Logged in user
manager	Team manager for invite team member
admin	Administrator
anonymous	Anonymous
\.
COPY public."Team" (id, created_at, updated_at, name, uid) FROM stdin;
\.
COPY public."User" (id, created_at, updated_at, "displayName", username, email, avatar, type) FROM stdin;
304cdf07-61e2-4c8f-bac7-22f2e39f1e83	2021-03-03 15:21:16.012766+00	2021-03-03 15:21:16.012766+00	devrsi0n	devrsi0n	devrsi0n@gmail.com	https://avatars.githubusercontent.com/u/7880675?v=4	free
\.
COPY public."UserType" (value, comment) FROM stdin;
free	
pro	Paid user
\.
ALTER TABLE ONLY public."AccountProvider"
    ADD CONSTRAINT "AccountProvider_pkey" PRIMARY KEY (value);
ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_compoundId_key" UNIQUE ("compoundId");
ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Like"
    ADD CONSTRAINT "Like_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Member"
    ADD CONSTRAINT "Member_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Page"
    ADD CONSTRAINT "Page_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Page"
    ADD CONSTRAINT "Page_url_key" UNIQUE (url);
ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_pkey" PRIMARY KEY (value);
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
    ADD CONSTRAINT "User_uid_key" UNIQUE (username);
CREATE TRIGGER "set_public_Account_updated_at" BEFORE UPDATE ON public."Account" FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_public_Account_updated_at" ON public."Account" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER "set_public_Comment_updated_at" BEFORE UPDATE ON public."Comment" FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_public_Comment_updated_at" ON public."Comment" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER "set_public_Like_updated_at" BEFORE UPDATE ON public."Like" FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_public_Like_updated_at" ON public."Like" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER "set_public_Member_updated_at" BEFORE UPDATE ON public."Member" FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_public_Member_updated_at" ON public."Member" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER "set_public_Page_updated_at" BEFORE UPDATE ON public."Page" FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_public_Page_updated_at" ON public."Page" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER "set_public_Project_updated_at" BEFORE UPDATE ON public."Project" FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_public_Project_updated_at" ON public."Project" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER "set_public_Team_updated_at" BEFORE UPDATE ON public."Team" FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_public_Team_updated_at" ON public."Team" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER "set_public_User_updated_at" BEFORE UPDATE ON public."User" FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_public_User_updated_at" ON public."User" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_providerName_fkey" FOREIGN KEY (provider) REFERENCES public."AccountProvider"(value) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES public."Page"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public."Comment"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES public."Comment"(id) ON UPDATE CASCADE ON DELETE CASCADE;
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
ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_type_fkey" FOREIGN KEY (type) REFERENCES public."UserType"(value) ON UPDATE CASCADE ON DELETE CASCADE;
