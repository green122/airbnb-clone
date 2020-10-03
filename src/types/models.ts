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
  id: number | string;
  name: string;
  price?: number | {value: number};
}

export interface IVariation {
  id: number;
  variation: string;
  varyPrice?: boolean;
  options: IOption[];
}

export interface ICategory {
  id: string;
  name: string;
}

export interface ICategoryDetails extends ICategory {
  variations: IVariation[];
}

export interface IItemOption {
  variationId: string;
  optionId: string;
}

export interface IImageRecord {
  url: string;
  urlPreview: string;
}

export interface IListing {
  id: number;
  category: ICategoryDetails;
  options: IItemOption[];
  images: IImageRecord[];
  amount: number;
  from?: number;
  name: string;
  description: string;
}

export interface IVariationOptions {
  variationId: number;
  optionId: number | string;
}

export interface ISubmittedListing {
  listingId: number;
  variationsOptions?: IVariationOptions[];
  amount?: number;
  orderedItemId?: number;
}

export interface RawImage {
  image: ArrayBuffer;
  file: File;
}

export interface IRawListing extends Partial<IListing> {
  rawImages: RawImage[];
}

export interface IVariationsState {
  entities: IVariation[];
  loading: boolean;
  loaded: boolean;
}

export interface ICategoriesState {
  entitiesList: ICategory[];
  entities: { [id: string]: ICategoryDetails };
  loading: boolean;
  loaded: boolean;
}

export interface IListingsState {
  list: IListing[];
  entitiesMap: { [id: string]: IListing };
  loading: boolean;
  loaded: boolean;
}

export interface IUser {
  name: string;
  email: string;
  avatarUrl: string;
}

export interface IAuthState {
  isLogged: boolean;
  user: IUser | null;
  loading: boolean;
  loadingCurrent: boolean;
  loaded: boolean;
}

export interface ICartItem {
  amount: number;
  listing: IListing;
  id: number;
  orderedVariations: Array<{
    optionId: number;
    variationId: number;
  }>;
}

export interface ICartState {
  content: ICartItem[];
  total: number;
  loading: boolean;
  loaded: boolean;
}

export interface IOptionsState {
  entities: IOption[];
  loading: boolean;
  loaded: boolean;
}
