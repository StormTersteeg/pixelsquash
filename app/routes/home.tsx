import ExportCard from "~/components/cards/exportCard";
import ImageSelectionCard from "~/components/cards/imageSelectionCard";
import OptionsCard from "~/components/cards/optionsCard";

export default function Home() {
  return (
    <div className="container mx-auto px-0 md:px-8">
      <ImageSelectionCard className="mt-8" />
      <OptionsCard className="mt-8" />
      <ExportCard className="mt-8 mb-8" />
    </div>
  );
}
