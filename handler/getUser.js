import {User} from "../user/sql.js";

export async function getUser (req, res) {
    const userId = req.params.id;
    if (userId === undefined || userId === null) {
        res.writeHead(400);
        res.end(JSON.stringify({message: 'User ID is required'}));
        return;
    }

    const user = await User.get(userId);
    if (user) {
        res.end(JSON.stringify(user));
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({message: 'User not found'}));
    }
}