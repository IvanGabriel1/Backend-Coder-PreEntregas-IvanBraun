import { Router } from 'express';
import { serviceManager } from "../managers/index.js";

const router = Router();


router.get('/', async (req, res) => {
    try {
        const { category, available } = req.query;

        const services = await serviceManager.getServices(
            category,
            available
        );

        res.json({
            status: 'success',
            payload: services
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
})

router.get('/:sid', async (req, res) => {
    try {
        const { sid } = req.params;

        const service = await serviceManager.getServiceById(sid);

        if (!service) {
            return res.status(404).json({
                status: 'error',
                message: 'Servicio no encontrado'
            });
        }

        res.status(200).json({
            status: 'success',
            payload: service
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

router.post('/', async (req, res) => {
    try {

        if (
            !req.body ||
            typeof req.body !== 'object' ||
            Array.isArray(req.body)
        ) {
            return res.status(400).json({
             status: 'error',
             message: 'Debe enviar un objeto válido'
            });
        }

        const newService = req.body;
        const service = await serviceManager.addService(newService);

        res.status(201).json({
            status: 'success',
            message: 'Servicio agregado correctamente',
            payload: service
        });

    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});

router.put('/:sid', async (req, res) => {
    try {

        if (
            !req.body ||
            typeof req.body !== 'object' ||
            Array.isArray(req.body)
        ) {
            return res.status(400).json({
             status: 'error',
             message: 'Debe enviar un objeto válido'
            });
        }

        const {sid} = req.params;
        const updateData = req.body;
        const updatedService = await serviceManager.updateService(sid, updateData);
         
        res.status(200).json({
            status: 'success',
            message: 'Servicio actualizado correctamente',
            payload: updatedService
        });

    } catch (error) { 

        if (error.message.includes('no encontrado')) {
            return res.status(404).json({
                status: 'error',
                message: error.message
            });
        }
         
         res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
})

router.delete('/:sid', async (req, res) => {

    try {

        const { sid } = req.params;        
        const deletedService = await serviceManager.deleteService(sid);

        res.status(200).json( {
            status: 'success',
            message: 'Servicio eliminado',
            payload: deletedService
            
        })
    } catch (error) {

            if (error.message.includes('no encontrado')) {
            return res.status(404).json({
                status: 'error',
                message: error.message
            });
        }
         
         res.status(400).json({
            status: 'error',
            message: error.message
        });
        
    }
})

export default router;