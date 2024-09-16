import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const editPerson = (id, newData) => {
  return axios.put(`${baseUrl}/${id}`, newData);
};

export default { getAll, create, deletePerson, editPerson };
