import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/utils/stripe';
import { supabaseAdmin } from '@/utils/supabaseServer';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
    try {
      const rawBody = await request.text();
      const signature = request.headers.get('stripe-signature');
  
      let event;
      try {
        // Construct the Stripe event using the raw body and signature
        event = stripe.webhooks.constructEvent(rawBody, signature!, process.env.STRIPE_WEBHOOK_SECRET!);
        console.log('Constructed Event:', event);
      } catch (error: any) {
        console.error(`Webhook signature verification failed: ${error.message}`);
        return NextResponse.json({ message: 'Webhook Error' }, { status: 400 });
      }
  
      // Handle the checkout.session.completed event
      if (event.type === 'checkout.session.completed') {
        console.log('Received checkout.session.completed Event:', event);
        const session: Stripe.Checkout.Session = event.data.object;
        console.log('Checkout Session Data:', session); 

        const userId = session.metadata?.user_id;
        console.log('User ID from Metadata:', userId);

        // Create or update the stripe_customer_id in the stripe_customers table
        const { error } = await supabaseAdmin
        .from('stripe_customers')
        .upsert({ 
            user_id: userId, 
            stripe_customer_id: session.customer, 
            subscription_id: session.subscription, 
            plan_active: true, 
            plan_expires: null 
        });
        if (error) {
          console.error('Error Updating Supabase:', error.message);
        } else {
          console.log('Supabase Updated Successfully for User ID:', userId);
        }
      }

      // Handle the customer.subscription.updated event
      if (event.type === 'customer.subscription.updated') {
        console.log('Received customer.subscription.updated Event:', event);
        const subscription: Stripe.Subscription = event.data.object;
        console.log(subscription);
        // Update the plan_expires field in the stripe_customers table
        const { error } = await supabaseAdmin
            .from('stripe_customers')
            .update({ plan_expires: subscription.cancel_at })
            .eq('subscription_id', subscription.id);
      }

      // Handle the customer.subscription.deleted event
      if (event.type === 'customer.subscription.deleted') {
        console.log('Received customer.subscription.deleted Event:', event);
        const subscription = event.data.object;
        console.log(subscription);

        const { error } = await supabaseAdmin
        .from('stripe_customers')
        .update({ plan_active: false, subscription_id: null })
        .eq('subscription_id', subscription.id);
      }
  
      return NextResponse.json({ message: 'success' });
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }