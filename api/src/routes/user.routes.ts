import {Router} from "express";
import {createUser, getUsers, updateUser, deleteUser, getUser} from "../controllers/user.controllers";

const router = Router();

router.post('/users', createUser)

router.get('/users', getUsers)

router.put('/users/:id', updateUser)

router.delete('/users/:id', deleteUser)

router.get("/users/:d", getUser)

export default router;