export interface IRecipe {
  id: string;
  name: string;
  slug: string;
  headline: string;
  image: string;
  selected: number;
  selectionLimit: number;
  extraCharge: number;
  yields: number;
}

export interface IGetRecipesQueryParams {
  page: number;
  pageSize: number;
  productId: string;
}

export interface IUpdateRecipeQueryParams {
  productId: string;
  recipeId: string;
}
