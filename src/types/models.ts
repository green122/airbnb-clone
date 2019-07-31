// for testing: https://jsonplaceholder.typicode.com/users/1/posts
export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface IPostsStoreState {
  items: IPost[] | null;
  error: any;
  loading: boolean;
}

export interface IRental {
  _id: string;
  title: string;
  city: string;
  name: string;
  street: string;
  category: string;
  images: {picture_url: string};
  bedrooms: number;
  description: string;
  dailyRate: number;
  shared: boolean;
  createdAt: string;
}


export interface IRentalState {
  entities: IRental[] | null;
  detailedRentals: { [id: string] : IRental } | null;
  loading: boolean;
  loaded: boolean;
}
