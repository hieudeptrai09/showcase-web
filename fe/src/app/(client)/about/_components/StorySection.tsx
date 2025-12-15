interface StorySectionProps {
  visibleSections: Set<string>;
}

export default function StorySection({ visibleSections }: StorySectionProps) {
  const storyParagraphs = [
    "Với hơn 20 năm kinh nghiệm hoạt động trong lĩnh vực thiết bị điện dân dụng và công nghiệp, Cửa hàng thiết bị điện Chiến Hòa tự hào là một trong những địa chỉ uy tín và đáng tin cậy tại Thành phố Thanh Hóa. Từ những ngày đầu thành lập đến nay, chúng tôi luôn giữ vững cam kết — mang đến cho khách hàng sự an toàn, tiện nghi và bền bỉ cho hệ thống điện trong mọi công trình, từ nhà ở dân dụng đến các công trình lớn.",
    "Chúng tôi cung cấp một dải sản phẩm rất đa dạng: từ các thiết bị điện dân dụng cơ bản như dây điện, ổ cắm, công tắc, bóng đèn, cầu dao — tới các thiết bị chuyên dụng, linh kiện tủ điện và các phụ kiện dành cho công trình, thi công — đáp ứng mọi nhu cầu của khách lẻ, gia đình, hộ chung cư đến các nhà thầu, công ty xây dựng. Nhờ đó, cửa hàng luôn là lựa chọn lý tưởng cho nhiều đối tượng khách hàng khác nhau.",
    'Với phương châm "Chất lượng – Uy tín – Phục vụ tận tâm", Chiến Hòa không chỉ cung cấp sản phẩm chính hãng, đầy đủ xuất xưởng mà còn luôn sẵn sàng tư vấn kỹ thuật, hỗ trợ lựa chọn thiết bị phù hợp và đưa ra giải pháp an toàn cho hệ thống điện. Đây chính là lý do chúng tôi được nhiều gia đình, thợ điện và nhà thầu tin tưởng suốt nhiều năm qua.',
    "Chúng tôi hiểu rằng an toàn và ổn định điện là điều tối quan trọng với mỗi ngôi nhà, mỗi công trình — vì vậy mọi sản phẩm và dịch vụ tại Chiến Hòa đều được chúng tôi cân nhắc kỹ lưỡng để đảm bảo tiêu chuẩn cao nhất. Cho dù bạn đang sửa chữa, xây mới hay cải tạo — Chiến Hòa luôn sẵn sàng đồng hành và mang đến giải pháp phù hợp nhất.",
    "Hãy đến với Chiến Hòa để trải nghiệm dịch vụ chuyên nghiệp, giá cả hợp lý và sự tận tâm trong từng chi tiết. Chúng tôi mong được phục vụ và đồng hành cùng bạn trong mọi dự án — từ nhỏ tới lớn — để cùng xây dựng không gian sống và làm việc an toàn, tiện nghi và bền vững.",
  ];

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Câu chuyện của chúng tôi
      </h2>
      <div className="max-w-4xl mx-auto space-y-6">
        {storyParagraphs.map((paragraph, index) => (
          <p
            key={index}
            id={`story-${index + 1}`}
            data-animate
            className={`text-gray-600 text-lg leading-relaxed transition-all duration-700 delay-${
              index * 100
            } ${
              visibleSections.has(`story-${index + 1}`)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
