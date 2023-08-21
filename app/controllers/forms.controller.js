const { Pool } = require("pg");
const {
  poolConfig,
  insertNewFormQuery,
  formModel,
  table,
} = require("../models/form.model");
const compareKeys = require("../helpers/compareKeys");

exports.create = async (req, res) => {
  const pool = new Pool(poolConfig);
  const client = await pool.connect();
  const requestData = req.body;

  const formModelData = { ...formModel, ...requestData };
  const generatedInsertNewFormQueryArray = insertNewFormQuery(formModelData);
  const generatedInsertNewFormQuery = generatedInsertNewFormQueryArray[0];
  
  formModelData.id = generatedInsertNewFormQueryArray[1]

  try {
    if (Object.keys(requestData).length === 0) {
      res.status(500).json({ message: "Por favor rellena los campos." });
    } else {
      if (compareKeys(formModel, requestData)) {
        res.status(200).json({ message: "Datos recibidos correctamente", data: JSON.stringify(formModelData) });

        await client.query(table);
        await client.query(generatedInsertNewFormQuery);

        client.release();
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
