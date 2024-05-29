import {UserStorage} from '../user/sql.js';

export default new class User {
    async getAll (req, res)  {
        res.end(JSON.stringify(await UserStorage.getAll()));
    };

    async get (req, res) {
        const userId = req.params.id;
        if (userId === undefined || userId === null) {
            res.writeHead(400);
            res.end(JSON.stringify({message: 'User ID is required'}));
            return;
        }

        const user = await UserStorage.get(userId);
        if (user) {
            res.end(JSON.stringify(user));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({message: 'User not found'}));
        }
    };

    async delete (req, res)  {
        const userId = req.params.id;
        if (userId === undefined || userId === null) {
            res.writeHead(400);
            res.end(JSON.stringify({message: 'User ID is required'}));
            return;
        }

        if (await UserStorage.delete(userId)) {
            res.end(JSON.stringify({message: 'User deleted'}));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({message: 'User not found'}));
        }
    };

    async create (req, res) {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {
            let user = {};
            for (const [key, value] of new URLSearchParams(body)) {
                if (value) {
                    user[key] = value;
                }
            }

            if (!user.name) {
                res.writeHead(400);
                res.end(JSON.stringify({message: 'Bad request'}));
                return;
            }

            const id = await UserStorage.create(user)

            if (id <= 0) {
                res.writeHead(400);
                res.end(JSON.stringify({message: 'Bad request'}));
                return;
            }

            res.writeHead(201);
            res.end(JSON.stringify({message: 'User created', id: id}));
        });
    };

    async update (req, res)  {
        const userId = req.params.id;

        if (userId === undefined || userId === null) {
            res.writeHead(400);
            res.end(JSON.stringify({ message: 'User ID is required' }));
            return;
        }

        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {
            let user = {};
            for (const [key, value] of new URLSearchParams(body)) {
                user[key] = value;
            }

            if (user.name === "") {
                res.writeHead(400);
                res.end(JSON.stringify({message: 'Bad request'}));
                return;
            }

            if (await UserStorage.update(userId, user)) {
                res.end(JSON.stringify({message: 'User updated'}));
            } else {
                res.writeHead(404);
                res.end(JSON.stringify({message: 'User not found'}));
            }
        });
    };
}