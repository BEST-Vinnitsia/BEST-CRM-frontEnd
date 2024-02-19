import { axios } from '../../utils';
import {
    ICoordinatorToMemberCreateRes,
    ICoordinatorToMemberDeleteArrayRes,
    ICoordinatorToMemberDeleteRes,
    ICoordinatorToMemberGetByIdRes,
    ICoordinatorToMemberGetListRes,
    ICoordinatorToMemberUpdateRes,
} from '../../interfaces/coordinator/coordinatorToMemberRes';
import { API } from '../../constants';
import {
    ICoordinatorToMemberCreateReq,
    ICoordinatorToMemberDeleteArrayReq,
    ICoordinatorToMemberDeleteReq,
    ICoordinatorToMemberGetByCadenceIdReq,
    ICoordinatorToMemberGetByCoordinatorIdReq,
    ICoordinatorToMemberGetByIdReq,
    ICoordinatorToMemberGetByMemberIdReq,
    ICoordinatorToMemberUpdateReq,
} from '../../interfaces/coordinator/coordinatorToMemberReq';

class CoordinatorToMemberService {
    root: string = 'coordinator-to-member';

    getList = () => {
        return new Promise<ICoordinatorToMemberGetListRes[]>((resolve, reject) => {
            axios
                .get(`${API}/${this.root}/list`)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    getById = ({ id }: ICoordinatorToMemberGetByIdReq) => {
        return new Promise<ICoordinatorToMemberGetByIdRes>((resolve, reject) => {
            axios
                .get(`${API}/${this.root}`, { params: { id } })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    getByMemberId = ({ memberId }: ICoordinatorToMemberGetByMemberIdReq) => {
        return new Promise<ICoordinatorToMemberGetByIdRes[]>((resolve, reject) => {
            axios
                .get(`${API}/${this.root}/by-member-id`, { params: { memberId } })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    getByCadenceId = ({ cadenceId }: ICoordinatorToMemberGetByCadenceIdReq) => {
        return new Promise<ICoordinatorToMemberGetByIdRes[]>((resolve, reject) => {
            axios
                .get(`${API}/${this.root}/by-cadence-id`, { params: { cadenceId } })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    getByCoordinatorId = ({ coordinatorId }: ICoordinatorToMemberGetByCoordinatorIdReq) => {
        return new Promise<ICoordinatorToMemberGetByIdRes[]>((resolve, reject) => {
            axios
                .get(`${API}/${this.root}/by-coordinator-id`, { params: { coordinatorId } })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- POST ---------- */
    create = (data: ICoordinatorToMemberCreateReq) => {
        return new Promise<ICoordinatorToMemberCreateRes>((resolve, reject) => {
            axios
                .post(`${API}/${this.root}`, data)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- PUT ---------- */
    update = (data: ICoordinatorToMemberUpdateReq) => {
        return new Promise<ICoordinatorToMemberUpdateRes>((resolve, reject) => {
            axios
                .put(`${API}/${this.root}`, data)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- DELETE ---------- */
    delete = (data: ICoordinatorToMemberDeleteReq) => {
        return new Promise<ICoordinatorToMemberDeleteRes>((resolve, reject) => {
            axios
                .delete(`${API}/${this.root}`, { data })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    deleteArray = (data: ICoordinatorToMemberDeleteArrayReq) => {
        return new Promise<ICoordinatorToMemberDeleteArrayRes>((resolve, reject) => {
            axios
                .delete(`${API}/${this.root}/delete-array`, { data })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };
}

export const coordinatorToMemberService = new CoordinatorToMemberService();
