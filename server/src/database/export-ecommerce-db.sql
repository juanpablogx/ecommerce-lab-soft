--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2024-11-11 20:17:03

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
-- TOC entry 3373 (class 1262 OID 17196)
-- Name: ecommerce; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE ecommerce WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Colombia.1252';


ALTER DATABASE ecommerce OWNER TO postgres;

\connect ecommerce

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
-- TOC entry 219 (class 1259 OID 17221)
-- Name: carrito; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carrito (
    id_carrito integer NOT NULL,
    id_usuario integer NOT NULL,
    estado_carrito character varying NOT NULL,
    fecha_creacion_carrito date DEFAULT CURRENT_DATE NOT NULL
);


ALTER TABLE public.carrito OWNER TO postgres;

--
-- TOC entry 3374 (class 0 OID 0)
-- Dependencies: 219
-- Name: COLUMN carrito.estado_carrito; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.carrito.estado_carrito IS 'pendiente, en orden';


--
-- TOC entry 218 (class 1259 OID 17220)
-- Name: carrito_id_carrito_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.carrito ALTER COLUMN id_carrito ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.carrito_id_carrito_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 223 (class 1259 OID 17242)
-- Name: imagen_producto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.imagen_producto (
    id_imagen_producto integer NOT NULL,
    id_producto integer NOT NULL,
    url character varying NOT NULL
);


ALTER TABLE public.imagen_producto OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 17241)
-- Name: imagen_producto_id_imagen_producto_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.imagen_producto ALTER COLUMN id_imagen_producto ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.imagen_producto_id_imagen_producto_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 217 (class 1259 OID 17208)
-- Name: orden; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orden (
    id_orden integer NOT NULL,
    id_usuario integer NOT NULL,
    fecha_orden date NOT NULL,
    precio_orden real NOT NULL,
    estado_orden character varying NOT NULL,
    direccion_entrega character varying NOT NULL
);


ALTER TABLE public.orden OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 17207)
-- Name: orden_id_orden_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.orden ALTER COLUMN id_orden ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.orden_id_orden_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 221 (class 1259 OID 17234)
-- Name: producto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.producto (
    id_producto integer NOT NULL,
    nombre_producto character varying NOT NULL,
    descripcion_producto character varying,
    categoria character varying NOT NULL,
    precio real NOT NULL
);


ALTER TABLE public.producto OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 17268)
-- Name: producto_carrito; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.producto_carrito (
    id_producto_carrito integer NOT NULL,
    id_carrito integer NOT NULL,
    id_producto_inventario integer NOT NULL,
    cantidad integer NOT NULL
);


ALTER TABLE public.producto_carrito OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 17267)
-- Name: producto_carrito_id_producto_carrito_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.producto_carrito ALTER COLUMN id_producto_carrito ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.producto_carrito_id_producto_carrito_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 220 (class 1259 OID 17233)
-- Name: producto_id_producto_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.producto ALTER COLUMN id_producto ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.producto_id_producto_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 225 (class 1259 OID 17255)
-- Name: producto_inventario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.producto_inventario (
    id_producto_inventario integer NOT NULL,
    id_producto integer NOT NULL,
    talla_inventario character varying,
    stock_max integer,
    stock_min integer,
    stock integer NOT NULL
);


ALTER TABLE public.producto_inventario OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 17254)
-- Name: producto_inventario_id_producto_inventario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.producto_inventario ALTER COLUMN id_producto_inventario ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.producto_inventario_id_producto_inventario_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 215 (class 1259 OID 17198)
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    id_usuario integer NOT NULL,
    nombre_usuario character varying NOT NULL,
    apellido_usuario character varying NOT NULL,
    correo_usuario character varying NOT NULL,
    telefono_usuario character varying NOT NULL,
    direccion_usuario character varying,
    rol_usuario character varying NOT NULL,
    password_usuario character varying NOT NULL
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 17197)
-- Name: usuario_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.usuario ALTER COLUMN id_usuario ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.usuario_id_usuario_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3211 (class 2606 OID 17227)
-- Name: carrito carrito_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carrito
    ADD CONSTRAINT carrito_pkey PRIMARY KEY (id_carrito);


--
-- TOC entry 3215 (class 2606 OID 17248)
-- Name: imagen_producto imagen_producto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imagen_producto
    ADD CONSTRAINT imagen_producto_pkey PRIMARY KEY (id_imagen_producto);


--
-- TOC entry 3209 (class 2606 OID 17214)
-- Name: orden orden_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orden
    ADD CONSTRAINT orden_pkey PRIMARY KEY (id_orden);


--
-- TOC entry 3219 (class 2606 OID 17272)
-- Name: producto_carrito producto_carrito_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto_carrito
    ADD CONSTRAINT producto_carrito_pkey PRIMARY KEY (id_producto_carrito);


--
-- TOC entry 3217 (class 2606 OID 17261)
-- Name: producto_inventario producto_inventario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto_inventario
    ADD CONSTRAINT producto_inventario_pkey PRIMARY KEY (id_producto_inventario);


--
-- TOC entry 3213 (class 2606 OID 17240)
-- Name: producto producto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto
    ADD CONSTRAINT producto_pkey PRIMARY KEY (id_producto);


--
-- TOC entry 3205 (class 2606 OID 17206)
-- Name: usuario usuario_correo_usuario_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_correo_usuario_key UNIQUE (correo_usuario);


--
-- TOC entry 3207 (class 2606 OID 17204)
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id_usuario);


--
-- TOC entry 3221 (class 2606 OID 17289)
-- Name: carrito carrito_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carrito
    ADD CONSTRAINT carrito_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario);


--
-- TOC entry 3222 (class 2606 OID 17249)
-- Name: imagen_producto imagen_producto_id_producto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imagen_producto
    ADD CONSTRAINT imagen_producto_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES public.producto(id_producto);


--
-- TOC entry 3220 (class 2606 OID 17215)
-- Name: orden orden_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orden
    ADD CONSTRAINT orden_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario);


--
-- TOC entry 3224 (class 2606 OID 17294)
-- Name: producto_carrito producto_carrito_id_carrito_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto_carrito
    ADD CONSTRAINT producto_carrito_id_carrito_fkey FOREIGN KEY (id_carrito) REFERENCES public.carrito(id_carrito) ON DELETE CASCADE;


--
-- TOC entry 3225 (class 2606 OID 17278)
-- Name: producto_carrito producto_carrito_id_producto_inventario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto_carrito
    ADD CONSTRAINT producto_carrito_id_producto_inventario_fkey FOREIGN KEY (id_producto_inventario) REFERENCES public.producto_inventario(id_producto_inventario);


--
-- TOC entry 3223 (class 2606 OID 17262)
-- Name: producto_inventario producto_inventario_id_producto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto_inventario
    ADD CONSTRAINT producto_inventario_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES public.producto(id_producto);


-- Completed on 2024-11-11 20:17:03

--
-- PostgreSQL database dump complete
--

