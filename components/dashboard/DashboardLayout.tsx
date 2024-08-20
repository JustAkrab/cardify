import { Sidebar } from './Sidebar';
import { MainSection } from './MainSection';
import { useState } from 'react';

export function DashboardLayout() {
    const [selectedSection, setSelectedSection] = useState('dashboard');

    return (
        <div className="flex min-h-screen">
            <Sidebar onSelect={setSelectedSection} />
            <MainSection selectedSection={selectedSection} />
        </div>
    );
}
