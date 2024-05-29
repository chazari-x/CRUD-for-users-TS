import {User} from '../user/sql.js';

export async function createUser (req, res) {
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

        const id = await User.create(user)

        if (id <= 0) {
            res.writeHead(400);
            res.end(JSON.stringify({message: 'Bad request'}));
            return;
        }

        res.writeHead(201);
        res.end(JSON.stringify({message: 'User created', id: id}));
    });
}