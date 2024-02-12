import { axios } from '../utils';
import { ICadence, ICadenceCreate, ICadenceDeleteArray, ICadenceGetById, ICadenceUpdate } from '../interfaces/cadence';

class CadenceService {
    root: string = 'cadence';

    private path(route: string) {
        return `${process.env.REACT_APP_API_URL}/${this.root}/${route}`;
    }

    /* --------- GET ---------- */
    getList = () => {
        return new Promise<ICadence[]>((resolve, reject) => {
            axios
                .get(this.path('list'))
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    getById = ({ id }: ICadenceGetById) => {
        return new Promise<ICadence>((resolve, reject) => {
            axios
                .get(this.path('by-id'), { params: { id } })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- POST ---------- */
    create = (data: ICadenceCreate) => {
        return new Promise<ICadence>((resolve, reject) => {
            axios
                .post(this.path('create'), data)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- PUT ---------- */
    update = (data: ICadenceUpdate) => {
        return new Promise<ICadence>((resolve, reject) => {
            axios
                .put(this.path('update'), data)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- DELETE ---------- */
    deleteMany = (data: ICadenceDeleteArray) => {
        return new Promise((resolve, reject) => {
            axios
                .delete(this.path('delete'), { data })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };
}

export const cadenceService = new CadenceService();
