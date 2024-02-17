import { axios } from '../../utils';
import {
    INewEventToMemberCreateRes,
    INewEventToMemberDeleteArrayRes,
    INewEventToMemberDeleteRes,
    INewEventToMemberGetByIdRes,
    INewEventToMemberGetListRes,
    INewEventToMemberUpdateRes,
} from '../../interfaces/event/newEventToMemberRes';
import { API } from '../../constants';
import {
    INewEventToMemberCreateReq,
    INewEventToMemberDeleteArrayReq,
    INewEventToMemberDeleteReq,
    INewEventToMemberGetByIdReq,
    INewEventToMemberUpdateReq,
} from '../../interfaces/event/newEventToMemberReq';

class NewEventToMemberService {
    root: string = 'new-event-to-member';

    getList = () => {
        return new Promise<INewEventToMemberGetListRes[]>((resolve, reject) => {
            axios
                .get(`${API}/${this.root}/list`)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    getById = ({ id }: INewEventToMemberGetByIdReq) => {
        return new Promise<INewEventToMemberGetByIdRes>((resolve, reject) => {
            axios
                .get(`${API}/${this.root}`, { params: { id } })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- POST ---------- */
    create = (data: INewEventToMemberCreateReq) => {
        return new Promise<INewEventToMemberCreateRes>((resolve, reject) => {
            axios
                .post(`${API}/${this.root}`, data)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- PUT ---------- */
    update = (data: INewEventToMemberUpdateReq) => {
        return new Promise<INewEventToMemberUpdateRes>((resolve, reject) => {
            axios
                .put(`${API}/${this.root}`, data)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- DELETE ---------- */
    delete = (data: INewEventToMemberDeleteReq) => {
        return new Promise<INewEventToMemberDeleteRes>((resolve, reject) => {
            axios
                .delete(`${API}/${this.root}`, { data })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    deleteArray = (data: INewEventToMemberDeleteArrayReq) => {
        return new Promise<INewEventToMemberDeleteArrayRes>((resolve, reject) => {
            axios
                .delete(`${API}/${this.root}/delete-array`, { data })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };
}

export const newEventToMemberService = new NewEventToMemberService();
