import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TeamPeople } from "@/components/TeamPeople";
import { COMPANY, TEAM_INTRO } from "@/lib/about";

export const metadata: Metadata = {
  title: "会社概要 | もなか",
  description: COMPANY.summary,
};

export default function AboutPage() {
  return (
    <div className="about-page">
      <SiteHeader variant="inner" />
      <main className="about">
        <Reveal>
          <div className="about__inner">
            <p className="about__kicker">ABOUT</p>
            <h1 className="about__title">会社概要</h1>
            <p className="about__lead">{COMPANY.summary}</p>
            <table className="about-table">
              <tbody>
                <tr>
                  <th scope="row">商号</th>
                  <td>
                    {COMPANY.name}
                    <span className="about-table__kana">{COMPANY.kana}</span>
                  </td>
                </tr>
                <tr>
                  <th scope="row">設立</th>
                  <td>{COMPANY.founded}</td>
                </tr>
                <tr>
                  <th scope="row">代表社員</th>
                  <td>{COMPANY.representative}</td>
                </tr>
                <tr>
                  <th scope="row">本店所在地</th>
                  <td>{COMPANY.address}</td>
                </tr>
                <tr>
                  <th scope="row">法人番号</th>
                  <td>{COMPANY.number}</td>
                </tr>
                <tr>
                  <th scope="row">事業内容</th>
                  <td>{COMPANY.business}</td>
                </tr>
                <tr>
                  <th scope="row">メール</th>
                  <td>
                    <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="about__note">
              設立日は、国税庁法人番号公表サイトの法人番号指定日に基づきます。資本金・従業員数などは、まだ公開情報がありません。
            </p>
            <section className="about-team" aria-labelledby="about-team-title">
              <p className="about__kicker">TEAM</p>
              <h2 id="about-team-title" className="about__title about__title--sub">
                経営チーム
              </h2>
              <p className="about__lead">{TEAM_INTRO}</p>
              <TeamPeople />
            </section>
          </div>
        </Reveal>
      </main>
      <SiteFooter />
    </div>
  );
}
