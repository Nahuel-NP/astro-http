
import type { APIRoute } from "astro";
import { Clients, db } from "astro:db";
export const prerender = false;
export const GET: APIRoute = async (request) => {

  const users = await db.select().from(Clients);

  return new Response(JSON.stringify(
    users
  ), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
export const POST: APIRoute = async ({ request }) => {

  try {

    const { id, ...body } = await request.json();

    const { lastInsertRowid } = await db.insert(Clients).values(body);

    return new Response(JSON.stringify({
      ...body,
      id: +lastInsertRowid?.toString()!
    }), {
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