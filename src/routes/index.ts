import { Router} from "express";
import recipesRouter from "./recipes.route";

const router = Router();

router.use('/recipes', recipesRouter);

export default router;
