import {Schema, model} from 'mongoose';

export interface IRole{
    role: string;
    description?: string;
    active: boolean;
}
const RoleSchema = new Schema({
    role: {type:String, required:true, unique:true},
    description: {type:String},
    active: {type:Boolean, default:true}
}, {
    collection: "roles",
    timestamps: true
});

export default model("Role", RoleSchema)