--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4 (Ubuntu 12.4-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.4 (Ubuntu 12.4-0ubuntu0.20.04.1)

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

ALTER TABLE ONLY public.store DROP CONSTRAINT store_pkey;
ALTER TABLE ONLY public.list DROP CONSTRAINT list_pkey;
ALTER TABLE ONLY public.grocery_store DROP CONSTRAINT grocery_store_pkey;
ALTER TABLE ONLY public.grocery DROP CONSTRAINT grocery_pkey;
ALTER TABLE ONLY public.glizzy_user DROP CONSTRAINT glizzy_user_username_key;
ALTER TABLE ONLY public.glizzy_user DROP CONSTRAINT glizzy_user_pkey;
ALTER TABLE public.store ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.list ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.grocery_store ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.grocery ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.glizzy_user ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE public.store_id_seq;
DROP TABLE public.store;
DROP SEQUENCE public.list_id_seq;
DROP TABLE public.list;
DROP SEQUENCE public.grocery_store_id_seq;
DROP TABLE public.grocery_store;
DROP SEQUENCE public.grocery_id_seq;
DROP TABLE public.grocery;
DROP SEQUENCE public.glizzy_user_id_seq;
DROP TABLE public.glizzy_user;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: glizzy_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.glizzy_user (
    id integer NOT NULL,
    username character varying(100) NOT NULL,
    password character varying(100) NOT NULL
);


ALTER TABLE public.glizzy_user OWNER TO postgres;

--
-- Name: glizzy_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.glizzy_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.glizzy_user_id_seq OWNER TO postgres;

--
-- Name: glizzy_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.glizzy_user_id_seq OWNED BY public.glizzy_user.id;


--
-- Name: grocery; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.grocery (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    quantity integer DEFAULT 1 NOT NULL,
    store_id integer,
    price money,
    active boolean DEFAULT true NOT NULL,
    list_id integer NOT NULL
);


ALTER TABLE public.grocery OWNER TO postgres;

--
-- Name: grocery_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.grocery_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.grocery_id_seq OWNER TO postgres;

--
-- Name: grocery_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.grocery_id_seq OWNED BY public.grocery.id;


--
-- Name: grocery_store; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.grocery_store (
    id integer NOT NULL,
    name character varying(20) NOT NULL
);


ALTER TABLE public.grocery_store OWNER TO postgres;

--
-- Name: grocery_store_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.grocery_store_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.grocery_store_id_seq OWNER TO postgres;

--
-- Name: grocery_store_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.grocery_store_id_seq OWNED BY public.grocery_store.id;


--
-- Name: list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.list (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.list OWNER TO postgres;

--
-- Name: list_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.list_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.list_id_seq OWNER TO postgres;

--
-- Name: list_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.list_id_seq OWNED BY public.list.id;


--
-- Name: store; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.store (
    id integer NOT NULL,
    name character varying(20)
);


ALTER TABLE public.store OWNER TO postgres;

--
-- Name: store_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.store_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.store_id_seq OWNER TO postgres;

--
-- Name: store_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.store_id_seq OWNED BY public.store.id;


--
-- Name: glizzy_user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.glizzy_user ALTER COLUMN id SET DEFAULT nextval('public.glizzy_user_id_seq'::regclass);


--
-- Name: grocery id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grocery ALTER COLUMN id SET DEFAULT nextval('public.grocery_id_seq'::regclass);


--
-- Name: grocery_store id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grocery_store ALTER COLUMN id SET DEFAULT nextval('public.grocery_store_id_seq'::regclass);


--
-- Name: list id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.list ALTER COLUMN id SET DEFAULT nextval('public.list_id_seq'::regclass);


--
-- Name: store id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.store ALTER COLUMN id SET DEFAULT nextval('public.store_id_seq'::regclass);


--
-- Data for Name: glizzy_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.glizzy_user (id, username, password) FROM stdin;
1	glizzygatherer	letmein
\.


--
-- Data for Name: grocery; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.grocery (id, name, quantity, store_id, price, active, list_id) FROM stdin;
1	Eggs	3	1	$3.99	t	1
2	Bread	2	3	$4.99	t	1
\.


--
-- Data for Name: grocery_store; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.grocery_store (id, name) FROM stdin;
1	Target
2	Walmart
3	Safeway
4	Whole Foods
5	King Soopers
\.


--
-- Data for Name: list; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.list (id, name, user_id) FROM stdin;
1	The First List	1
\.


--
-- Data for Name: store; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.store (id, name) FROM stdin;
\.


--
-- Name: glizzy_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.glizzy_user_id_seq', 1, true);


--
-- Name: grocery_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.grocery_id_seq', 2, true);


--
-- Name: grocery_store_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.grocery_store_id_seq', 5, true);


--
-- Name: list_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.list_id_seq', 1, true);


--
-- Name: store_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.store_id_seq', 1, false);


--
-- Name: glizzy_user glizzy_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.glizzy_user
    ADD CONSTRAINT glizzy_user_pkey PRIMARY KEY (id);


--
-- Name: glizzy_user glizzy_user_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.glizzy_user
    ADD CONSTRAINT glizzy_user_username_key UNIQUE (username);


--
-- Name: grocery grocery_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grocery
    ADD CONSTRAINT grocery_pkey PRIMARY KEY (id);


--
-- Name: grocery_store grocery_store_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grocery_store
    ADD CONSTRAINT grocery_store_pkey PRIMARY KEY (id);


--
-- Name: list list_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.list
    ADD CONSTRAINT list_pkey PRIMARY KEY (id);


--
-- Name: store store_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.store
    ADD CONSTRAINT store_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

