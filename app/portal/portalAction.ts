'use server';

import { stripe } from "@/utils/stripe";

/**
 * Creates a billing portal session for a given customer.
 * @param customerId - The ID of the Stripe customer for whom the portal session is created.
 * @returns An object containing the session ID and URL of the Stripe billing portal.
 */
export async function createPortalSession(customerId: string) {
    console.log('createPortalSession called with:', customerId);

    // Create a billing portal session
    const portalSession = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `https://stripe-photography-subscription.vercel.app`
        //return_url: `http://localhost:3000`,
      });
  
      return { id: portalSession.id, url: portalSession.url };
}