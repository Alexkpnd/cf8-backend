import Role from '../models/role.model';

export const findAllRoles = async() => {
    return Role.find().lean(); // to lean metatrepei ta objects se json 
}

export const createRole = async(payload: Object) => {
    const result = new Role(payload);
    return result.save()
} 