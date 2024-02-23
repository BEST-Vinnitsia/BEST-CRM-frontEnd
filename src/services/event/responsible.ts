import { axios } from '../../utils';
import {
    IResponsibleCreateRes,
    IResponsibleDeleteArrayRes,
    IResponsibleDeleteRes,
    IResponsibleGetByEventIdRes,
    IResponsibleGetByIdRes,
    IResponsibleGetListRes,
    IResponsibleUpdateRes,
} from '../../interfaces/event/responsibleRes';
import { API } from '../../constants';
import {
    IResponsibleCreateReq,
    IResponsibleDeleteArrayReq,
    IResponsibleDeleteReq,
    IResponsibleGetByEventIdReq,
    IResponsibleGetByIdReq,
    IResponsibleUpdateReq,
} from '../../interfaces/event/responsibleReq';

class ResponsibleService {
    root: string = 'responsible';

    getList = () => {
        return new Promise<IResponsibleGetListRes[]>((resolve, reject) => {
            axios
                .get(`${API}/${this.root}/list`)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    getById = ({ id }: IResponsibleGetByIdReq) => {
        return new Promise<IResponsibleGetByIdRes>((resolve, reject) => {
            axios
                .get(`${API}/${this.root}`, { params: { id } })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    getByEventId = ({ eventId }: IResponsibleGetByEventIdReq) => {
        return new Promise<IResponsibleGetByEventIdRes[]>((resolve, reject) => {
            axios
                .get(`${API}/${this.root}/by-event-id`, { params: { eventId } })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- POST ---------- */
    create = (data: IResponsibleCreateReq) => {
        return new Promise<IResponsibleCreateRes>((resolve, reject) => {
            axios
                .post(`${API}/${this.root}`, data)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- PUT ---------- */
    update = (data: IResponsibleUpdateReq) => {
        return new Promise<IResponsibleUpdateRes>((resolve, reject) => {
            axios
                .put(`${API}/${this.root}`, data)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- DELETE ---------- */
    delete = (data: IResponsibleDeleteReq) => {
        return new Promise<IResponsibleDeleteRes>((resolve, reject) => {
            axios
                .delete(`${API}/${this.root}`, { data })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    deleteArray = (data: IResponsibleDeleteArrayReq) => {
        return new Promise<IResponsibleDeleteArrayRes>((resolve, reject) => {
            axios
                .delete(`${API}/${this.root}/delete-array`, { data })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };
}

export const responsibleService = new ResponsibleService();
