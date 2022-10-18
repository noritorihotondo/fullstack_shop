import {User} from "../../entities/User";

export const responseUserData = (user: User) => {
    const {password, ...rest} = user;

    return rest
}