import mongoose from 'mongoose';
import Historial, { IHistorial, IHistorialModel } from '../models/Historial';
import { callOpenLibraryBookApi } from './Util';
import Logging from '../library/Logging';

export async function createHistorial(data: Partial<IHistorial>): Promise<IHistorial | null> {
    const historial = new Historial({
        _id: new mongoose.Types.ObjectId(),
        fecha: new Date(),
        ...data
    });
    return await historial.save();
}

export async function getHistorialById(id: string): Promise<IHistorial | null> {
    return await Historial.findById(id).populate('libro');
}

export async function getAllHistorials(): Promise<IHistorial[] | []> {
    return await Historial.find().populate('libro');
}

export async function updateHistorial(id: string, data: IHistorial): Promise<IHistorial | null> {
    return await Historial.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteHistorial(id: string): Promise<IHistorial | null> {
    return await Historial.findByIdAndDelete(id);
}

export default { createHistorial, getAllHistorials, getHistorialById, updateHistorial, deleteHistorial };
