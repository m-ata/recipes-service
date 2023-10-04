import { IProduct } from '../interfaces/product.interfaces';
import { db } from '../db';
import {
  IRecipe,
  IGetRecipesQueryParams,
  IUpdateRecipeQueryParams,
} from '../interfaces/recipe.interface';

/**
 * @param queryParams
 * @returns promise with the type of IRecipe array
 */
export const getRecipesByProductId = async (
  queryParams: IGetRecipesQueryParams,
): Promise<IRecipe[]> => {
  try {
    const { productId, page, pageSize } = queryParams;
    const query = { id: productId };
    const product = await new Promise<IProduct | null>((resolve, reject) => {
      db.findOne<IProduct>(query, (err, document) => {
        if (err) {
          reject(err);
        } else {
          resolve(document);
        }
      });
    });
    if (product) {
      // Calculate the start and end indexes for pagination
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      // sliced recipes
      return product.recipes.slice(startIndex, endIndex);
    } else return [];
  } catch (error) {
    console.error('Error in retrieving recipes:', error);
  }
};

/**
 * @param queryParams including productId and recipeId
 * @param recipe object to update recipe
 * @returns promise with the type of IRecipe
 */
export const updateRecipe = async (
  queryParams: IUpdateRecipeQueryParams,
  recipe: IRecipe,
): Promise<IRecipe> => {
  try {
    const { productId, recipeId } = queryParams;
    const productQuery = { id: productId };
    const product = await new Promise<IProduct | null>((resolve, reject) => {
      db.findOne<IProduct>(productQuery, (err, document) => {
        if (err) {
          reject(err);
        } else {
          resolve(document);
        }
      });
    });
    if (product) {
      // Find the index of the recipe within the product's recipes array
      const recipeIndex = product.recipes.findIndex(
        (recipe) => recipe.id === recipeId,
      );
      if (recipeIndex !== 1) {
        // Update the recipe
        product.recipes[recipeIndex] = {
          ...product.recipes[recipeIndex],
          ...recipe,
        };
        // Update the product in the database
        const updateResult = await new Promise<number>((resolve, reject) => {
          db.update<IProduct>(
            { id: product.id },
            { $set: { recipes: product.recipes } },
            {},
            (err, numReplaced) => {
              if (err) {
                reject(err);
              } else {
                resolve(numReplaced);
              }
            },
          );
        });

        if (updateResult === 1) {
          return product.recipes[recipeIndex];
        } else return null;
      }
    } else return null;
  } catch (error) {
    console.error('Error in updating recipe:', error);
  }
};
