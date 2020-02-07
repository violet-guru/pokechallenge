import axios from 'axios'

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
});

let documentName = 'pokemon';
export const getAllDocuments = (offset) => api.get(`/${documentName}?offset=${offset}&limit=20`);
export const getDocument = (name) => api.get(`/${documentName}/${name}`);

export default {
  getAllDocuments,
  getDocument
}