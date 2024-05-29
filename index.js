import express from 'express';
import { getUsers   } from "./handler/getUsers.js";
import { getUser    } from "./handler/getUser.js";
import { createUser } from "./handler/createUser.js";
import { deleteUser } from "./handler/deleteUser.js";
import { updateUser } from "./handler/updateUser.js";

const app   = express();
const PORT  = 3000;

app.use((req, res, next) => {
    res.setHeader("content-type", "application/json")
    next();
});

app.get(`/api/users`, getUsers);
app.get(`/api/users/:id`, getUser);
app.post(`/api/users`, createUser);
app.post(`/api/users/:id`, updateUser);
app.delete(`/api/users/:id`, deleteUser);

app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}`);
});