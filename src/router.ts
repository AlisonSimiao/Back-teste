import { Router } from "express";

const router = Router();

/* Categorias*/
router.get("categorias")        //  - Lista todas as Categorias
router.get("/categorias/:id")   // 	- Busca uma Categoria por id
router.post("/categorias")      // 	- Cria uma Categoria
router.patch("/categorias/:id") //	- Edita uma Categoria
router.delete("/categorias/:id")//  - Deleta uma Categoria (deve atualizar o produto setando idCategoria como NULL para produtos que utilizam essa categoria)

/* - Produtos */
router.get("/produtos")//- Lista todos os Produtos
router.get("/produtos/:id")//		- Busca um Produto por id
router.post("/produtos")//- Cria um Produto
router.patch("/produtos/:id")//- Edita um Produto
router.delete("/produtos/:id")//- Deleta um Produto (e seu estoque)

/* Estoque */
router.get("/produtos/:id/estoque") // - Lista o estoque para o Produto pelo id
router.get("/produtos/:id/estoque") // - Edita o Estoque para o Produto pelo id
router.get("/produtos/:id/estoque") // - Deve retornar o status [501] - Not Implemented. (não se pode deletar um estoque)

export default router;