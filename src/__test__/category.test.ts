import request from 'supertest'
import db from '../database/db'
import app from '../server'

describe( "categories",()=>{
  const category = {
    codigo: "cat_casa",
    titulo: "casa",  
  }

  beforeAll(
    async ()=>{
      await db.sync({force: true});
    }
  )

  afterAll(async ()=>{
    await db.sync({force: true})
  })

  it( 'must not be able create a new category no titulo', async()=>{
    const response = await request( app ).post("/categorias").send({
        codigo: category.codigo,     
    })

    expect(response.status).toBe(400);
  })

  it( 'must not be able create a new category no codigo', async()=>{
    const response = await request( app ).post("/categorias").send({
        titulo: category.titulo,     
    })

    expect(response.status).toBe(400);
  })

  it( 'must not be able create a new category no data in body', async()=>{
    const response = await request( app ).post("/categorias").send()

    expect(response.status).toBe(400);
  })

  it( 'should be able create a new category', async()=>{
    const response = await request( app ).post("/categorias").send( category )

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  })


} )