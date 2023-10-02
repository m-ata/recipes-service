import express, { Request, Response } from "express";
import { db } from "./../db";

const recipesRouter = express.Router();

recipesRouter.get("/getAllRecipes", async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    db.find({}, (err: any, documents: any) => {
      if (err) {
        res.status(500).send('Error fetching documents');
      } else {
        res.status(200).json(documents);
      }
    });
  } catch (error) {
    if (error.status) res.status(error.status).send(error.message);
    else res.status(500).send(`internal error`);
  }
});

export default recipesRouter;

