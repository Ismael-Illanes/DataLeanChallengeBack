const uuid4 = require("uuid4");
const currentDateTime = require("../helpers/currentDateTime");

module.exports = {
  poolConfig: {
    host: "dataleanmakers.com.es",
    user: "dlm",
    database: "pg_pruebadlm",
    password: "dlm2023$",
    port: 7432,
  },

  table: `CREATE TABLE IF NOT EXISTS "forms_53703962c" (
    "id" VARCHAR(100) NOT NULL,
    "formName" VARCHAR(100) NOT NULL,
    "description" VARCHAR(150) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "surname" VARCHAR(150) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "phone" BIGINT NOT NULL,
    "country" VARCHAR(150) NOT NULL,
    "street" VARCHAR(200) NOT NULL,
    "gender" VARCHAR(50) NOT NULL,
    "favlang" VARCHAR(150)[],
    "createdAt" VARCHAR(150) NOT NULL,
    PRIMARY KEY ("id")
);
`,

  formModel: {
    formName: "",
    description: "",
    name: "",
    surname: "",
    email: "",
    phone: 0,
    country: "",
    street: "",
    gender: "",
    favlang: [],
  },

  insertNewFormQuery(formModel) {
    const id = uuid4();
    const now = currentDateTime();
    const data = [
      `INSERT INTO forms_53703962C (id, "formName", description, name, surname, email, phone, country, street, gender, favlang, "createdAt")
    VALUES ('${id}', 
    '${formModel.formName}', '${formModel.description}', '${
        formModel.name
      }', '${formModel.surname}', '${formModel.email}', ${formModel.phone}, '${
        formModel.country
      }', '${formModel.street}', '${formModel.gender}',${
        Array.isArray(formModel.favlang)
          ? `'{${formModel.favlang.join(", ")}}'`
          : `'{${formModel.favlang}}'`
      }, '${now}')`,
      id.toString(),
    ];

    return data;
  },
};
