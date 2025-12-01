import { Navigation } from "lucide-react";

interface DirectionsButtonProps {
  addressUrl: string;
}

export default function DirectionsButton({
  addressUrl,
}: DirectionsButtonProps) {
  return (
    <a
      href={`https://www.google.com/maps/dir//${encodeURIComponent(
        addressUrl
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-primary w-full text-center flex items-center justify-center"
    >
      <Navigation size={20} className="mr-2" />
      Chỉ đường trên Google Maps
    </a>
  );
}
