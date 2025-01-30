import { NextResponse } from "next/server"
import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable")
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia",
})

export async function POST(req: Request) {
  try {
    const { amount, applicationId } = await req.json()

    if (!amount || !applicationId) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "bwp",
            product_data: {
              name: "ASI Membership Fee",
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/cancel`,
      metadata: {
        applicationId: applicationId,
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (err) {
    console.error("Stripe session creation error:", err)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}

