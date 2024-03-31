import { axios } from '../utils';
import { API } from '../constants';

class EventCategoryServices {
    private root: string = 'event/category';

    public getList = () => {
        return new Promise<any[]>((resolve, reject) => {
            axios
                .get(`${API}/${this.root}/list`)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    public getById = ({ id }: any) => {
        return new Promise<any>((resolve, reject) => {
            axios
                .get(`${API}/${this.root}/details`, { params: { id } })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    public create = (data: any) => {
        return new Promise<any>((resolve, reject) => {
            axios
                .post(`${API}/${this.root}/create`, data)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    public update = (data: any) => {
        return new Promise<any>((resolve, reject) => {
            axios
                .put(`${API}/${this.root}/update`, data)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    public delete = (data: any) => {
        return new Promise<any>((resolve, reject) => {
            axios
                .delete(`${API}/${this.root}/delete`, { data })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };
}

export const eventCategoryServices = new EventCategoryServices();
