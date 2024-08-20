import { DashboardOverview } from './sections/DashboardOverview';
import { CreateFlashCard } from './sections/CreateFlashCard';
import { ManageFlashCards } from './sections/ManageFlashCards';
import { ReviewFlashCards } from './sections/ReviewFlashCards';
import { Subscription } from './sections/Subscription';
import { Profile } from './sections/Profile';

interface MainSectionProps {
    selectedSection: string;
}

export function MainSection({ selectedSection }: MainSectionProps) {
    const renderSection = () => {
        switch (selectedSection) {
            case 'dashboard':
                return <DashboardOverview/>;
            case 'create':
                return <CreateFlashCard/>;
            case 'manage':
                return <ManageFlashCards/>;
            case 'review':
                return <ReviewFlashCards/>;
            case 'subscription':
                return <Subscription/>;
            case 'profile':
                return <Profile/>;
            default:
                return <DashboardOverview/>;
        }
    };

    return <div className="flex-1 p-8 bg-gray-100 ml-64">{renderSection()}</div>;
}
