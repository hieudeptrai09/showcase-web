interface HeroSectionProps {
  tagline: string;
}

export default function HeroSection({ tagline }: HeroSectionProps) {
  return (
    <div className="text-center mb-12 container-custom pt-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Về chúng tôi</h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">{tagline}</p>
    </div>
  );
}
