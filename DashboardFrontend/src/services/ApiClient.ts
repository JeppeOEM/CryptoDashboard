import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

const storedToken = localStorage.getItem('token');
const token = storedToken ? JSON.parse(storedToken) : null;

// Define headers based on the token
const headers = token ? {
  'Content-Type': 'application/json',
  'Authorization': `Token ${token.token}`,
} : {
  'Content-Type': 'application/json',
};

class ApiClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = () => {
    return axiosInstance.get<T[]>(this.endpoint, {headers}).then((res) => res.data);
  };

  get = (id: number) => {
    return axiosInstance
      .get<T>(`${this.endpoint}/${id}`,{headers})
      .then((res) => res.data);
  };

  post = (data: T) => {
    return axiosInstance.post<T>(this.endpoint, data, {headers}).then((res) => res.data);
  };

  delete = (id: number) => {
    return axiosInstance.delete(`${this.endpoint}/${id}`,{headers});
  };

  update = (id: number, data: T) => {
    return axiosInstance
      .put(`${this.endpoint}/${id}`, data,{headers})
      .then((res) => res.data);
  };
}

export default ApiClient;
