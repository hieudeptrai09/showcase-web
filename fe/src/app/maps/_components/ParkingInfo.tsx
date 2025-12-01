import ParkingInfoCard from "./ParkingInfoCard";

export default function ParkingInfo() {
  return (
    <div className="mt-8 grid md:grid-cols-2 gap-6">
      <ParkingInfoCard
        icon="🚗"
        title="Đỗ xe ô tô"
        description="Vòng ngược lại đỗ ở sân vỉa hè trước cửa nhà và đỗ trên lề đường, tránh không đỗ trước cửa nhà sẽ dễ bị phạt."
      />
      <ParkingInfoCard
        icon="🏍️"
        title="Đỗ xe máy"
        description="Có sân đỗ ở ngay trước cửa nhà cho quý khách thoải mái sử dụng."
      />
    </div>
  );
}
