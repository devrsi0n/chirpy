--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1 (Debian 14.1-1.pgdg110+1)
-- Dumped by pg_dump version 14.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: hdb_catalog; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA hdb_catalog;


ALTER SCHEMA hdb_catalog OWNER TO postgres;

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: gen_hasura_uuid(); Type: FUNCTION; Schema: hdb_catalog; Owner: postgres
--

CREATE FUNCTION hdb_catalog.gen_hasura_uuid() RETURNS uuid
    LANGUAGE sql
    AS $$select gen_random_uuid()$$;


ALTER FUNCTION hdb_catalog.gen_hasura_uuid() OWNER TO postgres;

--
-- Name: set_current_timestamp_updatedAt(); Type: FUNCTION; Schema: public; Owner: postgres
--

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


ALTER FUNCTION public."set_current_timestamp_updatedAt"() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: hdb_action_log; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_action_log (
    id uuid DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    action_name text,
    input_payload jsonb NOT NULL,
    request_headers jsonb NOT NULL,
    session_variables jsonb NOT NULL,
    response_payload jsonb,
    errors jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    response_received_at timestamp with time zone,
    status text NOT NULL,
    CONSTRAINT hdb_action_log_status_check CHECK ((status = ANY (ARRAY['created'::text, 'processing'::text, 'completed'::text, 'error'::text])))
);


ALTER TABLE hdb_catalog.hdb_action_log OWNER TO postgres;

--
-- Name: hdb_cron_event_invocation_logs; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_cron_event_invocation_logs (
    id text DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    event_id text,
    status integer,
    request json,
    response json,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE hdb_catalog.hdb_cron_event_invocation_logs OWNER TO postgres;

--
-- Name: hdb_cron_events; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_cron_events (
    id text DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    trigger_name text NOT NULL,
    scheduled_time timestamp with time zone NOT NULL,
    status text DEFAULT 'scheduled'::text NOT NULL,
    tries integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    next_retry_at timestamp with time zone,
    CONSTRAINT valid_status CHECK ((status = ANY (ARRAY['scheduled'::text, 'locked'::text, 'delivered'::text, 'error'::text, 'dead'::text])))
);


ALTER TABLE hdb_catalog.hdb_cron_events OWNER TO postgres;

--
-- Name: hdb_metadata; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_metadata (
    id integer NOT NULL,
    metadata json NOT NULL,
    resource_version integer DEFAULT 1 NOT NULL
);


ALTER TABLE hdb_catalog.hdb_metadata OWNER TO postgres;

--
-- Name: hdb_scheduled_event_invocation_logs; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_scheduled_event_invocation_logs (
    id text DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    event_id text,
    status integer,
    request json,
    response json,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE hdb_catalog.hdb_scheduled_event_invocation_logs OWNER TO postgres;

--
-- Name: hdb_scheduled_events; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_scheduled_events (
    id text DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    webhook_conf json NOT NULL,
    scheduled_time timestamp with time zone NOT NULL,
    retry_conf json,
    payload json,
    header_conf json,
    status text DEFAULT 'scheduled'::text NOT NULL,
    tries integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    next_retry_at timestamp with time zone,
    comment text,
    CONSTRAINT valid_status CHECK ((status = ANY (ARRAY['scheduled'::text, 'locked'::text, 'delivered'::text, 'error'::text, 'dead'::text])))
);


ALTER TABLE hdb_catalog.hdb_scheduled_events OWNER TO postgres;

--
-- Name: hdb_schema_notifications; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_schema_notifications (
    id integer NOT NULL,
    notification json NOT NULL,
    resource_version integer DEFAULT 1 NOT NULL,
    instance_id uuid NOT NULL,
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT hdb_schema_notifications_id_check CHECK ((id = 1))
);


ALTER TABLE hdb_catalog.hdb_schema_notifications OWNER TO postgres;

--
-- Name: hdb_version; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_version (
    hasura_uuid uuid DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    version text NOT NULL,
    upgraded_on timestamp with time zone NOT NULL,
    cli_state jsonb DEFAULT '{}'::jsonb NOT NULL,
    console_state jsonb DEFAULT '{}'::jsonb NOT NULL
);


ALTER TABLE hdb_catalog.hdb_version OWNER TO postgres;

--
-- Name: Account; Type: TABLE; Schema: public; Owner: postgres
--

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
    oauth_token text
);


ALTER TABLE public."Account" OWNER TO postgres;

--
-- Name: Comment; Type: TABLE; Schema: public; Owner: postgres
--

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


ALTER TABLE public."Comment" OWNER TO postgres;

--
-- Name: Like; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Like" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "commentId" uuid NOT NULL,
    "userId" uuid NOT NULL
);


