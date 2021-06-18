import { makeAutoObservable } from "mobx";

export default class DirectionStore {
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }
}
