import {Router} from "express";
import {createUser, getUsers, updateUser, deleteUser, getUser} from "../controllers/user.controllers";
import {Validation} from "../middlewares/validation/validation";
import {CreateUserSchema, UpdateUserSchema} from '../dto/User/create.user.dto'

const router = Router();

router.post('/users',Validation(CreateUserSchema), createUser)

router.get('/users', getUsers)

router.put('/users/:id',Validation(UpdateUserSchema), updateUser)

router.delete('/users/:id', deleteUser)

router.get("/users/:d", getUser)

export default router;