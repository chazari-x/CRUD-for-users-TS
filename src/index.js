import express from 'express';
import {router as users} from "./router/users.js";

const app = express();
const PORT = 3000;

app.use('/api/users', users);

app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}`);
});