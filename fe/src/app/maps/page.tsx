import { shopInfo } from "@/lib/shopInfo";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";

export default function MapsPage() {
  return (
    <div className="container-custom py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Chỉ đường đến cửa hàng
        </h1>
        <p className="text-xl text-gray-600">
          Hãy ghé thăm chúng tôi để trải nghiệm sản phẩm trực tiếp!
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Map */}
        <div className="lg:col-span-2">
          <div
            className="bg-gray-200 rounded-lg overflow-hidden shadow-lg"
            style={{ height: "500px" }}
          >
            <iframe
              src={shopInfo.googleMapsUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Info Card */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Thông tin liên hệ
            </h2>

            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin
                  className="text-primary mr-3 flex-shrink-0 mt-1"
                  size={24}
                />
                <div>
                  <p className="font-semibold text-gray-800 mb-1">Địa chỉ</p>
                  <p className="text-gray-600">{shopInfo.address}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone
                  className="text-primary mr-3 flex-shrink-0 mt-1"
                  size={24}
                />
                <div>
                  <p className="font-semibold text-gray-800 mb-1">Điện thoại</p>
                  <a
                    href={`tel:${shopInfo.phone}`}
                    className="text-gray-600 hover:text-primary"
                  >
                    {shopInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <Clock
                  className="text-primary mr-3 flex-shrink-0 mt-1"
                  size={24}
                />
                <div>
                  <p className="font-semibold text-gray-800 mb-1">Giờ mở cửa</p>
                  <p className="text-gray-600">
                    Thứ 2 - Chủ nhật: 8:00 - 21:00
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <a
                href={`https://www.google.com/maps/dir//${encodeURIComponent(
                  shopInfo.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full text-center flex items-center justify-center"
              >
                <Navigation size={20} className="mr-2" />
                Chỉ đường trên Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Directions */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Hướng dẫn đường đi
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Từ trung tâm Hà Nội
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Đi dọc theo đường Láng hướng về Đại học Quốc Gia</li>
              <li>Cửa hàng nằm bên tay phải, gần ngã tư Láng Hạ</li>
              <li>Có bãi đỗ xe rộng rãi phía trước cửa hàng</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Đi bằng xe bus
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Tuyến xe bus số 03, 18, 23, 28 đều đi qua khu vực</li>
              <li>Xuống tại trạm "Đường Láng" và đi bộ khoảng 5 phút</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Lưu ý</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Cửa hàng có biển hiệu lớn màu xanh dương, dễ nhận biết</li>
              <li>Nằm trong khu vực có nhiều cửa hàng điện tử, công nghệ</li>
              <li>Gần Starbucks Coffee và Circle K</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Parking Info */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            🚗 Đỗ xe ô tô
          </h3>
          <p className="text-gray-700">
            Bãi đỗ xe miễn phí phía trước cửa hàng, sức chứa 10-15 xe. Nếu bãi
            đầy, có thể đỗ ở bãi công cộng cách đó 50m.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            🏍️ Đỗ xe máy
          </h3>
          <p className="text-gray-700">
            Khu vực đỗ xe máy rộng rãi, có nhân viên trông giữ. Phí đỗ xe:
            5.000đ/lượt.
          </p>
        </div>
      </div>
    </div>
  );
}
