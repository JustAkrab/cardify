import {
  VideoCameraIcon,
  Bars3CenterLeftIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const Create = () => {
  const createOptions = [
    {
      icon: <VideoCameraIcon className="size-12" />,
      title: "Create from Youtube video",
      description: "Create new flashcards from a Youtube video",
      link: "/dashboard/create/youtube",
    },
    {
      icon: <Bars3CenterLeftIcon className="size-12" />,
      title: "Create from text",
      description: "Create new flashcards from a text input",
      link: "/dashboard/create/text",
    },
    {
      icon: <DocumentIcon className="size-12" />,
      title: "Create from PDF",
      description: "Create new flashcards from a PDF file",
      link: "/dashboard/create/pdf",
    },
  ];

  return (
    <div className="w-full fc items-start">
      <h2 className="text-3xl font-bold">Create</h2>
      <div className="fr gap-4 w-full mt-12">
        {createOptions.map((option, index) => (
          <Link
            href={option.link}
            key={index}
            className="w-full bg-white rounded-lg p-5 aspect-video fc border-2 border-neutral-200 transition-colors hover:bg-neutral-200 hover:border-indigo-600"
          >
            <div className="fr gap-4">
              {option.icon}
              <div>
                <h3 className="text-lg font-bold">{option.title}</h3>
                <p className="text-sm">{option.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="w-full fr text-indigo-600 underline mt-8 underline-offset-2 text-xl">
        <Link href="/dashboard/create/manual">Create Manually</Link>
      </div>
    </div>
  );
};
export default Create;
