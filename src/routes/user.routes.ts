import {Router} from "express";
import * as userCtrl from "../controllers/user.controller";
const router = Router();
import {validate} from '../middlewares/validate.middleware';
import { createUserSchema } from "../validators/user.validator";
import { validateObjectId } from "../middlewares/validateObjectId.middleware";
import { updateUserSchema } from "../validators/user.validator";
import { authenticate } from "../middlewares/auth.middleware";

router.get("/", authenticate, userCtrl.list);
router.get('/:id', validateObjectId(), userCtrl.getOne);
router.post('/', authenticate, validate(createUserSchema), userCtrl.create);
router.put('/:id', authenticate, validate(updateUserSchema), validateObjectId(), userCtrl.update);
router.delete('/:id', authenticate, validateObjectId('id'), userCtrl.remove);


export default router;