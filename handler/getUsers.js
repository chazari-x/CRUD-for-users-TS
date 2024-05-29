import {User} from '../user/sql.js';

export async function getUsers (req, res)  {
    res.end(JSON.stringify(await User.getAll()));
}