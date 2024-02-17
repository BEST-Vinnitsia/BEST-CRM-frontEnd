import { axios } from '../../utils';
import {
    IEventCreateRes,
    IEventDeleteArrayRes,
    IEventDeleteRes,
    IEventGetByIdRes,
    IEventGetListRes,
    IEventUpdateRes,
} from '../../interfaces/event/eventRes';
import { API } from '../../constants';
import {
    IEventCreateReq,
    IEventDeleteArrayReq,
    IEventDeleteReq,
    IEventGetByIdReq,
    IEventUpdateReq,
} from '../../interfaces/event/eventReq';

class EventService {
    root: string = 'event';

    getList = () => {
        return new Promise<IEventGetListRes[]>((resolve, reject) => {
            axios
                .get(`${API}/${this.root}/list`)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    getById = ({ id }: IEventGetByIdReq) => {
        return new Promise<IEventGetByIdRes>((resolve, reject) => {
            axios
                .get(`${API}/${this.root}`, { params: { id } })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- POST ---------- */
    create = (data: IEventCreateReq) => {
        return new Promise<IEventCreateRes>((resolve, reject) => {
            axios
                .post(`${API}/${this.root}`, data)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- PUT ---------- */
    update = (data: IEventUpdateReq) => {
        return new Promise<IEventUpdateRes>((resolve, reject) => {
            axios
                .put(`${API}/${this.root}`, data)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- DELETE ---------- */
    delete = (data: IEventDeleteReq) => {
        return new Promise<IEventDeleteRes>((resolve, reject) => {
            axios
                .delete(`${API}/${this.root}`, { data })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    deleteArray = (data: IEventDeleteArrayReq) => {
        return new Promise<IEventDeleteArrayRes>((resolve, reject) => {
            axios
                .delete(`${API}/${this.root}/delete-array`, { data })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };
}

export const eventService = new EventService();
