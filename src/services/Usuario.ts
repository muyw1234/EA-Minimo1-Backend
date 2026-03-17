import mongoose from 'mongoose';
import Usuario, { IUsuarioModel, IUsuario } from '../models/Usuario';

const createUsuario = async (data: Partial<IUsuario>): Promise<IUsuarioModel> => {
    const usuario = new Usuario({
        _id: new mongoose.Types.ObjectId(),
        ...data
    });
    return await usuario.save();
};

const getUsuario = async (usuarioId: string): Promise<IUsuarioModel | null> => {
    return await Usuario.findById(usuarioId);
};

const getAllUsuarios = async (): Promise<IUsuarioModel[]> => {
    return await Usuario.find();
};

const updateUsuario = async (usuarioId: string, data: Partial<IUsuario>): Promise<IUsuarioModel | null> => {
    const usuario = await Usuario.findById(usuarioId);
    if (usuario) {
        usuario.set(data);
        return await usuario.save();
    }
    return null;
};

const deleteUsuario = async (usuarioId: string): Promise<IUsuarioModel | null> => {
    return await Usuario.findByIdAndUpdate(usuarioId, 
        { IsActive: false }, // Soft delete by setting IsActive to false
        { new: true }); // Return the updated document
};

const restoreUsuario = async (usuarioId: string): Promise<IUsuarioModel | null> => {
    return await Usuario.findByIdAndUpdate(usuarioId,
        { IsActive: true }, // Restore by setting IsActive to true
        { new: true }); // Return the updated document
}

export default { createUsuario, getUsuario, getAllUsuarios, updateUsuario, deleteUsuario, restoreUsuario };