import axios from 'axios';

export default class BaseService<T> {
  protected baseURL = 'http://34.87.37.63:8080/proptit';

  constructor() {}

  getAll(): Promise<T[]> {
    return axios
      .get(this.baseURL)
      .then(res => {
        return res.data;
      })
      .catch(err => console.log(err));
  }

  getById(id: String): Promise<T> {
    return axios
      .get(this.baseURL + `/${id}`)
      .then(res => {
        return res.data;
      })
      .catch(err => console.log(err));
  }

  add(item: T): Promise<void> {
    return axios
      .post(this.baseURL, item)
      .then(res => {
        console.log(res.status);
        return;
      })
      .catch(err => console.log(err));
  }

  update(item: T): Promise<void> {
    return axios
      .patch(this.baseURL, item)
      .then(res => {
        console.log(res.status);
        return;
      })
      .catch(err => console.log(err));
  }

  delete(id: String): Promise<void> {
    return axios
      .delete(this.baseURL + `/${id}`)
      .then(res => {
        console.log(res.status);
        return;
      })
      .catch(err => console.log(err));
  }
}
