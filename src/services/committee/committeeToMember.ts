import { axios } from '../../utils';

import {
    ICommitteeToMemberCreateRes,
    ICommitteeToMemberDeleteArrayRes,
    ICommitteeToMemberDeleteRes,
    ICommitteeToMemberGetByIdRes,
    ICommitteeToMemberGetListRes,
    ICommitteeToMemberUpdateRes,
} from '../../interfaces/committee/committeeToMemberRes';
import { API } from '../../constants';
import {
    ICommitteeToMemberCreateReq,
    ICommitteeToMemberDeleteArrayReq,
    ICommitteeToMemberDeleteReq,
    ICommitteeToMemberGetByIdReq,
    ICommitteeToMemberUpdateReq,
} from '../../interfaces/committee/committeeToMemberReq';

class CommitteeToMemberService {
    root: string = 'committee-to-member';

    getList = () => {
        return new Promise<ICommitteeToMemberGetListRes[]>((resolve, reject) => {
            axios
                .get(`${API}/${this.root}/list`)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    getById = ({ id }: ICommitteeToMemberGetByIdReq) => {
        return new Promise<ICommitteeToMemberGetByIdRes>((resolve, reject) => {
            axios
                .get(`${API}/${this.root}`, { params: { id } })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- POST ---------- */
    create = (data: ICommitteeToMemberCreateReq) => {
        return new Promise<ICommitteeToMemberCreateRes>((resolve, reject) => {
            axios
                .post(`${API}/${this.root}`, data)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- PUT ---------- */
    update = (data: ICommitteeToMemberUpdateReq) => {
        return new Promise<ICommitteeToMemberUpdateRes>((resolve, reject) => {
            axios
                .put(`${API}/${this.root}`, data)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- DELETE ---------- */
    delete = (data: ICommitteeToMemberDeleteReq) => {
        return new Promise<ICommitteeToMemberDeleteRes>((resolve, reject) => {
            axios
                .delete(`${API}/${this.root}`, { data })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    deleteArray = (data: ICommitteeToMemberDeleteArrayReq) => {
        return new Promise<ICommitteeToMemberDeleteArrayRes>((resolve, reject) => {
            axios
                .delete(`${API}/${this.root}/delete-array`, { data })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };
}

export const committeeToMemberService = new CommitteeToMemberService();
