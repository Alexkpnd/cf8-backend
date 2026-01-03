import {Router} from "express";
import * as userCtrl from "../controllers/user.controller";
const router = Router();
import {validate} from '../middlewares/validate.middleware';
import { createUserSchema } from "../validators/user.validator";
import { validateObjectId } from "../middlewares/validateObjectId.middleware";
import { updateUserSchema } from "../validators/user.validator";

router.get("/",userCtrl.list);
router.get('/:id', validateObjectId(), userCtrl.getOne);
router.post('/', validate(createUserSchema), userCtrl.create);
router.put('/:id', validate(updateUserSchema), validateObjectId(), userCtrl.update);
router.delete('/:id', validateObjectId('id'), userCtrl.remove);


export default router;