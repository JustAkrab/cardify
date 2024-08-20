import DashboardOverview from "@/components/layout/dashboard/DashboardOverview";
import {ManageFlashCards} from "@/components/layout/dashboard/ManageFlashCards";
import {ReviewFlashCards} from "@/components/layout/dashboard/ReviewFlashCards";
import {Subscription} from "@/components/layout/dashboard/Subscription";
import {Profile} from "@/components/layout/dashboard/Profile";
import {CreateFlashCard} from "@/components/layout/dashboard/CreateFlashCard";

interface MainSectionProps {
    selectedSection: string;
}

export function MainSection({ selectedSection }: MainSectionProps) {
    let ComponentToRender;

    switch (selectedSection) {
        case 'dashboard':
            ComponentToRender = DashboardOverview;
            break;
        case 'create':
            ComponentToRender = CreateFlashCard;
            break;
        case 'manage':
            ComponentToRender = ManageFlashCards;
            break;
        case 'review':
            ComponentToRender = ReviewFlashCards;
            break;
        case 'subscription':
            ComponentToRender = Subscription;
            break;
        case 'profile':
            ComponentToRender = Profile;
            break;
        default:
            ComponentToRender = () => <div>Select an option from the sidebar</div>;
    }

    return (
        <main className="p-4">
            <ComponentToRender />
        </main>
    );
}
