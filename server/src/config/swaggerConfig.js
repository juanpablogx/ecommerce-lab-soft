// swaggerConfig.js
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "StepUp API",
      version: "1.0.0",
      description: "Documentación automática de la API de StepUp con Swagger",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      }
    },
    servers: [
      {
        url: "http://localhost:3000", // Cambia la URL según tu entorno
      },
    ],
  },
  apis: ["../**/*.routes.js"], // Incluye todos los archivos .routes.js dentro de subcarpetas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;