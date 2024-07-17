// database.ts
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'BookLibraryDB',
    location: 'default',
  },
  () => {
    console.log('Database opened successfully');
  },
  (error: SQLite.SQLError) => {
    console.log('Error opening database: ', error);
  }
);

export const initDatabase = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx: SQLite.Transaction) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Books (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          author TEXT NOT NULL,
          rating INTEGER NOT NULL CHECK(rating >= 0 AND rating <= 5),
          is_read INTEGER NOT NULL CHECK(is_read IN (0, 1)),
          description TEXT,
          image_uri TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Preferences (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          sort_by TEXT NOT NULL,
          theme TEXT NOT NULL
        );`
      );
    }, (error: SQLite.SQLError) => {
      console.log('Transaction error: ', error);
      reject(error);
    }, () => {
      console.log('Tables created successfully');
      resolve();
    });
  });
};

export default db;