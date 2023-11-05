const express = require("express");
const Ajv = require("ajv");
const ajv = new Ajv();
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const Instruction = {
  type: {
    type: "string",
    enum: ["text" | "image" | "qr" | "barcode"],
  },
  content: { type: "string" },
  formatting: {
    type: "object",
    properties: {
      font: { type: "string", enum: ["a" | "b"] },
      align: {
        type: "string",
        enum: ["ct" | "lt" | "rt"],
      },
      size: {
        type: "object",
        properties: {
          width: {
            type: "integer",
            enum: [1, 2],
          },
          height: {
            type: "integer",
            enum: [1, 2],
          },
        },
      },
      imageDensity: {
        type: "string",
        enum: ["s8" | "d8" | "s24" | "d24"],
      },
    },
  },
};

const schema = {
  type: "Array",
  items: {
    type: "object",
    properties: Instruction,
  },
  required: ["type", "content"],
};

const validate = ajv.compile(schema);

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/print", (req, res) => {
  const jsonData = req.body;
  const valid = validate(jsonData);
  if (!valid) {
    //err
  }
  //call print function
  res.json(jsonData);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
