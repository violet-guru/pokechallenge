import axios from 'axios'

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
});

let documentName = 'pokemon';
export const getAllDocuments = () => api.get(`/${documentName}`);
export const getDocument = (name) => api.get(`/${documentName}/${name}`);

export default {
  getAllDocuments,
  getDocument
}