ALTER TABLE public."Like" OWNER TO postgres;

--
-- Name: Member; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Member" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "teamId" uuid NOT NULL,
    "userId" uuid NOT NULL,
    role text NOT NULL
);


ALTER TABLE public."Member" OWNER TO postgres;

--
-- Name: Page; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Page" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    url text NOT NULL,
    title text,
    "projectId" uuid NOT NULL
);


ALTER TABLE public."Page" OWNER TO postgres;

--
-- Name: Project; Type: TABLE; Schema: public; Owner: postgres
--

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


ALTER TABLE public."Project" OWNER TO postgres;

--
-- Name: Role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Role" (
    value text NOT NULL,
    comment text
);


ALTER TABLE public."Role" OWNER TO postgres;

--
-- Name: TABLE "Role"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."Role" IS 'User''s role in teams';


--
-- Name: Team; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Team" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    name text NOT NULL,
    uid text
);


ALTER TABLE public."Team" OWNER TO postgres;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    name text,
    email text,
    "emailVerified" timestamp without time zone,
    image text,
    username text,
    type text,
    bio text,
    website text,
    "twitterUserName" text
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: UserType; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserType" (
    value text NOT NULL,
    comment text NOT NULL
);


ALTER TABLE public."UserType" OWNER TO postgres;

