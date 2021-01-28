import  { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    //get jwt from the HEAD
    const token = <string>req.headers["auth"];
    let jwtPayLoad;

    //try to validate the token and get data
    try {
        jwtPayLoad = <any>jwt.verify(token, config.jwtSecret);
        res.locals.jwtPayLoad = jwtPayLoad;
    } catch (error) {
        res.status(401).send();
        return;
    }

    //token is valid for 1 hour
    //we want to send a new token on every request
    const { userId, username } = jwtPayLoad;
    const newToken = jwt.sign({ userId, username }, config.jwtSecret, {
        expiresIn: "1h"
    });
    res.setHeader("token", newToken);

    //call next middleware or controller
    next();

};