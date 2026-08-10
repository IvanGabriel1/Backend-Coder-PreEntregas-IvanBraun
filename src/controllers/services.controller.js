import { serviceService } from "../config/index.js";

export const getServices = async  (req, res) => {
    try {
        const { category, available } = req.query;

       const services = await serviceService.getServices(category, available);

        res.status(200).json({
            status: 'success',
            payload: services
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
}

export const getServiceById = async (req, res) => { 

    try {
        const { sid } = req.params;

        const service = await serviceService.getServiceById(Number(sid));

        res.status(200).json({
            status: 'success',
            payload: service
        });

    } catch (error) {
        
        if (error.message === "Servicio no encontrado") {
            return res.status(404).json({
                status: 'error',
                message: error.message
            });
        }

        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }

}

export const createService = async (req, res) => {

    try {       
        const service = await serviceService.createService(req.body);

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

}

export const updateService = async (req, res) => {

    try {

        const {sid} = req.params;
        const updateData = req.body;
        const updatedService = await serviceService.updateService(Number(sid), updateData);
         
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
}

export const deleteService = async (req, res) => {
    try {

        const { sid } = req.params;        
        const deletedService = await serviceService.deleteService(Number(sid));

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
}

