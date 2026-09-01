export class ServicesService {
    constructor(repository, bookingRepository) {
        this.repository = repository;
        this.bookingRepository = bookingRepository;
    }

   
    async createService(data) {
    const {name, description, duration, price, category, available} = data;

     return this.repository.create({ name, description, duration, price, category, available });
    }

    async getServiceById(id) {
        const service = await this.repository.getById(id);
        if (!service) {
           const error = new Error("Servicio no encontrado");
           error.statusCode = 404;
           throw error; 
        }
        return service;
    }
    
   async delete(id) {

     const bookings = await this.bookingRepository.getAll();

    const bookingUsingService = bookings.find(
        booking =>
            booking.status !== "cancelada" &&
            booking.services.some(
                s => s.service.toString() === id.toString()
            )
    );

    if (bookingUsingService) {
        const error = new Error(
            "No se puede eliminar el servicio porque está asociado a una reserva activa"
        );
        error.statusCode = 400;
        throw error;
    }

    const deletedService = await this.repository.delete(id);

    if (!deletedService) {
        const error = new Error("Servicio no encontrado");
        error.statusCode = 404;
        throw error;
    }

    return deletedService;

   }

  async getServices(query = {}) {

    const page = Number(query.page) > 0 ? Number(query.page) : 1;
    const limit = Number(query.limit) > 0 ? Number(query.limit) : 10;

    const filter = {};

    if (query.category) {
        filter.category = query.category;
    }

    if (query.available !== undefined) {
        filter.available = query.available === "true";
    }

    const result = await this.repository.getAll({
        filter,
        page,
        limit,
        sortBy: query.sortBy,
        order: query.order
    });

    if (!result.services || result.services.length === 0) {
        const error = new Error("No hay servicios disponibles");
        error.statusCode = 404;
        throw error;
    }

    return {
        payload: result.services,
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage
    };
}

    async update(id, data) { 

    const {name, description, duration, price, category, available} = data;

        if( !name ||
            !description ||
            !duration ||
            !price ||
            !category ||
            available === undefined
        ) {
             const error = new Error("Todos los campos son obligatorios");
             error.statusCode = 400;
             throw error;
        }

        const updatedService = await this.repository.update(id, {
            name, description, duration, price, category, available
        });

        if(!updatedService){
             const error = new Error("Servicio no encontrado");
             error.statusCode = 404;
             throw error;
        }



        return updatedService;

    }
}