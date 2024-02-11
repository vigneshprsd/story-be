const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.json());

// MongoDB connection
require("../config/db");

// Swagger configuration
const swaggerDefinition = {
  info: {
    title: "Story Upload API",
    version: "1.0.0",
    description: "API for uploading and managing stories",
  },
  basePath: "/api",
};

const options = {
  swaggerDefinition,
  apis: ["../src/routes/*.js", "./docs/swagger.yaml"],
};

const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/storyRoutes"));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
