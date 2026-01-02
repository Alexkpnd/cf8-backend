import {Request, Response, NextFunction} from 'express';
import * as rolesService from '../services/role.service';


// dexetai kai epiksergazetai ta request kanei request kai responses. ta alla ta kanei o service
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
        console.log(">>", req.body);
        const result = await rolesService.createRole(req.body)
        res.status(201).json(result);
    }catch (err) {
        res.status(401).json({"Error": err})
        //next(err);
    }
}

export const update = async(req: Request, res:Response, next:NextFunction) => {
    try {
        const result = await rolesService.updateRole(req.params.id!, req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(401).json({"Error": err});   
    }
}

export const remove = async(req: Request, res:Response, next:NextFunction) => {
    try {
        const result = await rolesService.deleteRole(req.params.id!);
        res.status(201).json(result);
    } catch (err) {
        //res.status(404).json({"Error": err})
        next(err);
    }
}