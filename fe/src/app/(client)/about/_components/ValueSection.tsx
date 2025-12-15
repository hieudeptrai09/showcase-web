import { Award, Users, Shield, Zap } from "lucide-react";

interface ValuesSectionProps {
  visibleSections: Set<string>;
}

export default function ValuesSection({ visibleSections }: ValuesSectionProps) {
  const values = [
    {
      icon: Award,
      title: "Chất lượng",
      description:
        "Cam kết 100% sản phẩm chính hãng, đầy đủ tem xuất xưởng và được kiểm định nghiêm ngặt",
    },
    {
      icon: Shield,
      title: "An toàn",
      description:
        "Đảm bảo tiêu chuẩn an toàn điện cao nhất cho mọi công trình và hệ thống điện",
    },
    {
      icon: Users,
      title: "Tận tâm",
      description:
        "Tư vấn kỹ thuật chuyên nghiệp, hỗ trợ khách hàng chu đáo trong mọi giai đoạn",
    },
    {
      icon: Zap,
      title: "Uy tín",
      description:
        "Được gia đình, thợ điện và nhà thầu tin tưởng suốt hơn 20 năm qua",
    },
  ];

  return (
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
        {values.map((value, index) => {
          const Icon = value.icon;
          return (
            <div
              key={index}
              id={`value-${index + 1}`}
              data-animate
              className={`text-center transition-all duration-700 delay-${
                index * 100
              } ${
                visibleSections.has(`value-${index + 1}`)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-transform duration-500 hover:scale-110">
                <Icon className="text-primary" size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
