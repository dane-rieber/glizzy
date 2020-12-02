--
-- PostgreSQL database dump
--

-- Dumped from database version 12.5 (Ubuntu 12.5-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.5 (Ubuntu 12.5-0ubuntu0.20.04.1)

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

DROP DATABASE glizzy;
--
-- Name: glizzy; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE glizzy WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE glizzy OWNER TO postgres;

\connect glizzy

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
-- Name: store; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.store (
    id integer NOT NULL,
    name character varying(20) NOT NULL
);


ALTER TABLE public.store OWNER TO postgres;

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

ALTER SEQUENCE public.grocery_store_id_seq OWNED BY public.store.id;


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
-- Name: glizzy_user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.glizzy_user ALTER COLUMN id SET DEFAULT nextval('public.glizzy_user_id_seq'::regclass);


--
-- Name: grocery id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grocery ALTER COLUMN id SET DEFAULT nextval('public.grocery_id_seq'::regclass);


--
-- Name: list id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.list ALTER COLUMN id SET DEFAULT nextval('public.list_id_seq'::regclass);


--
-- Name: store id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.store ALTER COLUMN id SET DEFAULT nextval('public.grocery_store_id_seq'::regclass);


--
-- Data for Name: glizzy_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.glizzy_user (id, username, password) VALUES (1, 'glizzygatherer', 'letmein');
INSERT INTO public.glizzy_user (id, username, password) VALUES (2, 'dane', 'secret');
INSERT INTO public.glizzy_user (id, username, password) VALUES (3, 'kevin', 'kevinrocks');
INSERT INTO public.glizzy_user (id, username, password) VALUES (4, 'bruh27', 'password');
INSERT INTO public.glizzy_user (id, username, password) VALUES (5, 'newtestuser', '1234');


--
-- Data for Name: grocery; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.grocery (id, name, quantity, store_id, price, active, list_id) VALUES (1, 'Eggs', 3, 1, '$3.99', true, 1);
INSERT INTO public.grocery (id, name, quantity, store_id, price, active, list_id) VALUES (2, 'Bread', 2, 3, '$4.99', true, 1);
INSERT INTO public.grocery (id, name, quantity, store_id, price, active, list_id) VALUES (3, 'Lawn Mower', 1, 2, '$1,200.00', true, 2);
INSERT INTO public.grocery (id, name, quantity, store_id, price, active, list_id) VALUES (4, 'Eggs', 100, 4, '$0.99', true, 2);
INSERT INTO public.grocery (id, name, quantity, store_id, price, active, list_id) VALUES (5, 'Frozen Corn Dogs', 1, 4, '$7.00', true, 2);
INSERT INTO public.grocery (id, name, quantity, store_id, price, active, list_id) VALUES (6, 'White Claws', 2, 5, '$20.00', true, 2);
INSERT INTO public.grocery (id, name, quantity, store_id, price, active, list_id) VALUES (7, 'White Claws', 200, 1, '$19.00', true, 6);
INSERT INTO public.grocery (id, name, quantity, store_id, price, active, list_id) VALUES (8, 'White Claws', 1, 1, '$19.00', true, 1);
INSERT INTO public.grocery (id, name, quantity, store_id, price, active, list_id) VALUES (16, 'Butter', 1, 1, '$2.50', true, 7);
INSERT INTO public.grocery (id, name, quantity, store_id, price, active, list_id) VALUES (17, 'Doritos', 3, 2, '$3.29', true, 7);
INSERT INTO public.grocery (id, name, quantity, store_id, price, active, list_id) VALUES (19, 'Mac n Cheese', 5, 1, '$1.49', true, 7);
INSERT INTO public.grocery (id, name, quantity, store_id, price, active, list_id) VALUES (18, 'Frozen Pizza', 1, 5, '$9.99', false, 7);


--
-- Data for Name: list; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.list (id, name, user_id) VALUES (2, 'Danes List', 2);
INSERT INTO public.list (id, name, user_id) VALUES (3, 'General List', 3);
INSERT INTO public.list (id, name, user_id) VALUES (5, 'Danes Second List', 2);
INSERT INTO public.list (id, name, user_id) VALUES (6, 'Test List', 4);
INSERT INTO public.list (id, name, user_id) VALUES (7, 'Bruh List', 1);
INSERT INTO public.list (id, name, user_id) VALUES (1, 'The First List', 1);


--
-- Data for Name: store; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.store (id, name) VALUES (1, 'Target');
INSERT INTO public.store (id, name) VALUES (2, 'Walmart');
INSERT INTO public.store (id, name) VALUES (3, 'Safeway');
INSERT INTO public.store (id, name) VALUES (4, 'Whole Foods');
INSERT INTO public.store (id, name) VALUES (5, 'King Soopers');


--
-- Name: glizzy_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.glizzy_user_id_seq', 5, true);


--
-- Name: grocery_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.grocery_id_seq', 20, true);


--
-- Name: grocery_store_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.grocery_store_id_seq', 5, true);


--
-- Name: list_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.list_id_seq', 7, true);


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
-- Name: store grocery_store_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.store
    ADD CONSTRAINT grocery_store_pkey PRIMARY KEY (id);


--
-- Name: list list_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.list
    ADD CONSTRAINT list_pkey PRIMARY KEY (id);


--
-- Name: grocery fk_list_id_grocery; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grocery
    ADD CONSTRAINT fk_list_id_grocery FOREIGN KEY (list_id) REFERENCES public.list(id);


--
-- Name: grocery fk_store_id_grocery; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grocery
    ADD CONSTRAINT fk_store_id_grocery FOREIGN KEY (store_id) REFERENCES public.store(id);


--
-- Name: list fk_user_id_list; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.list
    ADD CONSTRAINT fk_user_id_list FOREIGN KEY (user_id) REFERENCES public.glizzy_user(id);


--
-- PostgreSQL database dump complete
--

