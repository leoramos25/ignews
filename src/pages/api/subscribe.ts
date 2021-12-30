/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../services/stripe";
import { getSession } from "next-auth/react";
import { query } from "faunadb";
import { faunadb } from "../../services/faunadb";

type User = {
  ref: {
    id: string
  }
  data: {
    stripe_customer_id: string
  }
}

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'POST') {
    const session = await getSession({ req: request });

    const user = await faunadb.query<User>(
      query.Get(
        query.Match(
          query.Index('user_by_email'),
          query.Casefold(session?.user?.email as string)
        )
      )
    )

    let customerId = user.data.stripe_customer_id;

    if (!customerId) {
      const stripeCustomer = await stripe.customers.create({ email: session?.user?.email as string });

      await faunadb.query(
        query.Update(
          query.Ref(query.Collection("users"), user.ref.id),
          {
            data: {
              stripe_customer_id: stripeCustomer.id
            }
          }
        )
      )

      customerId = stripeCustomer.id;
    }

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        { price: 'price_1KAybpFBtW0Q2nyVPXHihncK', quantity: 1 }
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCESS_URL as string,
      cancel_url: process.env.STRIPE_CANCEL_URL as string
    })

    return response.status(200).json({ sessionId: stripeCheckoutSession.id })
  } else {
    response.setHeader('allow', 'POST');
    response.status(405).end('Method not allowed')
  }
}