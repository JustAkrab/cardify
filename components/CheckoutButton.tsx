'use client';
import { useShoppingCart } from 'use-shopping-cart';
import { loadStripe } from '@stripe/stripe-js';

export default function CheckoutButton() {
	const redirectToCheckout = async () => {
		try {
			const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

			if (!stripe) throw new Error('Stripe failed to initialize.');

			const checkoutResponse = await fetch('/api/checkout_sessions', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				// dummy for now
				body: JSON.stringify({
					cartDetails: {
						item1: {
							name: 'item1',
							price: 1000,
							currency: 'usd',
							quantity: 1,
						},
						item2: {
							name: 'item2',
							price: 2000,
							currency: 'usd',
							quantity: 1,
						},
					},
				}),
			});

			const { sessionId } = await checkoutResponse.json();
			const stripeError = await stripe.redirectToCheckout({ sessionId });

			if (stripeError) {
				console.error(stripeError);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<button
			onClick={() => redirectToCheckout()}
			className="rounded-md border border-transparent bg-sky-900 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-sky-700 mr-2 disabled:bg-gray-600"
		>
			Checkout
		</button>
	);
}
