const expressListEndpoints = require('express-list-endpoints');
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

const generateSwaggerSpec = (app) => {
  const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Express API for XYZ',
      version: '1.0.0',
      description: 'This is a simple CRUD API application made with Express and documented with Swagger',
      contact: {
        name: 'Developer',
        email: 'email@example.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:9000/api',
        description: 'Local server',
      },
    ],
  };

  // Dynamically extract routes
  const routes = expressListEndpoints(app)
    .map(endpoint => ({ path: endpoint.path, method: endpoint.methods[0] }));

  const options = {
    swaggerDefinition,
    // Dynamically generate API definitions
    apis: [path.join(__dirname, './routes/*.js')],
  };

  const swaggerSpec = swaggerJsdoc(options);

  return { swaggerSpec, routes };
};

module.exports = generateSwaggerSpec;
