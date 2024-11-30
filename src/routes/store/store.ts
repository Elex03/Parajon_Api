import { Router } from "express";
import {
  createProduct,
  deleteProductById,
  getProducts,
  updateProductById,
} from "../../controllers/store/product.controller";

import path from "path";


const appStore = Router();

appStore.post("/", createProduct);
appStore.get("/", getProducts);

appStore.put("/:id", updateProductById);
appStore.delete("/:id", deleteProductById);

appStore.get("/uploads/:fileName", function (req, res) {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "../../../uploads", fileName);

  res.sendFile(filePath, function (err) {
    if (err) {
      console.error("Error al enviar el archivo:", err);
      res.status(500).send("Archivo no encontrado o error interno.");
    } else {
      console.log(`Archivo enviado: ${fileName}`);
    }
  });
});

export default appStore;
