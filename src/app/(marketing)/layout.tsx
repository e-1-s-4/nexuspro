import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { position: 1, name: "Home", item: "https://nexus-agency.com/" },
        ]}
      />
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </>
  );
}
