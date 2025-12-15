import { shopInfo } from "@/lib/shopInfo";
import PageHeader from "./_components/PageHeader";
import MapEmbed from "./_components/MapEmbed";
import ContactInfoCard from "./_components/ContactInfoCard";
import ParkingInfo from "./_components/ParkingInfo";

export default function MapsPage() {
  return (
    <div className="container-custom py-4">
      <PageHeader />

      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        <MapEmbed googleMapsUrl={shopInfo.googleMapsUrl} />
        <ContactInfoCard shopInfo={shopInfo} />
      </div>

      <ParkingInfo />
    </div>
  );
}
