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
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        PV INTEGER NOT NULL DEFAULT 10,
        PE INTEGER NOT NULL DEFAULT 5,
        nome TEXT NOT NULL,
        classe TEXT NOT NULL,
        habilidades TEXT NOT NULL DEFAULT ''
    );
`);

query.run();
query1.run();

export { db }
