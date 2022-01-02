import { query } from "faunadb";
import { faunadb } from "../../../services/faunadb";
import { stripe } from "../../../services/stripe";

export async function saveSubscription(subscriptionId: string, customerId: string) {
  const userRef = await faunadb.query(
    query.Select(
      "ref",
      query.Get(
        query.Match(
          query.Index('user_by_stripe_customerId'),
          customerId
        )
      )
    )
  )

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,

  }

  await faunadb.query(
    query.Create(
      query.Collection('subscriptions'),
      { data: subscriptionData }
    )
  )
}