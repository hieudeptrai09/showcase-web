"use client";

import { shopInfo } from "@/lib/shopInfo";
import { Award, Users, Shield, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections((prev) => new Set(prev).add(entry.target.id));
        } else {
          // Remove from visible sections when it leaves viewport
          setVisibleSections((prev) => {
            const newSet = new Set(prev);
            newSet.delete(entry.target.id);
            return newSet;
          });
        }
      });
    };

    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px",
    };

    const elementsToObserve = document.querySelectorAll("[data-animate]");
    elementsToObserve.forEach((element) => {
      const observer = new IntersectionObserver(
        observerCallback,
        observerOptions
      );
      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <div className="pb-12">
      {/* Hero Section */}
      <div className="text-center mb-12 container-custom pt-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Về chúng tôi</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {shopInfo.tagline}
        </p>
      </div>

      {/* Full Width Image */}
      <div className="w-full mb-16 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1600"
          alt="Thiết bị điện Chiến Hòa"
          className="w-full h-[400px] md:h-[500px] object-cover"
        />
      </div>

      <div className="container-custom">
        {/* Story Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Câu chuyện của chúng tôi
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <p
              id="story-1"
              data-animate
              className={`text-gray-600 text-lg leading-relaxed transition-all duration-700 ${
                visibleSections.has("story-1")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              Với hơn 20 năm kinh nghiệm hoạt động trong lĩnh vực thiết bị điện
              dân dụng và công nghiệp, Cửa hàng thiết bị điện Chiến Hòa tự hào
              là một trong những địa chỉ uy tín và đáng tin cậy tại Thành phố
              Thanh Hóa. Từ những ngày đầu thành lập đến nay, chúng tôi luôn giữ
              vững cam kết — mang đến cho khách hàng sự an toàn, tiện nghi và
              bền bỉ cho hệ thống điện trong mọi công trình, từ nhà ở dân dụng
              đến các công trình lớn.
            </p>
            <p
              id="story-2"
              data-animate
              className={`text-gray-600 text-lg leading-relaxed transition-all duration-700 delay-100 ${
                visibleSections.has("story-2")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              Chúng tôi cung cấp một dải sản phẩm rất đa dạng: từ các thiết bị
              điện dân dụng cơ bản như dây điện, ổ cắm, công tắc, bóng đèn, cầu
              dao — tới các thiết bị chuyên dụng, linh kiện tủ điện và các phụ
              kiện dành cho công trình, thi công — đáp ứng mọi nhu cầu của khách
              lẻ, gia đình, hộ chung cư đến các nhà thầu, công ty xây dựng. Nhờ
              đó, cửa hàng luôn là lựa chọn lý tưởng cho nhiều đối tượng khách
              hàng khác nhau.
            </p>
            <p
              id="story-3"
              data-animate
              className={`text-gray-600 text-lg leading-relaxed transition-all duration-700 delay-200 ${
                visibleSections.has("story-3")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              Với phương châm "Chất lượng – Uy tín – Phục vụ tận tâm", Chiến Hòa
              không chỉ cung cấp sản phẩm chính hãng, đầy đủ xuất xưởng mà còn
              luôn sẵn sàng tư vấn kỹ thuật, hỗ trợ lựa chọn thiết bị phù hợp và
              đưa ra giải pháp an toàn cho hệ thống điện. Đây chính là lý do
              chúng tôi được nhiều gia đình, thợ điện và nhà thầu tin tưởng suốt
              nhiều năm qua.
            </p>
            <p
              id="story-4"
              data-animate
              className={`text-gray-600 text-lg leading-relaxed transition-all duration-700 delay-300 ${
                visibleSections.has("story-4")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              Chúng tôi hiểu rằng an toàn và ổn định điện là điều tối quan trọng
              với mỗi ngôi nhà, mỗi công trình — vì vậy mọi sản phẩm và dịch vụ
              tại Chiến Hòa đều được chúng tôi cân nhắc kỹ lưỡng để đảm bảo tiêu
              chuẩn cao nhất. Cho dù bạn đang sửa chữa, xây mới hay cải tạo —
              Chiến Hòa luôn sẵn sàng đồng hành và mang đến giải pháp phù hợp
              nhất.
            </p>
            <p
              id="story-5"
              data-animate
              className={`text-gray-600 text-lg leading-relaxed transition-all duration-700 delay-400 ${
                visibleSections.has("story-5")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              Hãy đến với Chiến Hòa để trải nghiệm dịch vụ chuyên nghiệp, giá cả
              hợp lý và sự tận tâm trong từng chi tiết. Chúng tôi mong được phục
              vụ và đồng hành cùng bạn trong mọi dự án — từ nhỏ tới lớn — để
              cùng xây dựng không gian sống và làm việc an toàn, tiện nghi và
              bền vững.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2
            id="values-title"
            data-animate
            className={`text-3xl font-bold text-gray-800 text-center mb-12 transition-all duration-700 ${
              visibleSections.has("values-title")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Giá trị cốt lõi
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div
              id="value-1"
              data-animate
              className={`text-center transition-all duration-700 ${
                visibleSections.has("value-1")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-transform duration-500 hover:scale-110">
                <Award className="text-primary" size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Chất lượng</h3>
              <p className="text-gray-600">
                Cam kết 100% sản phẩm chính hãng, đầy đủ tem xuất xưởng và được
                kiểm định nghiêm ngặt
              </p>
            </div>
            <div
              id="value-2"
              data-animate
              className={`text-center transition-all duration-700 delay-100 ${
                visibleSections.has("value-2")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-transform duration-500 hover:scale-110">
                <Shield className="text-primary" size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-3">An toàn</h3>
              <p className="text-gray-600">
                Đảm bảo tiêu chuẩn an toàn điện cao nhất cho mọi công trình và
                hệ thống điện
              </p>
            </div>
            <div
              id="value-3"
              data-animate
              className={`text-center transition-all duration-700 delay-200 ${
                visibleSections.has("value-3")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-transform duration-500 hover:scale-110">
                <Users className="text-primary" size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Tận tâm</h3>
              <p className="text-gray-600">
                Tư vấn kỹ thuật chuyên nghiệp, hỗ trợ khách hàng chu đáo trong
                mọi giai đoạn
              </p>
            </div>
            <div
              id="value-4"
              data-animate
              className={`text-center transition-all duration-700 delay-300 ${
                visibleSections.has("value-4")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-transform duration-500 hover:scale-110">
                <Zap className="text-primary" size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Uy tín</h3>
              <p className="text-gray-600">
                Được gia đình, thợ điện và nhà thầu tin tưởng suốt hơn 20 năm
                qua
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section
          id="mission-vision"
          data-animate
          className={`bg-gray-50 rounded-lg p-8 md:p-12 transition-all duration-700 ${
            visibleSections.has("mission-vision")
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
          }`}
        >
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Sứ mệnh</h2>
              <p className="text-gray-600 mb-4">
                Mang đến cho mọi gia đình và công trình tại Thanh Hóa những giải
                pháp điện an toàn, bền vững thông qua các sản phẩm chính hãng
                chất lượng cao, dịch vụ tư vấn chuyên nghiệp và giá cả hợp lý.
              </p>
              <p className="text-gray-600">
                Chúng tôi không chỉ cung cấp thiết bị điện mà còn đồng hành cùng
                khách hàng trong việc xây dựng hệ thống điện an toàn, hiệu quả
                cho mọi nhu cầu từ gia đình đến công nghiệp.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Tầm nhìn
              </h2>
              <p className="text-gray-600 mb-4">
                Trở thành đơn vị cung cấp thiết bị điện hàng đầu tại khu vực Bắc
                Trung Bộ, được công nhận bởi chất lượng sản phẩm, dịch vụ xuất
                sắc và sự uy tín trong ngành.
              </p>
              <p className="text-gray-600">
                Chúng tôi hướng tới việc mở rộng quy mô, nâng cao chất lượng
                dịch vụ để phục vụ ngày càng nhiều khách hàng và góp phần phát
                triển cơ sở hạ tầng điện an toàn cho cộng đồng.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div
              id="stat-1"
              data-animate
              className={`transition-all duration-700 ${
                visibleSections.has("stat-1")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="text-4xl font-bold text-primary mb-2">20+</div>
              <div className="text-gray-600">Năm kinh nghiệm</div>
            </div>
            <div
              id="stat-2"
              data-animate
              className={`transition-all duration-700 delay-100 ${
                visibleSections.has("stat-2")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="text-4xl font-bold text-primary mb-2">5,000+</div>
              <div className="text-gray-600">Khách hàng tin tưởng</div>
            </div>
            <div
              id="stat-3"
              data-animate
              className={`transition-all duration-700 delay-200 ${
                visibleSections.has("stat-3")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="text-4xl font-bold text-primary mb-2">1,000+</div>
              <div className="text-gray-600">Sản phẩm đa dạng</div>
            </div>
            <div
              id="stat-4"
              data-animate
              className={`transition-all duration-700 delay-300 ${
                visibleSections.has("stat-4")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-gray-600">Sản phẩm chính hãng</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
