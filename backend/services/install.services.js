const conn = require("../DB.config.js/Db.js");
const fs = require('fs');
const path = require('path');

async function install() {
  const queryfile = path.join(__dirname, '..', 'DB.config.js', 'initial.query.sql');
  let queries = [];
  let finalMessage = {};
  let templine = '';

  const lines = fs.readFileSync(queryfile, 'utf-8').split('\n');

  await new Promise((resolve) => {
    lines.forEach((line) => {
      if (line.trim().startsWith('--') || line.trim() === '') return;
      templine += line;
      if (line.trim().endsWith(';')) {
        queries.push(templine.trim());
        templine = '';
      }
    });
    resolve();
  });

  for (let i = 0; i < queries.length; i++) {
    try {
      await conn.query(queries[i]);
      console.log("Table created");
    } catch (err) {
      console.error("Error executing query:", queries[i], "\nError:", err);
      finalMessage.message = "Not all tables are created";
      finalMessage.error = err.message || err;
      break;
    }
  }

  if (!finalMessage.message) {
    finalMessage.message = "All tables are created";
    finalMessage.status = 200;
  } else {
    finalMessage.status = 500;
  }
  return finalMessage;
}

module.exports = { install };
