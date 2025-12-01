interface FooterSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function FooterSection({ title, children }: FooterSectionProps) {
  return (
    <div>
      <h3 className="text-white text-lg font-bold mb-4">{title}</h3>
      {children}
    </div>
  );
}
