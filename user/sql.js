import dotenv from 'dotenv';
dotenv.config();

const dbPort = process.env.PORT;
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbName = process.env.DB_NAME;

import pkg from 'pg';
const { Client } = pkg;

const db = new Client({
    user: dbUser,
    host: dbHost,
    database: dbName,
    password: dbPass,
    port: dbPort,
});

db.connect().then(async () => {
    console.log('Connected to the database');

    await db.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name TEXT,
            email TEXT
        )
    `);
}).catch(e => {
    console.error('Failed to connect to the database');
    console.error(e);
    process.exit(1);
});

const queryAsync = (query, params = []) => {
    return db.query(query, params);
};

export const UserStorage = {
    get: async (id) => {
        try {
            const res = await queryAsync("SELECT * FROM users WHERE id = $1", [id]);
            return res.rows[0];
        } catch (err) {
            console.error(err);
            return null;
        }
    },
    getAll: async () => {
        try {
            const res = await queryAsync("SELECT * FROM users");
            return res.rows;
        } catch (err) {
            console.error(err);
            return [];
        }
    },
    create: async (user) => {
        if (user.id !== undefined) {
            return -1;
        }

        try {
            const res = await queryAsync("INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id", [user.name, user.email]);
            return res.rows[0].id;
        } catch (err) {
            console.error(err);
            return -1;
        }
    },
    update: async (id, user) => {
        if (user.id !== undefined) {
            return false;
        }

        try {
            const res = await queryAsync(`
                UPDATE users
                SET name = COALESCE($1, name),
                    email = COALESCE($2, email)
                WHERE id = $3
                RETURNING *
            `, [user.name, user.email, id]);
            return res.rowCount > 0;
        } catch (err) {
            console.error(err);
            return false;
        }
    },
    delete: async (id) => {
        try {
            const res = await queryAsync("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
            return res.rowCount > 0;
        } catch (err) {
            console.error(err);
            return false;
        }
    }
};
