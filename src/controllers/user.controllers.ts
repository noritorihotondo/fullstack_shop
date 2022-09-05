import {NextFunction, Request, Response} from "express";
import {User} from "../entities/User";
import {APIError} from "../lib/utils/api-error";
import {APIErrorCode, HttpStatusCode} from "../types/HTTP/http.model";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body)
        const {firstname, lastname, email, password} = req.body;

        const user = new User();
        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        user.password = password;

        await user.save()
        if(!user) {
            throw new APIError("Cant find user", HttpStatusCode.OK, false, APIErrorCode.CantFindUser, "CreateUser")
        }

        return res.json(user)
    } catch (error) {
        next(error)
    }
}

export const getUsers = async (req:Request, res: Response) => {
    try {
        const users = await User.find()
        return res.json(users)
    } catch (error) {
        if(error instanceof Error) {
            return res.status(500).json({message: error.message})
        }
    }

}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { firstname, lastname } = req.body;
        const user = await User.findOneBy({id: req.params.id})
        const { id } = req.params;

        if(!user) return res.status(404).json({message:'User does not exist'})

        await User.update({id}, req.body)

        return res.sendStatus(204)
    } catch(error) {
        if(error instanceof  Error) {
            return res.status(500).json({ message: error.message})
        }
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;

        const result = await User.delete(({id}))

        if(result.affected === 0) {
            return res.status(400).json({message: 'User not found'})
        }

        return res.sendStatus(204)
    } catch (error) {
        if(error instanceof Error)
            return res.status(500).json({ message: error.message})
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const user = await User.findOneBy({id})

        return res.json(user)
    } catch (error) {
        if(error instanceof Error) {
            return res.status(500).json({message: error.message})
        }
    }

}