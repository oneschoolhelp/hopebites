--
-- PostgreSQL database dump
--

-- Dumped from database version 17.3
-- Dumped by pg_dump version 17.0

-- Started on 2025-02-27 18:55:38

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4902 (class 0 OID 16416)
-- Dependencies: 220
-- Data for Name: volunteers; Type: TABLE DATA; Schema: public; Owner: hopeadmin
--

INSERT INTO public.volunteers (id, first_name, last_name, email, address, city, country, message) VALUES (15, 'Tauseef ', 'Tanweer', 'tauseeftanweer@gmail.com', 'Hyderabad', 'Hyderabad', 'India ', 'happy to help');
INSERT INTO public.volunteers (id, first_name, last_name, email, address, city, country, message) VALUES (16, 'Adnan', 'Shaikh', 'adnanshaikh@gmail.com', 'Mumbai', 'Mumbai', 'India', 'Happy to be a Volunteer !');
INSERT INTO public.volunteers (id, first_name, last_name, email, address, city, country, message) VALUES (17, 'Asif', 'Hashmi', 'asifhashmi@gmail.com', 'Hyderabad', 'Hyderabad', 'India', 'Happy to help !');
INSERT INTO public.volunteers (id, first_name, last_name, email, address, city, country, message) VALUES (18, 'Sabiya ', 'Ashrafi', 'sabiyaashrafi@gmail.com', 'Hyderabad', 'Hyderabad', 'India', 'Happy to help.');


--
-- TOC entry 4909 (class 0 OID 0)
-- Dependencies: 219
-- Name: volunteers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hopeadmin
--

SELECT pg_catalog.setval('public.volunteers_id_seq', 18, true);


-- Completed on 2025-02-27 18:55:38

--
-- PostgreSQL database dump complete
--

