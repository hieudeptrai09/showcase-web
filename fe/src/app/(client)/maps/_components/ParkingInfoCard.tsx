interface ParkingInfoCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function ParkingInfoCard({
  icon,
  title,
  description,
}: ParkingInfoCardProps) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        {icon} {title}
      </h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}
