import { Sidebar } from '@/components/Sidebar';
import {MainSection} from "@/components/layout/dashboard/MainSection";

export default function Dashboard() {
    return (
        <div>
            <Sidebar />
            <MainSection>
                {/* Your content goes here */}
                <h1>Dashboard Content</h1>
            </MainSection>
        </div>
    );
}