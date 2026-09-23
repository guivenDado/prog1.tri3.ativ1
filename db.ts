import { Database } from "bun:sqlite";

const db = new Database("database.sqlite");

const query = db.query(`
    CREATE TABLE IF NOT EXISTS users (
        id              INTEGER PRIMARY KEY AUTOINCREMENT,
        username        TEXT NOT NULL UNIQUE,
        email           TEXT NOT NULL UNIQUE,
        password_hash   TEXT NOT NULL
    );
`);

const query1 = db.query(`
    CREATE TABLE IF NOT EXISTS ficha (
        id              INTEGER PRIMARY KEY AUTOINCREMENT,
        PV              INT,
        PE              INT,
        nome            TEXT NOT NULL UNIQUE,
        classe          TEXT NOT NULL UNIQUE,
        habilidades     TEXT NOT NULL
    );
`);

query.run();
query1.run();

export { db }