import { axios } from '../../utils';
import {
    IBoardToMemberCreateRes,
    IBoardToMemberDeleteArrayRes,
    IBoardToMemberDeleteRes,
    IBoardToMemberGetByIdRes,
    IBoardToMemberGetListRes,
    IBoardToMemberUpdateRes,
} from '../../interfaces/board/boardToMemberRes';
import { API } from '../../constants';
import {
    IBoardToMemberCreateReq,
    IBoardToMemberDeleteArrayReq,
    IBoardToMemberDeleteReq,
    IBoardToMemberGetByBoardIdReq,
    IBoardToMemberGetByCadenceIdReq,
    IBoardToMemberGetByIdReq,
    IBoardToMemberGetByMemberIdReq,
    IBoardToMemberUpdateReq,
} from '../../interfaces/board/boardToMemberReq';

class BoardToMemberService {
    root: string = 'board-to-member';

    getList = () => {
        return new Promise<IBoardToMemberGetListRes[]>((resolve, reject) => {
            axios
                .get(`${API}/${this.root}/list`)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    getById = ({ id }: IBoardToMemberGetByIdReq) => {
        return new Promise<IBoardToMemberGetByIdRes>((resolve, reject) => {
            axios
                .get(`${API}/${this.root}`, { params: { id } })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    getByMemberId = ({ memberId }: IBoardToMemberGetByMemberIdReq) => {
        return new Promise<IBoardToMemberGetByIdRes[]>((resolve, reject) => {
            axios
                .get(`${API}/${this.root}/by-member-id`, { params: { memberId } })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    getByCadenceId = ({ cadenceId }: IBoardToMemberGetByCadenceIdReq) => {
        return new Promise<IBoardToMemberGetByIdRes[]>((resolve, reject) => {
            axios
                .get(`${API}/${this.root}/by-cadence-id`, { params: { cadenceId } })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    getByBoardId = ({ boardId }: IBoardToMemberGetByBoardIdReq) => {
        return new Promise<IBoardToMemberGetByIdRes[]>((resolve, reject) => {
            axios
                .get(`${API}/${this.root}/by-board-id`, { params: { boardId } })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- POST ---------- */
    create = (data: IBoardToMemberCreateReq) => {
        return new Promise<IBoardToMemberCreateRes>((resolve, reject) => {
            axios
                .post(`${API}/${this.root}`, data)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- PUT ---------- */
    update = (data: IBoardToMemberUpdateReq) => {
        return new Promise<IBoardToMemberUpdateRes>((resolve, reject) => {
            axios
                .put(`${API}/${this.root}`, data)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- DELETE ---------- */
    delete = (data: IBoardToMemberDeleteReq) => {
        return new Promise<IBoardToMemberDeleteRes>((resolve, reject) => {
            axios
                .delete(`${API}/${this.root}`, { data })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    deleteArray = (data: IBoardToMemberDeleteArrayReq) => {
        return new Promise<IBoardToMemberDeleteArrayRes>((resolve, reject) => {
            axios
                .delete(`${API}/${this.root}/delete-array`, { data })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };
}

export const boardToMemberService = new BoardToMemberService();
