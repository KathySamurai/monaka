import type { Metadata } from "next";
import { Saisen } from "@/components/Saisen";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "あそび賽銭 | もなか",
  description: "つづいてほしい、を、そっとかたちに。",
};

export default function SaisenPage() {
  return (
    <div className="saisen-page">
      <SiteHeader variant="inner" />
      <main>
        <Saisen headingLevel="h1" />
      </main>
      <SiteFooter />
    </div>
  );
}
