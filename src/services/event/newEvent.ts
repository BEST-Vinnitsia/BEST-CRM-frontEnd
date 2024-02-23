import { axios } from '../../utils';
import {
    INewEventCreateRes,
    INewEventDeleteArrayRes,
    INewEventDeleteRes,
    INewEventGetByCadenceIdRes,
    INewEventGetByEventIdRes,
    INewEventGetByIdRes,
    INewEventGetListRes,
    INewEventUpdateRes,
} from '../../interfaces/event/newEventRes';
import { API } from '../../constants';
import {
    INewEventCreateReq,
    INewEventDeleteArrayReq,
    INewEventDeleteReq,
    INewEventGetByCadenceIdReq,
    INewEventGetByEventIdReq,
    INewEventGetByIdReq,
    INewEventUpdateReq,
} from '../../interfaces/event/newEventReq';

class NewEventService {
    root: string = 'new-event';

    getList = () => {
        return new Promise<INewEventGetListRes[]>((resolve, reject) => {
            axios
                .get(`${API}/${this.root}/list`)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    getById = ({ id }: INewEventGetByIdReq) => {
        return new Promise<INewEventGetByIdRes>((resolve, reject) => {
            axios
                .get(`${API}/${this.root}`, { params: { id } })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    getByCadenceId = ({ cadenceId }: INewEventGetByCadenceIdReq) => {
        return new Promise<INewEventGetByCadenceIdRes[]>((resolve, reject) => {
            axios
                .get(`${API}/${this.root}/by-cadence-id`, { params: { cadenceId } })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    getByEventId = ({ eventId }: INewEventGetByEventIdReq) => {
        return new Promise<INewEventGetByEventIdRes[]>((resolve, reject) => {
            axios
                .get(`${API}/${this.root}/by-event-id`, { params: { eventId } })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- POST ---------- */
    create = (data: INewEventCreateReq) => {
        return new Promise<INewEventCreateRes>((resolve, reject) => {
            axios
                .post(`${API}/${this.root}`, data)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- PUT ---------- */
    update = (data: INewEventUpdateReq) => {
        return new Promise<INewEventUpdateRes>((resolve, reject) => {
            axios
                .put(`${API}/${this.root}`, data)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- DELETE ---------- */
    delete = (data: INewEventDeleteReq) => {
        return new Promise<INewEventDeleteRes>((resolve, reject) => {
            axios
                .delete(`${API}/${this.root}`, { data })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    deleteArray = (data: INewEventDeleteArrayReq) => {
        return new Promise<INewEventDeleteArrayRes>((resolve, reject) => {
            axios
                .delete(`${API}/${this.root}/delete-array`, { data })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };
}

export const newEventService = new NewEventService();
