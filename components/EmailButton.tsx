'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { createClient } from '@/utils/supabase/client';

export function Subscribe() {
	const [email, setEmail] = useState('');

	const supabase = createClient();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const { data, error } = await supabase.from('waitlist').insert([{ email: email }]);

		if (error) {
			if (error.code === '23505') {
				toast.success('You are already subscribed!');
				return;
			}
			console.error(error);
			toast.error('Error inserting email:', {
				description: error.message,
			});
			return;
		}
		toast.success('Thank you for subscribing!');
		setEmail('');
	};

	return (
		<form onSubmit={handleSubmit} className="fr w-full max-w-md space-x-4 mx-auto">
			<Input
				type="email"
				placeholder="Your email address"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
				className="bg-gray-50"
			/>
			<Button type="submit">Subscribe</Button>
		</form>
	);
}
