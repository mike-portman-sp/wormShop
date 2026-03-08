import { client } from "../../studio/client";
import PageBuilder from "../pagebuilder";
import MainMenu from "../components/layout/mainMenu";
import { pageQuery } from "../queries/pageQuery";
import { getSiteSettings } from "../queries/getSiteSettings";
import { generateMetadata as genMeta } from "../queries/generateMetaData";
import { Metadata } from "next";
import Footer from "../components/layout/footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const [data, settings] = await Promise.all([
    client.fetch(pageQuery, { slug }),
    getSiteSettings(),
  ]);

  if (!data) {
    return {
      title: "Page Not Found",
    };
  }

  return genMeta({
    title: data.title,
    seo: data.seo,
    defaultSeo: settings?.defaultSeo,
    siteName: settings?.siteName,
    siteUrl: settings?.siteUrl,
    path: `/${slug}`,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await client.fetch(pageQuery, { slug });

  if (!data) {
    return <div>Page not found</div>;
  }

  return (
    <>
      <MainMenu mainMenu={data.mainMenu} />
      <PageBuilder blocks={data.pageBuilder} />
      <Footer footer={data.footer} mainMenu={data.mainMenu} />
    </>
  );
}
