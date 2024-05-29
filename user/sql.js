import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('crud.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users  (
                        id INTEGER PRIMARY KEY AUTOINCREMENT, 
                        name TEXT, 
                        email TEXT
                   )`);
});

const runAsync = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(query, params, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this);
            }
        });
    });
};

const getAsync = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.get(query, params, (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

const allAsync = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

export const User = {
    get: async (id) => {
        try {
            return await getAsync("SELECT * FROM users WHERE id = ?", [id]);
        } catch (err) {
            console.error(err);
            return null;
        }
    },
    getAll: async () => {
        try {
            return await allAsync("SELECT * FROM users");
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
            const result = await runAsync("INSERT INTO users (name, email) VALUES (?, ?)", [user.name, user.email]);
            return result.lastID;
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
            const result = await runAsync(`
                UPDATE users
                SET name = COALESCE(?, name),
                    email = COALESCE(?, email)
                WHERE id = ?
            `, [user.name, user.email, id]);
            return result.changes > 0;
        } catch (err) {
            console.error(err);
            return false;
        }
    },
    delete: async (id) => {
        try {
            const result = await runAsync("DELETE FROM users WHERE id = ?", [id]);
            return result.changes > 0;
        } catch (err) {
            console.error(err);
            return false;
        }
    }
};
