import express from "express";
import { User } from "../models/user.model";
import { Moderator } from "../models/moderator.model";

declare module "express" {
    export interface Request {
        user: User;
        moderator: Moderator;
    }
}
