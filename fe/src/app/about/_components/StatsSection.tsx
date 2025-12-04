interface StatsSectionProps {
  visibleSections: Set<string>;
}

export default function StatsSection({ visibleSections }: StatsSectionProps) {
  const stats = [
    { value: "20+", label: "Năm kinh nghiệm" },
    { value: "5,000+", label: "Khách hàng tin tưởng" },
    { value: "1,000+", label: "Sản phẩm đa dạng" },
    { value: "100%", label: "Sản phẩm chính hãng" },
  ];

  return (
    <section className="mt-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <div
            key={index}
            id={`stat-${index + 1}`}
            data-animate
            className={`transition-all duration-700 delay-${index * 100} ${
              visibleSections.has(`stat-${index + 1}`)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="text-4xl font-bold text-primary mb-2">
              {stat.value}
            </div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
