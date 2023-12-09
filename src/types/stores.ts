export interface IStore {
  id: number;
  name: string;
}

export interface IStoreInitialState {
  stores: IStore[];
  store: IStore;
  loading: boolean;
  error: string | null;
}
