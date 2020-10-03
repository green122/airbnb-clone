const baseRoute = "/v1";

export const variationsRoute = `${baseRoute}/variations`;
export const deleteVariationRoute = (id:number) => `${variationsRoute}/${id}`;

export const optionsRoute = `${baseRoute}/options`;
export const categoriesRoute = `${baseRoute}/categories`;
export const pricesRoute = `${baseRoute}/prices`;
export const listingsRoute = `${baseRoute}/listings`;
export const signUpRoute = `${baseRoute}/register`;
export const refreshRoute = `${baseRoute}/refresh`;
export const authRoute = `${baseRoute}/authenticate`;
export const updateListingRoute = (id:number) => `${listingsRoute}/${id}`;

export const cartRoute = `${baseRoute}/cart`;
