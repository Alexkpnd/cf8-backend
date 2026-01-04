import {Router} from "express";
import * as userCtrl from "../controllers/user.controller";
const router = Router();
import {validate} from '../middlewares/validate.middleware';
import { createUserSchema } from "../validators/user.validator";
import { validateObjectId } from "../middlewares/validateObjectId.middleware";
import { updateUserSchema } from "../validators/user.validator";
import { authenticate } from "../middlewares/auth.middleware";
import { hasAdminRole } from "../middlewares/user.middleware";

/**
 * @openapi
 * /users:
 *  get:
 *      summary: List of all users
 *      tags: 
 *          [Users]
 *      security: 
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Response list of users
 */
router.get("/", authenticate, hasAdminRole, userCtrl.list);
router.get('/:id', hasAdminRole, validateObjectId(), userCtrl.getOne);
/**
 * @openapi
 * /users:
 *  post:
 *      summary: Creates a user
 *      tags: [Users]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                          password:
 *                              type: string
 *                          firstname:
 *                              type: string
 *                          lastname:
 *                              type: string
 *                          email:
 *                              type: string
 *      responses:
 *          201: 
 *              description: User Created
 */
router.post('/', authenticate, validate(createUserSchema), userCtrl.create);
router.put('/:id', authenticate, validate(updateUserSchema), validateObjectId(), userCtrl.update);
router.delete('/:id', authenticate, validateObjectId('id'), userCtrl.remove);


export default router;