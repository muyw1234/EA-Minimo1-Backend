import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import LibroService from '../services/Libro';
import Logging from '../library/Logging';
import HistorialService from '../services/Historial';

const createLibro = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const savedLibro = await LibroService.createLibro(req.body);

        if (!savedLibro) {
            return res.status(400).json({ message: 'No se pudo crear el libro' });
        }

        // REGISTRO EN EL HISTORIAL
        await HistorialService.createHistorial({
            libro: (savedLibro as any)._id,
            accion: 'CREATE_LIBRO',
            descripcion: `Se registró el libro: ${savedLibro.title} (ISBN: ${savedLibro.isbn})`,
            fecha: new Date()
        });

        return res.status(201).json(savedLibro);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const getLibro = async (req: Request, res: Response, next: NextFunction) => {
    const libroId = req.params.libroId;
    try {
        const libro = await LibroService.getLibro(libroId);
        return libro ? res.status(200).json(libro) : res.status(404).json({ message: 'not found' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const getAllLibros = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const libros = await LibroService.getAllLibros();
        return res.status(200).json(libros);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const getAllLibros_NOT_Deleted = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const libros = await LibroService.getAllLibros_NOT_Deleted();
        return res.status(200).json(libros);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const updateLibro = async (req: Request, res: Response, next: NextFunction) => {
    const libroId = req.params.libroId;
    try {
        const libro = await LibroService.updateLibro(libroId, req.body);

        if (!libro) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }

        await HistorialService.createHistorial({
            libro: (libro as any)._id,
            accion: 'UPDATE_LIBRO',
            descripcion: `Se actualizó el libro: ${libro.title}`,
            fecha: new Date()
        });
        return res.status(200).json(libro);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const deleteLibro = async (req: Request, res: Response, next: NextFunction) => {
    const libroId = req.params.libroId;
    try {
        const libroEliminado = await LibroService.deleteLibro(libroId);

        if (!libroEliminado) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }

        await HistorialService.createHistorial({
            libro: (libroEliminado as any)._id,
            accion: 'DELETE_LIBRO',
            descripcion: `Se eliminó el libro: ${libroEliminado.title} (ISBN: ${libroEliminado.isbn || 'N/A'})`,
            fecha: new Date()
        });

        return res.status(200).json({
            message: 'Libro eliminado correctamente',
            libro: libroEliminado
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const restoreLibro = async (req: Request, res: Response, next: NextFunction) => {
    const libroId = req.params.libroId;
    try {
        const libro = await LibroService.restoreLibro(libroId);

        if (!libro) {
            return res.status(404).json({ message: 'Libro no encontrado para restaurar' });
        }

        // Registro en el historial
        await HistorialService.createHistorial({
            libro: (libro as any)._id,
            accion: 'RESTORE_LIBRO',
            descripcion: `Se restauró el libro: ${libro.title}`,
            fecha: new Date()
        });

        return res.status(200).json(libro);
    } catch (error) {
        return res.status(500).json({ error });
    }
};
/** Para testing */
export async function createLibroByIsbn(req: Request, res: Response, next: NextFunction) {
    const isbn = req.params.isbn;

    try {
        const libroExistente = await LibroService.getLibroByIsbn(isbn);

        if (libroExistente) {
            Logging.info(`Book already exists: ${libroExistente.isbn}`);
            return res.status(200).json(libroExistente);
        }

        // Si no existe, lo creamos
        const libroSaved = await LibroService.createLibroByIsbn(isbn);

        // Validamos que se haya creado correctamente para el historial
        if (libroSaved) {
            await HistorialService.createHistorial({
                libro: (libroSaved as any)._id,
                accion: 'CREATE_LIBRO_ISBN',
                descripcion: `Libro creado automáticamente vía ISBN: ${isbn}`,
                fecha: new Date()
            });
        }

        return res.status(201).json(libroSaved);
    } catch (error) {
        return res.status(500).json({ error });
    }
}

export default { createLibro, getLibro, getAllLibros, getAllLibros_NOT_Deleted, updateLibro, deleteLibro, restoreLibro, createLibroByIsbn };
