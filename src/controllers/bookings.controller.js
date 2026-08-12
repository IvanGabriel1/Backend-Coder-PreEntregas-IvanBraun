import { bookingService } from "../config/index.js";

export const getBookingById = async (req, res) => {
      try {
       const { bid } = req.params;

       const booking = await bookingService.getBookingById(bid);

      res.status(200).json({
        status: 'success',
        payload: booking
      });

    } catch (error) {

         if (error.message === "no encontrada") {
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

export const createBooking = async (req, res) => {

    try {

       const newBooking = req.body;
       const booking = await bookingService.createBooking(newBooking);

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
}

export const addServiceToBooking = async (req, res) => {
 try{
        const {bid, sid} = req.params;

        const addBooking = await bookingService.addServiceToBooking(bid, sid);

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
}