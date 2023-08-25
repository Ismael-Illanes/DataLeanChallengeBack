const fs = require("fs");

function readDb(dbName = "db.json") {
  try {
    const fileData = fs.readFileSync(dbName, "utf-8");
    return JSON.parse(fileData);
  } catch (err) {
    return console.log(`Read failed. Error: ${err.message}`);
  }
}

function writeDb(updatedObj, dbName = "db.json") {
  if (!updatedObj) {
    return console.log("Please provide data to save");
  }

  try {
    const currentData = readDb(dbName);

    const existingIndex = currentData.findIndex((x) => x.id === updatedObj.id);

    if (existingIndex !== -1) {
      currentData[existingIndex] = updatedObj;
    } else {
      currentData.push(updatedObj);
    }

    fs.writeFileSync(dbName, JSON.stringify(currentData, null, 2));
    return console.log("Save successful");
  } catch (err) {
    return console.log(`Save failed. Error: ${err.message}`);
  }
}

function find(id) {
  const currentData = readDb();
  const foundObject = currentData.find((x) => x.id === id);
  return foundObject || null;
}

function clearElement(index, dbName = "db.json") {
  try {
    const currentData = readDb(dbName);

    if (index >= 0 && index < currentData.length) {
      currentData.splice(index, 1);
      fs.writeFileSync(dbName, JSON.stringify(currentData, null, 2));
      console.log("Element cleared successfully");
    } else {
      console.log("Invalid index");
    }
  } catch (err) {
    console.log(`Clearing element failed. Error: ${err.message}`);
  }
}

module.exports = { readDb, writeDb, find, clearElement };
