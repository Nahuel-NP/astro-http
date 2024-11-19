
import type { APIRoute } from "astro";
import { Clients, db, eq } from "astro:db";


export const prerender = false;

export const PATCH: APIRoute = async ({ request, params }) => {

  const { clientId } = params ?? '';
  try {


    const { id, ...body } = await request.json();

    const results = await db.update(Clients).set(body).where(eq(Clients.id, Number(clientId)));

    const updatedClient = await db.select().from(Clients).where(eq(Clients.id, Number(clientId)));

    return new Response(JSON.stringify(
      updatedClient.at(0)), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({
      msg: 'No Body Found'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

export const DELETE: APIRoute = async ({ params }) => {


  const { clientId } = params;

  const {rowsAffected} = await db.delete(Clients).where(eq(Clients.id, Number(clientId)));

  if (rowsAffected>0) {
    
    return new Response(JSON.stringify({
      msg: 'Deleted'
    }), {
      status: 200, headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  return new Response(JSON.stringify({
    msg: `CLient with id ${clientId} not found`
  }), {
    status: 200, headers: {
      'Content-Type': 'application/json'
    }
  })
}