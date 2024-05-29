import {User} from "../user/sql.js";

export async function deleteUser (req, res)  {
    const userId = req.params.id;
    if (userId === undefined || userId === null) {
        res.writeHead(400);
        res.end(JSON.stringify({message: 'User ID is required'}));
        return;
    }

    if (await User.delete(userId)) {
        res.end(JSON.stringify({message: 'User deleted'}));
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({message: 'User not found'}));
    }
}