import logger from "../../util/logger.util";
import { User } from "../../models/user.model";
import { APP_IDENTIFIER, ENV_JWT_SECRET } from "../../util/secrets.util";
import { jwtService } from "../factories/jwt.service";

class UserService {
    private constructor() {
        logger.silly(`[${APP_IDENTIFIER}] UserService`);
    }

    static getInstance(): UserService {
        return new UserService();
    }

    async showById(userId: number): Promise<User> {
        return User.findByPk(userId);
    }

    async showByEmail(email: string): Promise<User> {
        return User.findOne({
            where: {
                email: email
            }
        });
    }

    async create(data: UserCreateFields): Promise<User> {
        return User.create({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            password: data.password,
        });
    }

    createJWTToken(user: User): string {
        return jwtService.generateUserToken(user.id, {
            expires: false,
            customClaims: {},
            override_jwt_secret: ENV_JWT_SECRET
        });
    }
}

interface UserCreateFields {
    first_name: string;
    last_name?: string;
    email: string;
    password: string;
}

export const userService = UserService.getInstance();
