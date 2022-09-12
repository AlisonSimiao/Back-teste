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
  
  beforeEach((): void => {
    jest.setTimeout(10000);
  });

  afterAll(async ()=>{
    await db.truncate()
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
  },60000)

  it( 'should be able edit a category', async()=>{
    const editedCategory = {
      titulo : "asd",
      codigo : "asd2",
    }

    const response = await request( app ).patch("/categorias/1").send(
      editedCategory
    )

    expect(response.status).toBe(200);
  })

  it( 'should be able delete a category', async()=>{
    const response = await request( app ).delete("/categorias/1")

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
  })

})