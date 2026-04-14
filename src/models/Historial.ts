import mongoose, { Schema } from 'mongoose';

export interface IHistorial {
    libro: mongoose.Types.ObjectId | string;
    accion: string;
    descripcion: string;
    fecha: Date;
}

export interface IHistorialModel extends IHistorial, Document {}

const HistorialSchema: Schema = new Schema({
    libro: { type: Schema.Types.ObjectId, required: false, ref: 'Libro' },
    accion: { type: String, required: true },
    descripcion: { type: String, required: true },
    fecha: { type: Date, default: Date.now }
});

export default mongoose.model<IHistorialModel>('Historial', HistorialSchema);
