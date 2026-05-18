import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { item } = body

    const payload = {
      data: {
        attributes: {
          billing: {
            name: "Legion Buyer"
          },
          send_email_receipt: true,
          show_description: true,
          show_line_items: true,
          line_items: [
            {
              name: item.name,
              description: item.description,
              amount: item.amount, // e.g., 10000 for ₱100.00
              currency: item.currency,
              quantity: 1
            }
          ],
          payment_method_types: ["gcash", "card", "grab_pay"],
          success_url: "https://rdsr3solution.online/payment-success",
          cancel_url: "https://rdsr3solution.online/payment-cancelled"
        }
      }
    }

    const response = await fetch('https://api.paymongo.com/v1/checkout_sessions', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${process.env.PAYMONGO_SECRET_KEY}:`).toString('base64')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    const result = await response.json()

    if (!response.ok) {
      return NextResponse.json({ error: result.errors?.[0]?.detail || 'PayMongo error' }, { status: 400 })
    }

    const checkoutUrl = result.data.attributes.checkout_url
    return NextResponse.json({ checkoutUrl })
  } catch (err) {
    console.error('PayMongo checkout error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
