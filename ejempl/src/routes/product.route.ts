import { Router } from "express"
import { createProduct, getProduct, getProductById } from "../controllers/product.controller";

const productRouter = Router();

productRouter.get('/', getProduct)
productRouter.post('/', createProduct)
productRouter.get('/:id', getProductById)

export default productRouter;