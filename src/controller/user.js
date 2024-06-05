import {UserStorage} from '../sql-data';

export default new class User {
    async getAll (req, res)  {
        UserStorage.getAll().then((users) => {
            res.end(JSON.stringify(users));
        }).catch((err) => {
            res.writeHead(400);
            res.end(JSON.stringify({message: err.message}));
        })
    };

    async get (req, res) {
        UserStorage.get(req.params.id).then((user) => {
            res.end(JSON.stringify(user));
        }).catch(err => {
            switch (err.message) {
                case 'User not found':
                    res.writeHead(404);
                    break;
                default:
                    res.writeHead(400);
                    break;
            }
            res.end(JSON.stringify({message: err.message}));
        });
    };

    async delete (req, res)  {
        UserStorage.delete(req.params.id).then((user) => {
            res.end(JSON.stringify(user));
        }).catch((err) => {
            switch (err.message) {
                case 'User not found':
                    res.writeHead(404);
                    break;
                default:
                    res.writeHead(400);
                    break;
            }
            res.end(JSON.stringify({message: err.message}));
        });
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

            UserStorage.create(user).then((user) => {
                res.writeHead(201);
                res.end(JSON.stringify(user));
            }).catch((err) => {
                res.writeHead(400);
                res.end(JSON.stringify({message: err.message}));
            });
        });
    };

    async update (req, res)  {
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

            user['id'] = req.params.id;

            UserStorage.update(user).then((user) => {
                res.end(JSON.stringify(user));
            }).catch((err) => {
                switch (err.message) {
                    case 'User not found':
                        res.writeHead(404);
                        break;
                    default:
                        res.writeHead(400);
                        break;
                }
                res.end(JSON.stringify({message: err.message}));
            });
        });
    };
}