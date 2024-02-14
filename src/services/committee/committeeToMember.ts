import { axios } from '../../utils';
import {
    ICommitteeToMember,
    ICommitteeToMemberCreate,
    ICommitteeToMemberDeleteArray,
    ICommitteeToMemberGetById,
    ICommitteeToMemberUpdate,
} from '../../interfaces/committee/committeeToMember';

class CommitteeToMemberService {
    root: string = 'committee-to-member';

    private path(route: string) {
        return `${process.env.REACT_APP_API_URL}/${this.root}/${route}`;
    }

    /* --------- GET ---------- */
    getList = () => {
        return new Promise<ICommitteeToMember[]>((resolve, reject) => {
            axios
                .get(this.path('list'))
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    getById = ({ id }: ICommitteeToMemberGetById) => {
        return new Promise<ICommitteeToMember>((resolve, reject) => {
            axios
                .get(this.path('by-id'), { params: { id } })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- POST ---------- */
    create = (data: ICommitteeToMemberCreate) => {
        return new Promise<ICommitteeToMember>((resolve, reject) => {
            axios
                .post(this.path('create'), data)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- PUT ---------- */
    update = (data: ICommitteeToMemberUpdate) => {
        return new Promise<ICommitteeToMember>((resolve, reject) => {
            axios
                .put(this.path('update'), data)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- DELETE ---------- */
    deleteMany = (data: ICommitteeToMemberDeleteArray) => {
        return new Promise((resolve, reject) => {
            axios
                .delete(this.path('delete'), { data })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };
}

export const committeeToMemberService = new CommitteeToMemberService();
