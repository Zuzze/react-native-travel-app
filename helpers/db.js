// SQLite
import * as SQLite from "expo-sqlite";

// open connection to database
const db = SQLite.openDatabase("places.db");

// create table if it does not exist
export const init = () => {
  console.log("SQLITE: initializing database...");
  const promise = new Promise((resolve, reject) => {
    // tx = transaction object
    // _  = query
    // executeSql format: query, arguments, success function, failed function
    db.transaction(tx => {
      console.log("executing sqlite query...");

      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const insertPlace = (title, imageUri, address, lat, lng) => {
  const promise = new Promise((resolve, reject) => {
    console.log("SQLITE: inserting place to db...", address, lat, lng);
    db.transaction(tx => {
      tx.executeSql(
        // you could add value string as ${title} etc but would be open to SQL injection vulnerability
        // to avoid this, SQLLite supports syntax with ? marks that validates first no malicious activity is happening
        // and then executes the query ? with the given array
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);`,
        [title, imageUri, address, lat, lng],
        // _ is a repetition of your query
        (_, result) => {
          resolve(result);
        },
        // _ is a repetition of your query
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const deletePlaceFromDatabase = id => {
  console.log("SQLITE: DELETE_PLACE");
  const promise = new Promise((resolve, reject) => {
    console.log("SQLITE: deleting place from db...", id);
    db.transaction(tx => {
      tx.executeSql(
        // you could add value string as ${title} etc but would be open to SQL injection vulnerability
        // to avoid this, SQLLite supports syntax with ? marks that validates first no malicious activity is happening
        // and then executes the query ? with the given array
        `DELETE FROM places where id=?`,
        [id],
        // _ is a repetition of your query
        (_, result) => {
          console.log("Place deleted successfully");
          console.log("Results", result.rowsAffected);
          resolve(result);
        },
        // _ is a repetition of your query
        (_, err) => {
          console.log("Error occured while deleting place");
          console.log(err);
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchPlaces = () => {
  const promise = new Promise((resolve, reject) => {
    console.log("SQLITE: fetching places from db...");
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM places",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
