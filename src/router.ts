import { Router } from "express";
import categories from "./controllers/categories";
import products from "./controllers/products";

const router = Router();

/* Categorias*/
router.get("/categorias", categories.findAll)        //  - Lista todas as Categorias
router.get("/categorias/:id", categories.findOne)   // 	- Busca uma Categoria por id
router.post("/categorias", categories.create)      // 	- Cria uma Categoria
router.patch("/categorias/:id", categories.edit) //	- Edita uma Categoria
router.delete("/categorias/:id",categories.delete)//  - Deleta uma Categoria (deve atualizar o produto setando idCategoria como NULL para produtos que utilizam essa categoria)

/* - Produtos */
router.get("/produtos", products.findAll)//- Lista todos os Produtos
router.get("/produtos/:id", products.findOne)//		- Busca um Produto por id
router.post("/produtos", products.create)//- Cria um Produto
router.patch("/produtos/:id", products.edit)//- Edita um Produto
router.delete("/produtos/:id", products.delete)//- Deleta um Produto (e seu estoque)

/* Estoque */
router.get("/produtos/:id/estoque") // - Lista o estoque para o Produto pelo id
router.get("/produtos/:id/estoque") // - Edita o Estoque para o Produto pelo id
router.get("/produtos/:id/estoque") // - Deve retornar o status [501] - Not Implemented. (não se pode deletar um estoque)

export default router;