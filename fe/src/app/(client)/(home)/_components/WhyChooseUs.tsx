import { BadgeCheck, DollarSign, Headphones } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <BadgeCheck className="w-8 h-8" />,
      title: "Sản phẩm chính hãng",
      description: "100% sản phẩm chính hãng, bảo hành đầy đủ",
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Giá cả hợp lý",
      description: "Cam kết giá tốt nhất thị trường",
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "Hỗ trợ nhiệt tình",
      description: "Đội ngũ tư vấn chuyên nghiệp, tận tâm",
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          Tại sao chọn chúng tôi?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
