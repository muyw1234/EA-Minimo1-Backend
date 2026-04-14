import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import HistorialService from '../services/Historial';
import Logging from '../library/Logging';

const createHistorial = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const savedHistorial = await HistorialService.createHistorial(req.body);
        return res.status(201).json(savedHistorial);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const getHistorialById = async (req: Request, res: Response, next: NextFunction) => {
    const historialId = req.params.historialId;
    try {
        const libro = await HistorialService.getHistorialById(historialId);
        return libro ? res.status(200).json(libro) : res.status(404).json({ message: 'not found' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const getAllHistorial = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const libros = await HistorialService.getAllHistorials();
        return res.status(200).json(libros);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const updateHistorial = async (req: Request, res: Response, next: NextFunction) => {
    const historialId = req.params.historialId;
    try {
        const historial = await HistorialService.updateHistorial(historialId, req.body);
        if (historial) {
            return res.status(200).json(historial);
        } else {
            return res.status(404).json({ message: 'not found' });
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const deleteHistorial = async (req: Request, res: Response, next: NextFunction) => {
    const historialId = req.params.historialId;
    try {
        const historial = await HistorialService.deleteHistorial(historialId);
        return historial ? res.status(201).json(historial) : res.status(404).json({ message: 'not found' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export default { createHistorial, getAllHistorial, getHistorialById, updateHistorial, deleteHistorial };
