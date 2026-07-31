import { Router } from "express";
import { bookingManager } from "../managers/index.js";

const router = Router();


router.get('/:bid', async (req, res) => {

    try {
       const { bid } = req.params;

       const booking = await bookingManager.getBookingById(bid);

       if (!booking) {
        return res.status(404).json({
            status: 'error',
            message: 'Reserva no encontrada'
        });
       }

      res.status(200).json({
        status: 'success',
        payload: booking
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

       if( 
        !req.body ||
        typeof req.body !== 'object' ||
        Array.isArray(req.body)  
       ) {
         return res.status(400).json({
             status: 'error',
             message: 'Debe enviar un objeto válido'
            });
       }

       const newBooking = req.body;
       const booking = await bookingManager.createBooking(newBooking);

       res.status(201).json({
        status: 'success',
        message: 'Reserva agregada correctamente',
        payload: booking
       });

    } catch (error) {
         res.status(400).json({
            status: 'error',
            message: error.message
         });
    }
});

router.post('/:bid/services/:sid', async (req, res) => {
    try{
        const {bid, sid} = req.params;

        const addBooking = await bookingManager.addServiceToBooking(bid, sid);

       res.status(200).json({
        status: 'success',
        message: 'Servicio agregado correctamente a la reserva',
        payload: addBooking,
       })

    } catch (error) {

      if (error.message.includes('no encontrado') ) {
        return res.status(404).json({
            status: 'error',
            message: error.message
        });
      }

      res.status(400).json({
        status: 'error',
        message: error.message
      })
    }
})

export default router;