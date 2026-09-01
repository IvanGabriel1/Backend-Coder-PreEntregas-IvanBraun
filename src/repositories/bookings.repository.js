
export class BookingRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getAll() {
        return this.dao.getAll();
    }

    getById(id, options) {
    return this.dao.getById(id, options);
}

    create(data) {
        return this.dao.create(data);
    }

    update(id, data) { 
        return this.dao.update(id, data);
    }

    
}