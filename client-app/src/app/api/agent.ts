import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { Direction } from "../models/direction";
import { Ingredient, IngredientValues } from "../models/ingredient";
import { PaginatedResult } from "../models/pagination";
import { Photo, Recipe, RecipeFormValues } from "../models/recipe";
import { RecipeIngredient } from "../models/RecipeIngredient";
import { User, UserFormValues } from "../models/user";
import { store } from "../stores/store";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    if (process.env.NODE_ENV === "development") await sleep(1000);
    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginatedResult(
        response.data,
        JSON.parse(pagination)
      );
      return response as AxiosResponse<PaginatedResult<any>>;
    }
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response!;
    switch (status) {
      case 400:
        if (typeof data === "string") {
          toast.error(data);
        }
        if (config.method === "get" && data.errors.hasOwnProperty("id")) {
          history.push("/not-found");
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        }
        break;
      case 401:
        toast.error("unauthorized");
        break;
      case 404:
        history.push("/not-found");
        break;
      case 500:
        store.commonStore.setServerError(data);
        history.push("/server-error");
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Recipes = {
  list: (params: URLSearchParams) =>
    axios
      .get<PaginatedResult<Recipe[]>>("/Recipes", { params })
      .then(responseBody),
  details: (id: string) => requests.get<Recipe>(`/Recipes/${id}`),
  create: (recipe: Recipe) => requests.post<void>("/Recipes", recipe),
  update: (recipe: RecipeFormValues) =>
    requests.put<void>(`/Recipes/${recipe.id}`, recipe),
  delete: (id: string) => requests.del<void>(`/Recipes/${id}`),
  uploadPhoto: (file: Blob, id: string) => {
    let formData = new FormData();
    formData.append("File", file);
    return axios.post<Photo>(`/photos/${id}`, formData, {
      headers: { "Content-type": "multipart/form-data" },
    });
  },
  deletePhoto: (id: string) => requests.del(`/photos/${id}`),
  replacePhoto: (file: Blob, id: string) => {
    let formData = new FormData();
    formData.append("File", file);
    return axios.put<Photo>(`/photos/${id}`, formData, {
      headers: { "Content-type": "multipart/form-data" },
    });
  },
};

const Directions = {
  create: (id: string, direction: Direction) =>
    requests.post<void>(`/directions/${id}`, direction),
  delete: (id: string) => requests.del<void>(`/directions/${id}`),
};

const RecipeIngredients = {
  create: (id: string, ingredient: RecipeIngredient) =>
    requests.post<void>(`/Recipes/${id}/addRecipeIngredient`, ingredient),
  delete: (id: string, ingredientName: string) =>
    requests.del<void>(`/Recipes/${id}/removeIngredient/${ingredientName}`),
};

const Ingredients = {
  list: () => requests.get<Ingredient[]>("/Ingredients"),
  create: (ingredient: IngredientValues) =>
    requests.post<void>("/Ingredients", ingredient),
};

const Account = {
  current: () => requests.get<User>("/account"),
  login: (user: UserFormValues) => requests.post<User>("/account/login", user),
};

const agent = {
  Recipes,
  Account,
  RecipeIngredients,
  Ingredients,
  Directions,
};

export default agent;
