import { shopInfo } from "@/lib/shopInfo";
import { Award, Users, Target, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container-custom py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Về chúng tôi</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {shopInfo.tagline}
        </p>
      </div>

      {/* Story Section */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=800"
              alt="About us"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Câu chuyện của chúng tôi
            </h2>
            <p className="text-gray-600 mb-4">
              Được thành lập vào năm {shopInfo.founded}, {shopInfo.name} bắt đầu
              từ một cửa hàng nhỏ với niềm đam mê gaming và mong muốn mang đến
              cho cộng đồng game thủ Việt Nam những sản phẩm chất lượng cao với
              giá cả hợp lý.
            </p>
            <p className="text-gray-600 mb-4">
              Trải qua hơn{" "}
              {new Date().getFullYear() - parseInt(shopInfo.founded)} năm hoạt
              động, chúng tôi đã phục vụ hàng nghìn khách hàng và xây dựng được
              uy tín vững chắc trong cộng đồng gaming Việt Nam.
            </p>
            <p className="text-gray-600">
              Chúng tôi tự hào là đối tác ủy quyền chính thức của nhiều thương
              hiệu gaming hàng đầu thế giới, cam kết mang đến sản phẩm chính
              hãng 100% với dịch vụ bảo hành tốt nhất.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          Giá trị cốt lõi
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="text-primary" size={40} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Chất lượng</h3>
            <p className="text-gray-600">
              Cam kết 100% sản phẩm chính hãng với chất lượng được kiểm định kỹ
              lưỡng
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-primary" size={40} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Khách hàng</h3>
            <p className="text-gray-600">
              Đặt lợi ích và sự hài lòng của khách hàng lên hàng đầu trong mọi
              quyết định
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="text-primary" size={40} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Chuyên nghiệp</h3>
            <p className="text-gray-600">
              Đội ngũ nhân viên được đào tạo bài bản, am hiểu sâu về gaming gear
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="text-primary" size={40} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Đam mê</h3>
            <p className="text-gray-600">
              Chúng tôi là game thủ, hiểu game thủ và yêu thích những gì chúng
              tôi làm
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-50 rounded-lg p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Sứ mệnh</h2>
            <p className="text-gray-600 mb-4">
              Mang đến cho game thủ Việt Nam những trải nghiệm gaming tuyệt vời
              nhất thông qua các sản phẩm chất lượng cao, dịch vụ chuyên nghiệp
              và giá cả hợp lý.
            </p>
            <p className="text-gray-600">
              Chúng tôi không chỉ bán sản phẩm mà còn xây dựng một cộng đồng
              gaming gắn kết, nơi mọi người có thể chia sẻ niềm đam mê và kinh
              nghiệm.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Tầm nhìn</h2>
            <p className="text-gray-600 mb-4">
              Trở thành chuỗi cửa hàng gaming gear hàng đầu Việt Nam, được công
              nhận bởi chất lượng sản phẩm, dịch vụ xuất sắc và sự uy tín trong
              ngành.
            </p>
            <p className="text-gray-600">
              Chúng tôi hướng tới việc mở rộng mạng lưới cửa hàng trên toàn
              quốc, phục vụ ngày càng nhiều game thủ Việt Nam và góp phần phát
              triển cộng đồng gaming trong nước.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">
              {new Date().getFullYear() - parseInt(shopInfo.founded)}+
            </div>
            <div className="text-gray-600">Năm kinh nghiệm</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
            <div className="text-gray-600">Khách hàng hài lòng</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-gray-600">Sản phẩm đa dạng</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">98%</div>
            <div className="text-gray-600">Đánh giá tích cực</div>
          </div>
        </div>
      </section>
    </div>
  );
}
