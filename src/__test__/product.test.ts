import request from "supertest";
import db from "../database/db";
import app from "../server";

describe("products", () => {
  const product = {
    codigo: "pdt_leite",
    nome: "leite",
    descricao: "leite de caixinha",
    valor: 1000,
    idCategoria: 1,
  };

  const category = {
    codigo: "codigo",
    titulo: "titulo",
  };

  beforeAll(async () => {
    await db.sync({force: true});
  });

  afterAll(async () => {
    await db.sync({force: true});
  });

  it("should be able create a new product", async () => {
    const categoryResponse = await request(app)
      .post("/categorias")
      .send(category);
    const response = await request(app).post("/produtos").send(product);

    expect(categoryResponse.status).toBe(201);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("should be able edit a product", async () => {
    const editedProduct = {
      codigo: "pdt_carne",
      nome: "carne",
      descricao: "carne de caixinha",
      valor: 1000,
    };

    const response = await request(app)
      .patch("/produtos/1")
      .send(editedProduct);

    expect(response.status).toBe(200);
  });

  it("must not be able edit a product", async () => {
    const response = await await request(app).patch("/produtos/5");

    expect(response.status).toBe(404);
  });

  it("should be able delete a product", async () => {
    const response = await request(app).delete("/produtos/1");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });

  it("must not be able delete a product", async () => {
    const response = await request(app).delete("/produtos/5");

    expect(response.status).toBe(404);
  });
});
