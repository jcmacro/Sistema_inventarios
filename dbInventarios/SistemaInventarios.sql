--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-08-03 21:09:19

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 24978)
-- Name: categorias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categorias (
    id_categoria integer NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion character varying(255)
);


ALTER TABLE public.categorias OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 24977)
-- Name: categorias_id_categoria_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categorias_id_categoria_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categorias_id_categoria_seq OWNER TO postgres;

--
-- TOC entry 4879 (class 0 OID 0)
-- Dependencies: 217
-- Name: categorias_id_categoria_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categorias_id_categoria_seq OWNED BY public.categorias.id_categoria;


--
-- TOC entry 224 (class 1259 OID 25008)
-- Name: historial_movimientos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.historial_movimientos (
    id_historial integer NOT NULL,
    tipo_movimiento character varying(50) NOT NULL,
    cantidad integer NOT NULL,
    fecha_movimiento timestamp without time zone,
    descripcion character varying(255),
    id_productos integer NOT NULL,
    id_usuario integer NOT NULL
);


ALTER TABLE public.historial_movimientos OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 25007)
-- Name: historial_movimientos_id_historial_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.historial_movimientos_id_historial_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.historial_movimientos_id_historial_seq OWNER TO postgres;

--
-- TOC entry 4880 (class 0 OID 0)
-- Dependencies: 223
-- Name: historial_movimientos_id_historial_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.historial_movimientos_id_historial_seq OWNED BY public.historial_movimientos.id_historial;


--
-- TOC entry 222 (class 1259 OID 24996)
-- Name: productos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.productos (
    id_productos integer NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion character varying(255),
    precio double precision NOT NULL,
    stock integer,
    fecha_agregado timestamp without time zone,
    id_categoria integer NOT NULL
);


ALTER TABLE public.productos OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 24995)
-- Name: productos_id_productos_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.productos_id_productos_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.productos_id_productos_seq OWNER TO postgres;

--
-- TOC entry 4881 (class 0 OID 0)
-- Dependencies: 221
-- Name: productos_id_productos_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.productos_id_productos_seq OWNED BY public.productos.id_productos;


--
-- TOC entry 220 (class 1259 OID 24987)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id_usuario integer NOT NULL,
    nombre_usuario character varying(80) NOT NULL,
    email character varying(120) NOT NULL,
    password character varying(255) NOT NULL,
    rol character varying(20),
    fecha_creacion timestamp without time zone
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24986)
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_usuario_seq OWNER TO postgres;

--
-- TOC entry 4882 (class 0 OID 0)
-- Dependencies: 219
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_usuario_seq OWNED BY public.usuarios.id_usuario;


--
-- TOC entry 4710 (class 2604 OID 24981)
-- Name: categorias id_categoria; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorias ALTER COLUMN id_categoria SET DEFAULT nextval('public.categorias_id_categoria_seq'::regclass);


--
-- TOC entry 4713 (class 2604 OID 25011)
-- Name: historial_movimientos id_historial; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial_movimientos ALTER COLUMN id_historial SET DEFAULT nextval('public.historial_movimientos_id_historial_seq'::regclass);


--
-- TOC entry 4712 (class 2604 OID 24999)
-- Name: productos id_productos; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos ALTER COLUMN id_productos SET DEFAULT nextval('public.productos_id_productos_seq'::regclass);


--
-- TOC entry 4711 (class 2604 OID 24990)
-- Name: usuarios id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuarios_id_usuario_seq'::regclass);


--
-- TOC entry 4715 (class 2606 OID 24985)
-- Name: categorias categorias_nombre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_nombre_key UNIQUE (nombre);


--
-- TOC entry 4717 (class 2606 OID 24983)
-- Name: categorias categorias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_pkey PRIMARY KEY (id_categoria);


--
-- TOC entry 4725 (class 2606 OID 25013)
-- Name: historial_movimientos historial_movimientos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial_movimientos
    ADD CONSTRAINT historial_movimientos_pkey PRIMARY KEY (id_historial);


--
-- TOC entry 4723 (class 2606 OID 25001)
-- Name: productos productos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id_productos);


--
-- TOC entry 4719 (class 2606 OID 24994)
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- TOC entry 4721 (class 2606 OID 24992)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario);


--
-- TOC entry 4727 (class 2606 OID 25014)
-- Name: historial_movimientos historial_movimientos_id_productos_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial_movimientos
    ADD CONSTRAINT historial_movimientos_id_productos_fkey FOREIGN KEY (id_productos) REFERENCES public.productos(id_productos);


--
-- TOC entry 4728 (class 2606 OID 25019)
-- Name: historial_movimientos historial_movimientos_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial_movimientos
    ADD CONSTRAINT historial_movimientos_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuario);


--
-- TOC entry 4726 (class 2606 OID 25002)
-- Name: productos productos_id_categoria_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_id_categoria_fkey FOREIGN KEY (id_categoria) REFERENCES public.categorias(id_categoria);


-- Completed on 2025-08-03 21:09:19

--
-- PostgreSQL database dump complete
--

