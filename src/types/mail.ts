export interface IinitialStateMail {
  photo_url: string;
  loading: boolean;
  error: null | string;
}

export interface IRequestPhoto {
  store_id: string | number | undefined;
  formData: FormData;
}
