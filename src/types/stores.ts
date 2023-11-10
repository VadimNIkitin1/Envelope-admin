export interface IStore {
  name: string;
  id: number;
}

export interface IStoreInitialState {
  stores: IStore[];
  loading: boolean;
  error: string | null;
}
