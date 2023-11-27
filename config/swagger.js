const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.3',
    info: {
        title: 'Product Management API',
        description: 'API endpoints for Node.js assessment documented on swagger',
        version: '1.0.0',
    },
    servers: [
        {
            url: 'http://localhost:8080/',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security: [{
        bearerAuth: [],
    }]
};

const options = {
  swaggerDefinition,
  apis: ['./docs/**/*.yaml'],
};

module.exports = swaggerJSDoc(options);