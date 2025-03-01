export interface JsonPlaceholderUser {
  id?: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export type JsonPlaceholderUserFilterKeys = keyof Omit<
  JsonPlaceholderUser,
  'id' | 'address' | 'company'
>;

export type JsonPlaceholderUserFilters = Partial<
  Record<JsonPlaceholderUserFilterKeys, string | number | boolean>
>;
