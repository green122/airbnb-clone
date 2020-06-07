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
  images: { picture_url: string };
  bedrooms: number;
  description: string;
  dailyRate: number;
  shared: boolean;
  createdAt: string;
}

export interface IRentalState {
  entities: IRental[] | null;
  detailedRentals: { [id: string]: IRental } | null;
  loading: boolean;
  loaded: boolean;
}

export interface IOption {
  id: string;
  name: string;
  price?: number;
}

export interface IVariation {
  id: string;
  variation: string;
  varyPrice?: boolean;
  options: IOption[];
}

export interface ICategory {
  id: string;
  name: string;
}

export interface ICategoryDetails extends  ICategory{
  variations: IVariation[];
}

export interface IItemOption {
  variationId: string;
  optionId: string;
}

export interface IListing {
  id: string;
  category: ICategory;
  options: IItemOption[];
  photoUrls: string[];
  amount: number;
  description: string;
}

export interface IRawListing extends Partial<IListing>{
  images: ArrayBuffer[];
  file: File;
}

export interface IVariationsState {
  entities: IVariation[];
  loading: boolean;
  loaded: boolean;
}

export interface ICategoriesState {
  entitiesList: ICategory[];
  entities: {[id: string]: ICategoryDetails};
  loading: boolean;
  loaded: boolean;
}

export interface IListingsState {
  entities: IListing[];
  loading: boolean;
  loaded: boolean;
}

export interface IOptionsState {
  entities: IOption[];
  loading: boolean;
  loaded: boolean;
}

