import { axios } from '../../utils';
import {
    IMemberCreateRes,
    IMemberDeleteArrayRes,
    IMemberDeleteRes,
    IMemberGetByIdRes,
    IMemberGetListRes,
    IMemberUpdateRes,
} from '../../interfaces/member/memberRes';
import { API } from '../../constants';
import {
    IMemberCreateReq,
    IMemberDeleteArrayReq,
    IMemberDeleteReq,
    IMemberGetByIdReq,
    IMemberUpdateReq,
} from '../../interfaces/member/memberReq';

class MemberService {
    root: string = 'member';

    /* --------- GET ---------- */
    getList = () => {
        return new Promise<IMemberGetListRes[]>((resolve, reject) => {
            axios
                .get(`${API}/${this.root}/list`)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    getById = ({ id }: IMemberGetByIdReq) => {
        return new Promise<IMemberGetByIdRes>((resolve, reject) => {
            axios
                .get(`${API}/${this.root}`, { params: { id } })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- POST ---------- */
    create = (data: IMemberCreateReq) => {
        return new Promise<IMemberCreateRes>((resolve, reject) => {
            axios
                .post(`${API}/${this.root}`, data)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- PUT ---------- */
    update = (data: IMemberUpdateReq) => {
        return new Promise<IMemberUpdateRes>((resolve, reject) => {
            axios
                .put(`${API}/${this.root}`, data)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- DELETE ---------- */
    delete = (data: IMemberDeleteReq) => {
        return new Promise<IMemberDeleteRes>((resolve, reject) => {
            axios
                .delete(`${API}/${this.root}`, { data })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    deleteArray = (data: IMemberDeleteArrayReq) => {
        return new Promise<IMemberDeleteArrayRes>((resolve, reject) => {
            axios
                .delete(`${API}/${this.root}/delete-array`, { data })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };
}

export const memberService = new MemberService();
