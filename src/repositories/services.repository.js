
export class ServiceRepository {
       constructor(dao) {
        this.dao = dao;
    }

    create(data) {
        return this.dao.create(data);
    }

    getAll() {
    return this.dao.getAll();
    }

    getById(id) {
        return this.dao.getById(id);
    }

    update(id, data) {
        return this.dao.update(id, data);
    }

    delete(id) {
    return this.dao.delete(id);
    }
}