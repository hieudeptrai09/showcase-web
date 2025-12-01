import FooterAbout from "./FooterAbout";
import FooterContact from "./FooterContact";
import FooterQuickLinks from "./FooterQuickLinks";
import FooterBusinessInfo from "./FooterBusinessInfo";
import FooterCopyright from "./FooterCopyright";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="container-custom pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FooterAbout />
          <FooterContact />
          <FooterQuickLinks />
          <FooterBusinessInfo />
        </div>
        <FooterCopyright />
      </div>
    </footer>
  );
}
