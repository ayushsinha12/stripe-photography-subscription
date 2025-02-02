import { NextResponse } from 'next/server';
import { stripe } from '@/utils/stripe';

/**
 * Handles POST requests to create a Stripe Checkout session.
 * Configures session details for a subscription and one-time setup fee.
 */
export async function POST(request: Request) {
    try {
        const { priceId, email, userId } = await request.json(); // Extract request data

        const session = await stripe.checkout.sessions.create({
            metadata: {
                user_id: userId,
            },
            customer_email: email,
            payment_method_types: ['card'],
            line_items: [
                {
                    // base subscription
                    price: priceId,
                },
                {
                    // one-time setup fee
                    price: 'price_1QceLvF8F8inPrgjQCoRfl7Y',
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${request.headers.get('origin')}/success`,
            cancel_url: `${request.headers.get('origin')}/cancel`,
        });

        return NextResponse.json({ id: session.id });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}