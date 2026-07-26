import { Router } from 'express';
import ServiceManager from '../managers/ServiceManager.js';

const router = Router();

const serviceManager = new ServiceManager();

router.get('/', (req, res) => {
    const { category, available } = req.query;

    const services = serviceManager.getServices(category, available);

    res.status(200).json({
        status: 'success',
        payload: services

    })
})

router.get('/:sid', (req, res) => {
    const { sid } = req.params;
    const service = serviceManager.getServiceById(sid);

    if(!service) {
        return res.status(404).json({
        status: 'error',
        message: 'Servicio no encontrado'
    });
    }

    res.status(200).json({
        status: 'success',
        payload: service
    });
});

router.post('/', (req, res) => {
    try {
        const newService = req.body;
        const service = serviceManager.addService(newService);

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

router.put('/:sid', (req, res) => {
    try {
        const {sid} = req.params;
        const updateData = req.body;
        const updatedService = serviceManager.updateService(sid, updateData);
         
        res.status(200).json({
            status: 'success',
            message: 'Servicio actualizado correctamente',
            payload: updatedService
        });

    } catch (error) { 
          return res.status(404).json({
                status: "error",
                message: error.message
            })
    }
})

router.delete('/:sid', (req, res) => {

    try {

        const { sid } = req.params;        
        const deletedService = serviceManager.deleteService(sid);

        res.status(200).json( {
            status: 'success',
            message: 'Servicio eliminado',
            payload: deletedService
            
        })
    } catch (error) {
            return res.status(404).json({
                status: 'error',
                message: error.message
            })
    }
})

export default router;