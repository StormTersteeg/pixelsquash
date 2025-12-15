import ExportCard from "~/components/cards/exportCard";
import ImageSelectionCard from "~/components/cards/imageSelectionCard";
import OptionsCard from "~/components/cards/optionsCard";

export default function Home() {
  return (
    <div className="container mx-auto px-0 md:px-8">
      <ImageSelectionCard className="animate-in fade-in slide-in-from-bottom-4 duration-700 mt-8" />
      <OptionsCard className="animate-in fade-in slide-in-from-bottom-4 duration-700 mt-8" />
      <ExportCard className="animate-in fade-in slide-in-from-bottom-4 duration-700 mt-8 mb-8" />
    </div>
  );
}
