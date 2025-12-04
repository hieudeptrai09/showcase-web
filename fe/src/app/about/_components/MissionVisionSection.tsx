interface MissionVisionSectionProps {
  visibleSections: Set<string>;
}

export default function MissionVisionSection({
  visibleSections,
}: MissionVisionSectionProps) {
  const content = [
    {
      title: "Sứ mệnh",
      firstParagraph:
        "Mang đến cho mọi gia đình và công trình tại Thanh Hóa những giải pháp điện an toàn, bền vững thông qua các sản phẩm chính hãng chất lượng cao, dịch vụ tư vấn chuyên nghiệp và giá cả hợp lý.",
      secondParagraph:
        "Chúng tôi không chỉ cung cấp thiết bị điện mà còn đồng hành cùng khách hàng trong việc xây dựng hệ thống điện an toàn, hiệu quả cho mọi nhu cầu từ gia đình đến công nghiệp.",
    },
    {
      title: "Tầm nhìn",
      firstParagraph:
        "Trở thành đơn vị cung cấp thiết bị điện hàng đầu tại khu vực Bắc Trung Bộ, được công nhận bởi chất lượng sản phẩm, dịch vụ xuất sắc và sự uy tín trong ngành.",
      secondParagraph:
        "Chúng tôi hướng tới việc mở rộng quy mô, nâng cao chất lượng dịch vụ để phục vụ ngày càng nhiều khách hàng và góp phần phát triển cơ sở hạ tầng điện an toàn cho cộng đồng.",
    },
  ];

  return (
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
        {content.map((section, index) => (
          <div key={index}>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {section.title}
            </h2>
            <p className="text-gray-600 mb-4">{section.firstParagraph}</p>
            <p className="text-gray-600">{section.secondParagraph}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
