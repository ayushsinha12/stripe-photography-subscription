import { stripe } from "@/utils/stripe";

/**
 * Fetches a Stripe session by session ID.
 * @param sessionId - The ID of the Stripe session to retrieve.
 * @returns The session details retrieved from Stripe.
 */
async function getSession(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId!);
  return session;
}

/**
 * A React component to display the payment result after a user returns from the Stripe checkout.
 * @param searchParams - The query parameters from the URL, including the Stripe session ID.
 * @returns A JSX element indicating the payment status.
 */
export default async function CheckoutReturn({
    searchParams,
  }: {
    searchParams: any;
  }) {
  const sessionId = searchParams.session_id;
  const session = await getSession(sessionId);

  console.log(session);

  // Handle case where payment status is "open"
  if (session?.status === "open") {
    return <p>Payment did not work.</p>;
  }

  // Handle case where payment status is "complete"
  if (session?.status === "complete") {
    return (
      <h3>
        We appreciate your business! Your Stripe customer ID is:
        {(session.customer as string)}.
      </h3>
    );
  }

  // Handle case where session status is not handled explicitly
  return null;
}