
import type { APIRoute } from "astro";


export const prerender = false;

export const PATCH: APIRoute = async (request) => {

  const { params } = request;
  const { clientId } = params;
  return new Response(JSON.stringify({
    method: 'PATCH',
    clientId
  }), { status: 200,headers:{
    'Content-Type':'application/json'
  } })
}

export const DELETE: APIRoute = async (request) => {

  const { params } = request;
  const { clientId } = params;
  return new Response(JSON.stringify({
    method: 'DELETE',
    clientId
  }), { status: 200,headers:{
    'Content-Type':'application/json'
  } })
}