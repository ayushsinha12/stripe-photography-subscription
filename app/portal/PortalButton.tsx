'use client';

import { createPortalSession } from './portalAction';
import { supabase } from '@/utils/supabaseClient';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

/**
 * Component for rendering the "Manage Billing" button and handling portal session creation.
 */
export default function PortalButton() {
  const router = useRouter();

  /**
   * Handles the click event to create a billing portal session and redirect the user.
   */
  const handleClick = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw 'Please log in to manage your billing.';
      }

      // Fetch the customer's Stripe information from the Supabase database
      const { data: customer, error: fetchError } = await supabase
      .from('stripe_customers')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .single();
    
      // Create a Stripe billing portal session
      const { url } = await createPortalSession(customer?.stripe_customer_id);

      window.location.href = url;

      //router.push('/billing-return');

    } catch (error) {
      console.error(error);
      toast.error('Failed to create billing portal session:');
    }
  }

  return (
    <>
      <button className="btn btn-primary btn-outline my-3" onClick={handleClick}>
        Manage Billing
      </button>
    </>
  );
}