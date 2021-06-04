import axios, { AxiosResponse } from "axios";
import { Recipe } from "../models/recipe";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "https://localhost:44351/api";

axios.interceptors.response.use(async (response) => {
  try {
    await sleep(1000);
    return response;
  } catch (error) {
    console.log(error);
    return await Promise.reject(error);
  }
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Recipes = {
  list: () => requests.get<Recipe[]>("/Recipes"),
  details: (id: string) => requests.get<Recipe>(`/Recipes/${id}`),
  create: (recipe: Recipe) => requests.post<void>("/Recipes", recipe),
  update: (recipe: Recipe) =>
    requests.put<void>(`/Recipes/${recipe.id}`, recipe),
  delete: (id: string) => requests.del<void>(`/Recipes/${id}`),
};

const agent = {
  Recipes,
};

export default agent;
