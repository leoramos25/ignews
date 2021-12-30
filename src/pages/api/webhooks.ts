/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";


export default (request: NextApiRequest, response: NextApiResponse) => {
  console.log('envento recibido');

  response.status(200).json({ ok: true });
}