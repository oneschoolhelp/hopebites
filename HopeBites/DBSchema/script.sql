CREATE TABLE IF NOT EXISTS public.volunteers
(
    id integer NOT NULL DEFAULT nextval('volunteers_id_seq'::regclass),
    first_name character varying(100) COLLATE pg_catalog."default",
    last_name character varying(100) COLLATE pg_catalog."default",
    email character varying(100) COLLATE pg_catalog."default",
    address character varying(255) COLLATE pg_catalog."default",
    city character varying(100) COLLATE pg_catalog."default",
    country character varying(100) COLLATE pg_catalog."default",
    message text COLLATE pg_catalog."default",
    CONSTRAINT volunteers_pkey PRIMARY KEY (id)
)