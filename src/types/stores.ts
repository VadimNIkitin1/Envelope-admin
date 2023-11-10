export interface IStore {
  name: string;
  id: number;
}

export interface IStoreInitialState {
  stores: IStore[];
  store_id: number;
  loading: boolean;
  error: string | null;
}
