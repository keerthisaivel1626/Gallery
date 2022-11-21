//https://jsonplaceholder.typicode.com/photos?_start=0&_limit=50
//https://jsonplaceholder.typicode.com/posts?_start=0&_limit=50

const BASE_URL = 'https://jsonplaceholder.typicode.com/';
import axios from 'axios';

export const GETAPI = async endPoint => {
  let url = BASE_URL + endPoint;

  let response = await axios.get(url);
  const {data} = response;
  return {data};
};
