import mongoose from 'mongoose';
import Usuario, { IUsuarioModel, IUsuario } from '../models/Usuario';
import Libro from '../models/Libro';
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

const getUsuarioLibros = async (usuarioId: string): Promise<IUsuarioModel[] | null> => {
    return await Libro.find({ owner: usuarioId, IsDeleted: false });
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
        { IsDeleted: true }, // Soft delete by setting IsDeleted to true
        { new: true }); // Return the updated document
};

const restoreUsuario = async (usuarioId: string): Promise<IUsuarioModel | null> => {
    return await Usuario.findByIdAndUpdate(usuarioId,
        { IsDeleted: false }, // Restore by setting IsDeleted to false
        { new: true }); // Return the updated document
}

export default { createUsuario, getUsuario, getAllUsuarios, getUsuarioLibros, updateUsuario, deleteUsuario, restoreUsuario };