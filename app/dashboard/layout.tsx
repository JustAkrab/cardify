import { Sidebar } from '@/components/Sidebar';
import { createClient } from '@/utils/supabase/server';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';

export default async function DashLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	const supabase = createClient();
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();
	return (
		<div>
			<Sidebar user={user} />
			<Toaster richColors />
			<div className="lg:pl-72 py-12 w-full max-w-7xl mx-auto">{children}</div>
		</div>
	);
}
