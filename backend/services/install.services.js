const conn = require("../DB.config.js/Db.js");
const fs = require('fs');
const path = require('path');

async function install() {
  // Use path.join for cross-platform compatibility
  const queryfile = path.join(__dirname, '..', 'DB.config.js', 'initial.query.sql');
  let queries = [];
  let finalMessage = {};
  let templine = '';

  // Read the sql file
  const lines = fs.readFileSync(queryfile, 'utf-8').split('\n');

  // Create a promise to handle the asynchronous reading of the file and storing of the queries in the variables  
  await new Promise((resolve, reject) => {
    lines.forEach((line) => {
      if (line.trim().startsWith('--') || line.trim() === '') {
        // Skip if it's a comment or empty line
        return;
      }
      templine += line;
      if (line.trim().endsWith(';')) {
        // If it has a semicolon at the end, it's the end of the query
        const sqlQuery = templine.trim();
        queries.push(sqlQuery);
        templine = '';
      }
    });
    resolve("Queries are added to the list");
  });

  // Loop through the queries and execute them one by one asynchronously  
  for (let i = 0; i < queries.length; i++) {
    try {
        await conn.query(queries[i]);
        console.log("Table created");
    } catch (err) {
        console.error("Error executing query:", queries[i], "\nError:", err); // Log the query and error
        finalMessage.message = "Not all tables are created";
        finalMessage.error = err.message || err; // Add the actual error to the response
        break; // Stop on first error for easier debugging
    }
  }

  // Prepare the final message to return to the controller 
  if (!finalMessage.message) {
    finalMessage.message = "All tables are created";
    finalMessage.status = 200;
  } else {
    finalMessage.status = 500;
  }
  return finalMessage;
}

module.exports = { install };
