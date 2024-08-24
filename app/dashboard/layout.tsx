import { Sidebar } from "@/components/dashboard/Sidebar";
import { ReactNode } from "react";
import { Toaster } from "sonner";

export default function DashLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div>
      <Sidebar />
      <Toaster richColors />
      <div className="ml-72 pt-12 w-full min-h-screen max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}
