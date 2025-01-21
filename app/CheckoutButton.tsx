'use client';

import { loadStripe } from '@stripe/stripe-js';
import { supabase } from '@/utils/supabaseClient';
import toast from 'react-hot-toast';


export default function CheckoutButton() {
  const handleCheckout = async() => {
    const { data } = await supabase.auth.getUser();

    if (!data?.user) {
      toast.error("Please log in to create a new Stripe Checkout session");
      return;
    }

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    const stripe = await stripePromise;
    const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId: 'price_1QcbloF8F8inPrgj2wj9H3cJ', userId: data.user?.id, email: data.user?.email }),
      });
    const session = await response.json();
    await stripe?.redirectToCheckout({ sessionId: session.id });
  }

  return (
    <div>
      <h1>Signup for a Plan</h1>
      <h2>Description</h2>
      <p> This is a Stock Photography Subscription SaaS Product built from scratch, 
        allowing users to subscribe and access a library of images. These images feature 
        some of my favorite scenes from my study abroad, including countries like Greece, 
        Italy, the Netherlands, Hungary, Austria, and more! Every monetized action is tracked through 
        Stripe, and users are billed based on their usage at the end of each month.</p>
        <img 
        src="/images/TheChalanters.jpg" 
        alt="Example Scene of The Chalanters" 
        style={{ width: "80%", height: "auto", marginBottom: "1rem" }} 
/>
      <h3>Clicking this button creates a new Stripe Checkout session</h3>
      <button className="btn btn-accent" onClick={handleCheckout}>Buy Now</button>
    </div>
  );
}