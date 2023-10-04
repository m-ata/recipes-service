import { IRecipe } from './recipe.interface';

export interface IProduct {
  id: string;
  productName: string;
  headline: string;
  min: number;
  max: number;
  baseRecipePrice: number;
  shippingPrice: number;
  recipes: IRecipe[];
}
