// SQLite
import * as SQLite from "expo-sqlite";

// open connection to database
const db = SQLite.openDatabase("places.db");

// create table if it does not exist
export const init = () => {
  const promise = new Promise((resolve, reject) => {
    // tx = transaction object
    db.transaction(tx => {
      tx.executeSql(
        // query
        "CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);",
        // array of arguments
        [],
        // successful query, or table already created
        () => {
          resolve();
        },
        (_, err) => {
          // query fail
          reject(err);
        }
      );
    });
    return promise;
  });
};
