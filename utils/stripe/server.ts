'use server';

import { stripe } from './config';
import { createClient } from '@/utils/supabase/server';
import {getErrorRedirect} from "@/utils/errorUtils";
import {getURL} from "@/utils/urlUtils";

type CheckoutResponse = {
	errorRedirect?: string;
	sessionId?: string;
};

export async function createOrRetrieveCustomer({ uuid, email }: { uuid: string; email: string }): Promise<string> {
	try {
		// Search for an existing customer with the uuid in the metadata
		const customers = await stripe.customers.list({
			email: email,
		});

		if (customers.data.length > 0) {
			// Customer already exists, return the customer ID
			return customers.data[0].id;
		} else {
			// No customer found, create a new customer
			const customer = await stripe.customers.create({
				email: email,
				metadata: { uuid: uuid },
			});

			// Return the new customer ID
			return customer.id;
		}
	} catch (error) {
		console.error('Error creating or retrieving customer:', error);
		throw new Error('Unable to create or retrieve customer.');
	}
}


export async function checkoutWithStripe(price: { id: string }, redirectPath: string): Promise<CheckoutResponse> {
	try {
		// Get the user from Supabase auth
		const supabase = createClient();
		const { data: { user }, error } = await supabase.auth.getUser();

		if (error || !user) {
			console.error(error);
			throw new Error('Could not get user session.');
		}

		// Retrieve or create the customer in Stripe
		let customer: string;
		try {
			customer = await createOrRetrieveCustomer({
				uuid: user?.id || '',
				email: user?.email || '',
			});
		} catch (err) {
			console.error(err);
			throw new Error('Unable to access customer record.');
		}

		// Create a checkout session in Stripe
		const session = await stripe.checkout.sessions.create({
			allow_promotion_codes: true,
			billing_address_collection: 'required',
			customer,
			customer_update: { address: 'auto' },
			line_items: [{ price: price.id, quantity: 1 }],
			mode: 'subscription',
			success_url: `${process.env.NEXT_PUBLIC_URL}${redirectPath}?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.NEXT_PUBLIC_URL}${redirectPath}`,
		});

		if (!session) throw new Error('Unable to create checkout session.');

		return { sessionId: session.id };
	} catch (error) {
		if (error instanceof Error) {
			return {
				errorRedirect: getErrorRedirect(redirectPath, error.message, 'Please try again later or contact a system administrator.'),
			};
		} else {
			return {
				errorRedirect: getErrorRedirect(redirectPath, 'An unknown error occurred.', 'Please try again later or contact a system administrator.'),
			};
		}
	}
}

export async function createStripePortal(currentPath: string) {
	try {
		const supabase = createClient();
		const {
			error,
			data: { user },
		} = await supabase.auth.getUser();

		if (!user) {
			if (error) {
				console.error(error);
			}
			throw new Error('Could not get user session.');
		}

		let customer;
		try {
			customer = await createOrRetrieveCustomer({
				uuid: user.id || '',
				email: user.email || '',
			});
		} catch (err) {
			console.error(err);
			throw new Error('Unable to access customer record.');
		}

		if (!customer) {
			throw new Error('Could not get customer.');
		}

		try {
			const { url } = await stripe.billingPortal.sessions.create({
				customer,
				return_url: getURL('/account'),
			});
			if (!url) {
				throw new Error('Could not create billing portal');
			}
			return url;
		} catch (err) {
			console.error(err);
			throw new Error('Could not create billing portal');
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error(error);
			return getErrorRedirect(currentPath, error.message, 'Please try again later or contact a system administrator.');
		} else {
			return getErrorRedirect(currentPath, 'An unknown error occurred.', 'Please try again later or contact a system administrator.');
		}
	}
}
