# Demo SDK Web Punto Web 2.0 - Backend (Sandbox)

Este repositorio corresponde a una **demo técnica del backend** para pruebas de integración con el **SDK Web de Punto Web 2.0**.

## Finalidad

El objetivo de este proyecto es exponer servicios básicos necesarios para la integración:

- Generación de token de sesión
- Generación de firma (signature) para validaciones
- Soporte al flujo de integración del frontend

## Arquitectura

Este repositorio representa la **capa backend** de la demo.

Se complementa con el frontend:
- Frontend demo: `demoDanielFront`

## Alcance

- Uso exclusivo para **pruebas y validación técnica**
- Configurado para trabajar con **credenciales de ambiente sandbox**
- No corresponde a una solución productiva
- No almacena información en base de datos
- No persiste información sensible

## Credenciales y configuración

Las credenciales utilizadas en este repositorio:

- Corresponden únicamente a **ambiente sandbox**
- Son utilizadas con fines de demostración
- No permiten acceso a producción ni a información real de comercios

Estas credenciales forman parte de ejemplos de integración y no representan información sensible.

## Funcionamiento

El backend expone endpoints como:

- `/token` → Generación de token de sesión contra Izipay
- `/signature` → Generación de firma HMAC para el flujo de pago

El token generado es consumido por el frontend para cargar el formulario de pago.

## Persistencia de datos

- No se utiliza base de datos
- No se almacenan transacciones
- Toda la información es procesada en tiempo real y descartada

## Consideraciones de seguridad

- No se incluyen credenciales productivas
- No se manejan datos reales de clientes
- No se almacena información sensible
- Este backend es únicamente una **implementación de referencia**

## Tecnologías usadas

- Node.js
- Express

## Ejecución local

```bash
npm install
npm start