'use server';

import { stripe } from "@/utils/stripe";


export async function createPortalSession(customerId: string) {
    console.log('createPortalSession called with:', customerId);
    const portalSession = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `https://stripe-photography-subscription.vercel.app/`
        //return_url: `http://localhost:3000`,
      });
  
      return { id: portalSession.id, url: portalSession.url };
}