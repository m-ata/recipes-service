import express, { Request, Response } from 'express';
import {
  getRecipesByProductId,
  updateRecipe,
} from '../controllers/recipe.controller';
import {
  ENDPOINTS,
  GET_RECIPE_SUCCESS,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  UPDATE_SUCCESSFULLY,
} from '../constants';
import { IRecipe } from '../interfaces/recipe.interface';

const recipesRouter = express.Router();

// get recipes by product name with pagination
recipesRouter.get(
  ENDPOINTS.GET_RECIPES,
  async (req: Request, res: Response) => {
    try {
      const { page = 1, pageSize = 10, productId } = req.query;
      const recipes = await getRecipesByProductId({
        productId: productId.toString(),
        page: parseInt(page as string),
        pageSize: parseInt(pageSize as string),
      });
      if (recipes?.length) {
        // Handle success case and return recipe list
        res.status(200).json({
          success: true,
          message: GET_RECIPE_SUCCESS,
          data: recipes,
        });
      } else {
        // Handle not found case
        res.status(404).json({
          success: false,
          message: NOT_FOUND,
          data: recipes,
        });
      }
    } catch (error) {
      // Handle error
      if (error.status)
        res.status(error.status).send({
          success: false,
          message: error.message,
          data: null,
        });
      else
        res.status(500).send({
          success: false,
          message: INTERNAL_SERVER_ERROR,
          data: null,
        });
    }
  },
);

// update recipe by recipeId and productId
recipesRouter.put(
  ENDPOINTS.UPDATE_RECIPE,
  async (req: Request, res: Response) => {
    try {
      const { productId, recipeId } = req.query;
      const updatedRecipe = req.body as IRecipe;
      const recipe = await updateRecipe(
        { productId: productId.toString(), recipeId: recipeId.toString() },
        updatedRecipe,
      );
      if (recipe) {
        // Handle success case
        res.status(200).json({
          success: true,
          message: UPDATE_SUCCESSFULLY,
          data: recipe,
        });
      } else {
        // Handle not found case
        res.status(404).json({
          success: false,
          message: NOT_FOUND,
          data: recipe,
        });
      }
    } catch (error) {
      // Handle error
      if (error.status)
        res.status(error.status).send({
          success: false,
          message: error.message,
          data: null,
        });
      else
        res.status(500).send({
          success: false,
          error: INTERNAL_SERVER_ERROR,
          data: null,
        });
    }
  },
);

export default recipesRouter;
