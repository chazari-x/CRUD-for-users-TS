import {Router} from "express";
export const router = Router();
import User from "../controller/user.js";

router.use((req, res, next) => {
    res.setHeader("content-type", "application/json")
    next();
});

router.get(`/`, User.getAll);
router.get(`/:id`, User.get);
router.post(`/`, User.create)
router.put(`/:id`, User.update);
router.delete(`/:id`, User.delete);
