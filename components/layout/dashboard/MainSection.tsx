'use client';

import {ReactNode} from "react";

export function MainSection({ children }: { children: ReactNode }) {
    return (
        <main className="py-10 lg:pl-72">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
    );
}
