import { shopInfo } from "@/lib/shopInfo";
import { Award, Users, Shield, Zap } from "lucide-react";

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
              src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800"
              alt="Thiết bị điện"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Câu chuyện của chúng tôi
            </h2>
            <div id="story">
              <p className="text-gray-600 mb-4">
                Với hơn 20 năm kinh nghiệm hoạt động trong lĩnh vực thiết bị
                điện dân dụng và công nghiệp, Cửa hàng thiết bị điện Chiến Hòa
                tự hào là một trong những địa chỉ uy tín và đáng tin cậy tại
                Thành phố Thanh Hóa. Từ những ngày đầu thành lập đến nay, chúng
                tôi luôn giữ vững cam kết — mang đến cho khách hàng sự an toàn,
                tiện nghi và bền bỉ cho hệ thống điện trong mọi công trình, từ
                nhà ở dân dụng đến các công trình lớn.
              </p>
              <p className="text-gray-600 mb-4">
                Chúng tôi cung cấp một dải sản phẩm rất đa dạng: từ các thiết bị
                điện dân dụng cơ bản như dây điện, ổ cắm, công tắc, bóng đèn,
                cầu dao — tới các thiết bị chuyên dụng, linh kiện tủ điện và các
                phụ kiện dành cho công trình, thi công — đáp ứng mọi nhu cầu của
                khách lẻ, gia đình, hộ chung cư đến các nhà thầu, công ty xây
                dựng. Nhờ đó, cửa hàng luôn là lựa chọn lý tưởng cho nhiều đối
                tượng khách hàng khác nhau.
              </p>
              <p className="text-gray-600 mb-4">
                Với phương châm "Chất lượng – Uy tín – Phục vụ tận tâm", Chiến
                Hòa không chỉ cung cấp sản phẩm chính hãng, đầy đủ xuất xưởng mà
                còn luôn sẵn sàng tư vấn kỹ thuật, hỗ trợ lựa chọn thiết bị phù
                hợp và đưa ra giải pháp an toàn cho hệ thống điện. Đây chính là
                lý do chúng tôi được nhiều gia đình, thợ điện và nhà thầu tin
                tưởng suốt nhiều năm qua.
              </p>
              <p className="text-gray-600 mb-4">
                Chúng tôi hiểu rằng an toàn và ổn định điện là điều tối quan
                trọng với mỗi ngôi nhà, mỗi công trình — vì vậy mọi sản phẩm và
                dịch vụ tại Chiến Hòa đều được chúng tôi cân nhắc kỹ lưỡng để
                đảm bảo tiêu chuẩn cao nhất. Cho dù bạn đang sửa chữa, xây mới
                hay cải tạo — Chiến Hòa luôn sẵn sàng đồng hành và mang đến giải
                pháp phù hợp nhất.
              </p>
              <p className="text-gray-600">
                Hãy đến với Chiến Hòa để trải nghiệm dịch vụ chuyên nghiệp, giá
                cả hợp lý và sự tận tâm trong từng chi tiết. Chúng tôi mong được
                phục vụ và đồng hành cùng bạn trong mọi dự án — từ nhỏ tới lớn —
                để cùng xây dựng không gian sống và làm việc an toàn, tiện nghi
                và bền vững.
              </p>
            </div>
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
              Cam kết 100% sản phẩm chính hãng, đầy đủ tem xuất xưởng và được
              kiểm định nghiêm ngặt
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-primary" size={40} />
            </div>
            <h3 className="text-xl font-semibold mb-3">An toàn</h3>
            <p className="text-gray-600">
              Đảm bảo tiêu chuẩn an toàn điện cao nhất cho mọi công trình và hệ
              thống điện
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-primary" size={40} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Tận tâm</h3>
            <p className="text-gray-600">
              Tư vấn kỹ thuật chuyên nghiệp, hỗ trợ khách hàng chu đáo trong mọi
              giai đoạn
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="text-primary" size={40} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Uy tín</h3>
            <p className="text-gray-600">
              Được gia đình, thợ điện và nhà thầu tin tưởng suốt hơn 20 năm qua
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
              Mang đến cho mọi gia đình và công trình tại Thanh Hóa những giải
              pháp điện an toàn, bền vững thông qua các sản phẩm chính hãng chất
              lượng cao, dịch vụ tư vấn chuyên nghiệp và giá cả hợp lý.
            </p>
            <p className="text-gray-600">
              Chúng tôi không chỉ cung cấp thiết bị điện mà còn đồng hành cùng
              khách hàng trong việc xây dựng hệ thống điện an toàn, hiệu quả cho
              mọi nhu cầu từ gia đình đến công nghiệp.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Tầm nhìn</h2>
            <p className="text-gray-600 mb-4">
              Trở thành đơn vị cung cấp thiết bị điện hàng đầu tại khu vực Bắc
              Trung Bộ, được công nhận bởi chất lượng sản phẩm, dịch vụ xuất sắc
              và sự uy tín trong ngành.
            </p>
            <p className="text-gray-600">
              Chúng tôi hướng tới việc mở rộng quy mô, nâng cao chất lượng dịch
              vụ để phục vụ ngày càng nhiều khách hàng và góp phần phát triển cơ
              sở hạ tầng điện an toàn cho cộng đồng.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">20+</div>
            <div className="text-gray-600">Năm kinh nghiệm</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">5,000+</div>
            <div className="text-gray-600">Khách hàng tin tưởng</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">400+</div>
            <div className="text-gray-600">Sản phẩm đa dạng</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">100%</div>
            <div className="text-gray-600">Sản phẩm chính hãng</div>
          </div>
        </div>
      </section>
    </div>
  );
}
