import { axios } from '../../utils';
import {
    ICommittee,
    ICommitteeCreate,
    ICommitteeDeleteArray,
    ICommitteeGetById,
    ICommitteeUpdate,
} from '../../interfaces/committee/committee';
import { ICommitteeAllInfo } from '../../interfaces/committee/committeeAllInfo';

class CommitteeService {
    root: string = 'committee';

    private path(route: string) {
        return `${process.env.REACT_APP_API_URL}/${this.root}/${route}`;
    }

    /* --------- GET ---------- */
    getList = () => {
        return new Promise<ICommittee[]>((resolve, reject) => {
            axios
                .get(this.path('list'))
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    getById = ({ id }: ICommitteeGetById) => {
        return new Promise<ICommittee>((resolve, reject) => {
            axios
                .get(this.path('by-id'), { params: { id } })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    getByIdAllInfo = ({ id }: ICommitteeGetById) => {
        return new Promise<ICommitteeAllInfo>((resolve, reject) => {
            axios
                .get(this.path('by-id-all-info'), { params: { id } })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- POST ---------- */
    create = (data: ICommitteeCreate) => {
        return new Promise<ICommittee>((resolve, reject) => {
            axios
                .post(this.path('create'), data)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- PUT ---------- */
    update = (data: ICommitteeUpdate) => {
        return new Promise<ICommittee>((resolve, reject) => {
            axios
                .put(this.path('update'), data)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- DELETE ---------- */
    deleteMany = (data: ICommitteeDeleteArray) => {
        return new Promise((resolve, reject) => {
            axios
                .delete(this.path('delete'), { data })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };
}

export const committeeService = new CommitteeService();
