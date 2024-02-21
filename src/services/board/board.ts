import { axios } from '../../utils';

import {
    IBoardCreateRes,
    IBoardDeleteArrayRes,
    IBoardDeleteRes,
    IBoardGetByIdRes,
    IBoardGetListRes,
    IBoardUpdateRes,
} from '../../interfaces/board/boardRes';
import { API } from '../../constants';
import {
    IBoardCreateReq,
    IBoardDeleteArrayReq,
    IBoardDeleteReq,
    IBoardGetByIdReq,
    IBoardUpdateReq,
} from '../../interfaces/board/boardReq';

class BoardService {
    root: string = 'board';

    getList = () => {
        return new Promise<IBoardGetListRes[]>((resolve, reject) => {
            axios
                .get(`${API}/${this.root}/list`)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    getById = ({ id }: IBoardGetByIdReq) => {
        return new Promise<IBoardGetByIdRes>((resolve, reject) => {
            axios
                .get(`${API}/${this.root}`, { params: { id } })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- POST ---------- */
    create = (data: IBoardCreateReq) => {
        return new Promise<IBoardCreateRes>((resolve, reject) => {
            axios
                .post(`${API}/${this.root}`, data)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- PUT ---------- */
    update = (data: IBoardUpdateReq) => {
        return new Promise<IBoardUpdateRes>((resolve, reject) => {
            axios
                .put(`${API}/${this.root}`, data)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- DELETE ---------- */
    delete = ({ id }: IBoardDeleteReq) => {
        return new Promise<IBoardDeleteRes>((resolve, reject) => {
            axios
                .delete(`${API}/${this.root}`, { params: { id } })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    deleteArray = (data: IBoardDeleteArrayReq) => {
        return new Promise<IBoardDeleteArrayRes>((resolve, reject) => {
            axios
                .delete(`${API}/${this.root}/delete-array`, { data })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };
}

export const boardService = new BoardService();
