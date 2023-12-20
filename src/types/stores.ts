export interface IStore {
  id: number;
  info: {
    link_bot: string;
    name: string;
  };
}

export interface IStoreInitialState {
  stores: IStore[];
  store: IStore;
  loading: boolean;
  error: string | null;
}
