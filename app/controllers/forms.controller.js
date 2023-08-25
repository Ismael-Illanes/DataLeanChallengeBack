const { formModel } = require("../models/form.model");
const compareKeys = require("../helpers/compareKeys");
const {
  writeDb,
  readDb,
  find,
  clearElement,
} = require("../db/functions/functions");
const uuid4 = require("uuid4");
const currentDateTime = require("../helpers/currentDateTime");

exports.create = async (req, res) => {
  const requestData = req.body;

  const formModelData = { ...formModel, ...requestData };

  formModelData.id = uuid4();
  formModelData.createdAt = currentDateTime();

  try {
    if (Object.keys(requestData).length === 0) {
      res.status(500).json({ message: "Por favor rellena los campos." });
    } else {
      if (compareKeys(formModel, requestData)) {
        res.status(200).json({
          message: "Datos recibidos correctamente",
          data: JSON.stringify(formModelData),
        });

        writeDb(formModelData);
      } else {
        res
          .status(500)
          .json({ message: "Los campos a rellenar no coinciden." });
      }
    }
  } catch (e) {
    console.error("Error:", e);
    throw `Ha ocurrido el siguiente error ${e}`;
  }
};

exports.findall = async (req, res) => {
  const formData = readDb();
  res.status(200).json(formData);
};

exports.find = async (req, res) => {
  try {
    const { id } = req.params;
    const foundObject = find(id);

    if (foundObject) {
      res.status(200).json({ message: "Object found!", data: foundObject });
    } else {
      res.status(404).json({ message: "Object not found" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  const currentObjects = readDb();
  const foundObjectIndex = currentObjects.findIndex((x) => x.id === id);
  try {
    if (
      foundObjectIndex !== -1 &&
      newData &&
      compareKeys(newData, currentObjects[foundObjectIndex])
    ) {
      const keys = Object.keys(newData);
      keys.forEach((key) => {
        currentObjects[foundObjectIndex][key] = newData[key];
      });

      writeDb(currentObjects[foundObjectIndex]);

      res.status(200).json({ data: currentObjects[foundObjectIndex] });
    } else {
      res.status(404).json({ message: "Object not found" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const currentObjects = readDb();
    const foundObjectIndex = currentObjects.findIndex((x) => x.id === id);

    if (foundObjectIndex !== -1) {
      clearElement(foundObjectIndex);

      res.status(200).json({ message: "Object deleted successfully" });
    } else {
      res.status(404).json({ message: "Object not found" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
