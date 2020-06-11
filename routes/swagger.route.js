const express = require("express");
const router = express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0", // Specification (optional, defaults to swagger: '2.0')
    info: {
      title: "Eze wholesale api", // Title (required)
      version: "1.0.0", // Version (required)
    },
  },
  apis: ["./routes/*.route.js"],
};

const swaggerSpec = swaggerJSDoc(options);
router.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;