--
-- Name: VerificationToken; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."VerificationToken" (
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp with time zone NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE public."VerificationToken" OWNER TO postgres;

--
-- Data for Name: hdb_action_log; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_action_log (id, action_name, input_payload, request_headers, session_variables, response_payload, errors, created_at, response_received_at, status) FROM stdin;
\.


--
-- Data for Name: hdb_cron_event_invocation_logs; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_cron_event_invocation_logs (id, event_id, status, request, response, created_at) FROM stdin;
\.


--
-- Data for Name: hdb_cron_events; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_cron_events (id, trigger_name, scheduled_time, status, tries, created_at, next_retry_at) FROM stdin;
\.


--
-- Data for Name: hdb_metadata; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_metadata (id, metadata, resource_version) FROM stdin;
1	{"sources":[{"kind":"postgres","name":"default","tables":[{"object_relationships":[{"using":{"foreign_key_constraint_on":"userId"},"name":"user"}],"table":{"schema":"public","name":"Account"}},{"object_relationships":[{"using":{"foreign_key_constraint_on":"pageId"},"name":"page"},{"using":{"foreign_key_constraint_on":"parentId"},"name":"parent"},{"using":{"foreign_key_constraint_on":"userId"},"name":"user"}],"table":{"schema":"public","name":"Comment"},"array_relationships":[{"using":{"foreign_key_constraint_on":{"column":"parentId","table":{"schema":"public","name":"Comment"}}},"name":"replies"}]},{"object_relationships":[{"using":{"foreign_key_constraint_on":"commentId"},"name":"comment"},{"using":{"foreign_key_constraint_on":"userId"},"name":"user"}],"table":{"schema":"public","name":"Like"}},{"object_relationships":[{"using":{"foreign_key_constraint_on":"teamId"},"name":"team"},{"using":{"foreign_key_constraint_on":"userId"},"name":"user"}],"table":{"schema":"public","name":"Member"}},{"object_relationships":[{"using":{"foreign_key_constraint_on":"projectId"},"name":"project"}],"table":{"schema":"public","name":"Page"},"array_relationships":[{"using":{"foreign_key_constraint_on":{"column":"pageId","table":{"schema":"public","name":"Comment"}}},"name":"comments"}]},{"object_relationships":[{"using":{"foreign_key_constraint_on":"teamId"},"name":"team"},{"using":{"foreign_key_constraint_on":"userId"},"name":"user"}],"table":{"schema":"public","name":"Project"},"array_relationships":[{"using":{"foreign_key_constraint_on":{"column":"projectId","table":{"schema":"public","name":"Page"}}},"name":"pages"}]},{"is_enum":true,"table":{"schema":"public","name":"Role"},"array_relationships":[{"using":{"foreign_key_constraint_on":{"column":"role","table":{"schema":"public","name":"Member"}}},"name":"members"}]},{"table":{"schema":"public","name":"Team"},"array_relationships":[{"using":{"foreign_key_constraint_on":{"column":"teamId","table":{"schema":"public","name":"Member"}}},"name":"members"},{"using":{"foreign_key_constraint_on":{"column":"teamId","table":{"schema":"public","name":"Project"}}},"name":"projects"}]},{"table":{"schema":"public","name":"User"},"array_relationships":[{"using":{"foreign_key_constraint_on":{"column":"userId","table":{"schema":"public","name":"Account"}}},"name":"accounts"},{"using":{"foreign_key_constraint_on":{"column":"userId","table":{"schema":"public","name":"Comment"}}},"name":"comments"},{"using":{"foreign_key_constraint_on":{"column":"userId","table":{"schema":"public","name":"Like"}}},"name":"likes"},{"using":{"foreign_key_constraint_on":{"column":"userId","table":{"schema":"public","name":"Member"}}},"name":"members"},{"using":{"foreign_key_constraint_on":{"column":"userId","table":{"schema":"public","name":"Project"}}},"name":"projects"}]},{"is_enum":true,"table":{"schema":"public","name":"UserType"}},{"table":{"schema":"public","name":"VerificationToken"}}],"configuration":{"connection_info":{"use_prepared_statements":true,"database_url":{"from_env":"HASURA_GRAPHQL_DATABASE_URL"},"isolation_level":"read-committed","pool_settings":{"connection_lifetime":600,"retries":1,"idle_timeout":180,"max_connections":22}}}}],"version":3}	78
\.


--
-- Data for Name: hdb_scheduled_event_invocation_logs; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_scheduled_event_invocation_logs (id, event_id, status, request, response, created_at) FROM stdin;
\.


--
-- Data for Name: hdb_scheduled_events; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_scheduled_events (id, webhook_conf, scheduled_time, retry_conf, payload, header_conf, status, tries, created_at, next_retry_at, comment) FROM stdin;
\.


--
-- Data for Name: hdb_schema_notifications; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_schema_notifications (id, notification, resource_version, instance_id, updated_at) FROM stdin;
1	{"metadata":false,"remote_schemas":[],"sources":["default"]}	78	fa47c436-26bc-4093-9eaa-b3bc7e74bca5	2021-12-08 13:09:11.508184+00
\.


--
-- Data for Name: hdb_version; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_version (hasura_uuid, version, upgraded_on, cli_state, console_state) FROM stdin;
628cac8f-3cfc-45cb-974f-cc3b0ffbce4f	47	2021-12-08 13:07:32.100654+00	{"settings": {"migration_mode": "true"}, "migrations": {"default": {"1638093427459": false}}, "isStateCopyCompleted": true}	{"console_notifications": {"admin": {"date": "2021-12-18T02:29:31.620Z", "read": "default", "showBadge": false}}, "telemetryNotificationShown": true, "disablePreReleaseUpdateNotifications": true}
\.


--
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Account" (id, "userId", type, provider, "providerAccountId", "refreshToken", "accessToken", "expiresAt", "tokenType", scope, "idToken", "sessionState", "oauthTokenSecret", oauth_token) FROM stdin;
\.


--
-- Data for Name: Comment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Comment" (id, "createdAt", "updatedAt", "pageId", "parentId", "userId", content, "deletedAt") FROM stdin;
\.


--
-- Data for Name: Like; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Like" (id, "createdAt", "updatedAt", "commentId", "userId") FROM stdin;
\.


--
-- Data for Name: Member; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Member" (id, "createdAt", "updatedAt", "teamId", "userId", role) FROM stdin;
\.


--
-- Data for Name: Page; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Page" (id, "createdAt", "updatedAt", url, title, "projectId") FROM stdin;
\.


--
-- Data for Name: Project; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Project" (id, "createdAt", "updatedAt", name, "teamId", "userId", theme, domain) FROM stdin;
\.


--
-- Data for Name: Role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Role" (value, comment) FROM stdin;
user	Normal user
manager	Manager of a team
\.


--
-- Data for Name: Team; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Team" (id, "createdAt", "updatedAt", name, uid) FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, "createdAt", "updatedAt", name, email, "emailVerified", image, username, type, bio, website, "twitterUserName") FROM stdin;
\.


--
-- Data for Name: UserType; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UserType" (value, comment) FROM stdin;
free	
pro	Paid user
anonymous	Anonymous widget vsisitor
admin	Site administrator
\.


--
-- Data for Name: VerificationToken; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."VerificationToken" (identifier, token, expires, id) FROM stdin;
\.


--
-- Name: hdb_action_log hdb_action_log_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_action_log
    ADD CONSTRAINT hdb_action_log_pkey PRIMARY KEY (id);


--
-- Name: hdb_cron_event_invocation_logs hdb_cron_event_invocation_logs_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_cron_event_invocation_logs
    ADD CONSTRAINT hdb_cron_event_invocation_logs_pkey PRIMARY KEY (id);


--
-- Name: hdb_cron_events hdb_cron_events_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_cron_events
    ADD CONSTRAINT hdb_cron_events_pkey PRIMARY KEY (id);


--
-- Name: hdb_metadata hdb_metadata_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_metadata
    ADD CONSTRAINT hdb_metadata_pkey PRIMARY KEY (id);


--
-- Name: hdb_metadata hdb_metadata_resource_version_key; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_metadata
    ADD CONSTRAINT hdb_metadata_resource_version_key UNIQUE (resource_version);


--
-- Name: hdb_scheduled_event_invocation_logs hdb_scheduled_event_invocation_logs_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_scheduled_event_invocation_logs
    ADD CONSTRAINT hdb_scheduled_event_invocation_logs_pkey PRIMARY KEY (id);


--
-- Name: hdb_scheduled_events hdb_scheduled_events_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_scheduled_events
    ADD CONSTRAINT hdb_scheduled_events_pkey PRIMARY KEY (id);


--
-- Name: hdb_schema_notifications hdb_schema_notifications_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_schema_notifications
    ADD CONSTRAINT hdb_schema_notifications_pkey PRIMARY KEY (id);


--
-- Name: hdb_version hdb_version_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_version
    ADD CONSTRAINT hdb_version_pkey PRIMARY KEY (hasura_uuid);


--
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (id);


--
-- Name: Account Account_providerAccountId_provider_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_providerAccountId_provider_key" UNIQUE ("providerAccountId", provider);


--
-- Name: Comment Comment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_pkey" PRIMARY KEY (id);


--
-- Name: Like Like_commentId_userId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Like"
    ADD CONSTRAINT "Like_commentId_userId_key" UNIQUE ("commentId", "userId");


--
-- Name: Like Like_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Like"
    ADD CONSTRAINT "Like_pkey" PRIMARY KEY (id);


--
-- Name: Member Member_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Member"
    ADD CONSTRAINT "Member_pkey" PRIMARY KEY (id);


--
-- Name: Member Member_teamId_userId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Member"
    ADD CONSTRAINT "Member_teamId_userId_key" UNIQUE ("teamId", "userId");


--
-- Name: Page Page_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Page"
    ADD CONSTRAINT "Page_pkey" PRIMARY KEY (id);


--
-- Name: Page Page_url_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Page"
    ADD CONSTRAINT "Page_url_key" UNIQUE (url);


--
-- Name: Project Project_domain_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_domain_key" UNIQUE (domain);


--
-- Name: Project Project_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_pkey" PRIMARY KEY (id);


--
-- Name: Role Role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_pkey" PRIMARY KEY (value);


--
-- Name: Team Team_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Team"
    ADD CONSTRAINT "Team_pkey" PRIMARY KEY (id);


--
-- Name: Team Team_uid_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Team"
    ADD CONSTRAINT "Team_uid_key" UNIQUE (uid);


--
-- Name: UserType UserType_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserType"
    ADD CONSTRAINT "UserType_pkey" PRIMARY KEY (value);


--
-- Name: User User_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_email_key" UNIQUE (email);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: User User_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_username_key" UNIQUE (username);


--
-- Name: VerificationToken VerificationToken_identifier_token_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VerificationToken"
    ADD CONSTRAINT "VerificationToken_identifier_token_key" UNIQUE (identifier, token);


--
-- Name: VerificationToken VerificationToken_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VerificationToken"
    ADD CONSTRAINT "VerificationToken_pkey" PRIMARY KEY (id);


--
-- Name: hdb_cron_event_invocation_event_id; Type: INDEX; Schema: hdb_catalog; Owner: postgres
--

CREATE INDEX hdb_cron_event_invocation_event_id ON hdb_catalog.hdb_cron_event_invocation_logs USING btree (event_id);


--
-- Name: hdb_cron_event_status; Type: INDEX; Schema: hdb_catalog; Owner: postgres
--

CREATE INDEX hdb_cron_event_status ON hdb_catalog.hdb_cron_events USING btree (status);


--
-- Name: hdb_cron_events_unique_scheduled; Type: INDEX; Schema: hdb_catalog; Owner: postgres
--

CREATE UNIQUE INDEX hdb_cron_events_unique_scheduled ON hdb_catalog.hdb_cron_events USING btree (trigger_name, scheduled_time) WHERE (status = 'scheduled'::text);


--
-- Name: hdb_scheduled_event_status; Type: INDEX; Schema: hdb_catalog; Owner: postgres
--

CREATE INDEX hdb_scheduled_event_status ON hdb_catalog.hdb_scheduled_events USING btree (status);


--
-- Name: hdb_version_one_row; Type: INDEX; Schema: hdb_catalog; Owner: postgres
--

CREATE UNIQUE INDEX hdb_version_one_row ON hdb_catalog.hdb_version USING btree (((version IS NOT NULL)));


--
-- Name: Comment set_public_Comment_updatedAt; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER "set_public_Comment_updatedAt" BEFORE UPDATE ON public."Comment" FOR EACH ROW EXECUTE FUNCTION public."set_current_timestamp_updatedAt"();


--
-- Name: TRIGGER "set_public_Comment_updatedAt" ON "Comment"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TRIGGER "set_public_Comment_updatedAt" ON public."Comment" IS 'trigger to set value of column "updatedAt" to current timestamp on row update';


--
-- Name: Like set_public_Like_updatedAt; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER "set_public_Like_updatedAt" BEFORE UPDATE ON public."Like" FOR EACH ROW EXECUTE FUNCTION public."set_current_timestamp_updatedAt"();


--
-- Name: TRIGGER "set_public_Like_updatedAt" ON "Like"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TRIGGER "set_public_Like_updatedAt" ON public."Like" IS 'trigger to set value of column "updatedAt" to current timestamp on row update';


--
-- Name: Member set_public_Member_updatedAt; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER "set_public_Member_updatedAt" BEFORE UPDATE ON public."Member" FOR EACH ROW EXECUTE FUNCTION public."set_current_timestamp_updatedAt"();


--
-- Name: TRIGGER "set_public_Member_updatedAt" ON "Member"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TRIGGER "set_public_Member_updatedAt" ON public."Member" IS 'trigger to set value of column "updatedAt" to current timestamp on row update';


--
-- Name: Page set_public_Page_updatedAt; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER "set_public_Page_updatedAt" BEFORE UPDATE ON public."Page" FOR EACH ROW EXECUTE FUNCTION public."set_current_timestamp_updatedAt"();


--
-- Name: TRIGGER "set_public_Page_updatedAt" ON "Page"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TRIGGER "set_public_Page_updatedAt" ON public."Page" IS 'trigger to set value of column "updatedAt" to current timestamp on row update';


--
-- Name: Project set_public_Project_updatedAt; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER "set_public_Project_updatedAt" BEFORE UPDATE ON public."Project" FOR EACH ROW EXECUTE FUNCTION public."set_current_timestamp_updatedAt"();


--
-- Name: TRIGGER "set_public_Project_updatedAt" ON "Project"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TRIGGER "set_public_Project_updatedAt" ON public."Project" IS 'trigger to set value of column "updatedAt" to current timestamp on row update';


--
-- Name: Team set_public_Team_updatedAt; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER "set_public_Team_updatedAt" BEFORE UPDATE ON public."Team" FOR EACH ROW EXECUTE FUNCTION public."set_current_timestamp_updatedAt"();


--
-- Name: TRIGGER "set_public_Team_updatedAt" ON "Team"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TRIGGER "set_public_Team_updatedAt" ON public."Team" IS 'trigger to set value of column "updatedAt" to current timestamp on row update';


--
-- Name: User set_public_User_updatedAt; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER "set_public_User_updatedAt" BEFORE UPDATE ON public."User" FOR EACH ROW EXECUTE FUNCTION public."set_current_timestamp_updatedAt"();


--
-- Name: TRIGGER "set_public_User_updatedAt" ON "User"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TRIGGER "set_public_User_updatedAt" ON public."User" IS 'trigger to set value of column "updatedAt" to current timestamp on row update';


--
-- Name: hdb_cron_event_invocation_logs hdb_cron_event_invocation_logs_event_id_fkey; Type: FK CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_cron_event_invocation_logs
    ADD CONSTRAINT hdb_cron_event_invocation_logs_event_id_fkey FOREIGN KEY (event_id) REFERENCES hdb_catalog.hdb_cron_events(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: hdb_scheduled_event_invocation_logs hdb_scheduled_event_invocation_logs_event_id_fkey; Type: FK CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_scheduled_event_invocation_logs
    ADD CONSTRAINT hdb_scheduled_event_invocation_logs_event_id_fkey FOREIGN KEY (event_id) REFERENCES hdb_catalog.hdb_scheduled_events(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Account Account_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Comment Comment_pageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES public."Page"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Comment Comment_parentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public."Comment"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Comment Comment_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Like Like_commentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Like"
    ADD CONSTRAINT "Like_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES public."Comment"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Like Like_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Like"
    ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Member Member_role_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Member"
    ADD CONSTRAINT "Member_role_fkey" FOREIGN KEY (role) REFERENCES public."Role"(value) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Member Member_teamId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Member"
    ADD CONSTRAINT "Member_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public."Team"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Member Member_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Member"
    ADD CONSTRAINT "Member_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Page Page_projectId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Page"
    ADD CONSTRAINT "Page_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Project Project_teamId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public."Team"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Project Project_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: User User_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_type_fkey" FOREIGN KEY (type) REFERENCES public."UserType"(value) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

