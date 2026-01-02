import {Request, Response, NextFunction} from 'express';
import * as rolesService from '../services/role.service';

export const list = async(req:Request, res:Response, next:NextFunction) => {
    try{
        const result = await rolesService.findAllRoles();
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
}

export const create = async(req:Request, res:Response, next:NextFunction) => {
    try{
        console.log(">>>", req.body)
        const result = await rolesService.createRole(req.body)
        res.status(201).json(result);
    }catch (err) {
        next(err);
    }
}