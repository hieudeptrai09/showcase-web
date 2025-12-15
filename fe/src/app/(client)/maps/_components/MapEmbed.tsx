interface MapEmbedProps {
  googleMapsUrl: string;
}

export default function MapEmbed({ googleMapsUrl }: MapEmbedProps) {
  return (
    <div className="lg:col-span-2">
      <div
        className="bg-gray-200 rounded-lg overflow-hidden shadow-lg"
        style={{ height: "500px" }}
      >
        <iframe
          src={googleMapsUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
