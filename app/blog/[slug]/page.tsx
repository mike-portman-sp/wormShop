import { client } from "../../../studio/client";
import MainMenu from "../../components/layout/mainMenu";
import { groq } from "next-sanity";
import { PortableText } from "next-sanity";
import { getSiteSettings } from "../../queries/getSiteSettings";
import { generateMetadata as genMeta } from "../../queries/generateMetaData";
import { linkProjection } from "../../queries/linkProjection";
import { Metadata } from "next";

/* ----------------------------------
   GROQ queries
---------------------------------- */
const blogPostQuery = groq`
  *[_type == "blogs" && slug.current == $slug][0]{
    title,
    subTitle,
    publishedDate,
    body{
      content[]{
        ...,
        markDefs[]{
          ...,
          _type == "link" => {
            ${linkProjection}
          }
        }
      }
    },
    seo{
      metaTitle,
      metaDescription,
      noIndex,
      metaImage{
        asset->{
          url
        }
      }
    }
  }
`;

const mainMenuQuery = groq`
  *[_type == "mainMenu"][0]{
    title,
    menuItems[]{
      _key,
      _type,
      title,
      link{
        ${linkProjection}
      }
    }
  }
`;

/* ----------------------------------
   Static params
---------------------------------- */
export async function generateStaticParams() {
  const slugs = await client.fetch(
    groq`*[_type == "blogs" && defined(slug.current)]{
      "slug": slug.current
    }`,
  );

  return slugs.map((item: { slug: string }) => ({
    slug: item.slug,
  }));
}

/* ----------------------------------
   Generate Metadata
---------------------------------- */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [blog, settings] = await Promise.all([
    client.fetch(blogPostQuery, { slug }),
    getSiteSettings(),
  ]);


  if (!blog) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return genMeta({
    title: blog.title,
    description: blog.subTitle,
    seo: blog.seo,
    defaultSeo: settings?.defaultSeo,
    siteName: settings?.siteName,
    siteUrl: settings?.siteUrl,
    path: `/blog/${slug}`,
  });
}

/* ----------------------------------
   Page component
---------------------------------- */
type BlogSubPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogSubPage({ params }: BlogSubPageProps) {
  const { slug } = await params;

  const [blog, mainMenu, settings] = await Promise.all([
    client.fetch(blogPostQuery, { slug }),
    client.fetch(mainMenuQuery),
    getSiteSettings(),
  ]);

  if (!blog) {
    return <div>Blog post not found</div>;
  }

  return (
    <>
      <MainMenu mainMenu={mainMenu} siteName={settings?.siteName} />

      <article className="px-6 max-w-6xl mx-auto container py-16">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

        {blog.subTitle && (
          <p className="text-xl text-muted-foreground mb-6">{blog.subTitle}</p>
        )}

        {blog.publishedDate && (
          <p className="text-sm mb-10">
            {new Date(blog.publishedDate).toLocaleDateString()}
          </p>
        )}

        <div className="portable-text">
          {blog.body?.content ? (
            <PortableText
              value={blog.body.content}
              components={{
                marks: {
                  link: ({ value, children }: any) => {
                    const { linkType, internal, external, file } = value;
                    let href = "#";
                    if (linkType === "external") href = external || "#";
                    else if (linkType === "internal") href = `/${internal?.slug?.current || ""}`;
                    else if (linkType === "file") href = file?.asset?.url || "#";
                    return (
                      <a
                        href={href}
                        className="text-primary hover:underline transition-colors"
                        target={linkType === "external" ? "_blank" : undefined}
                        rel={linkType === "external" ? "noopener noreferrer" : undefined}
                      >
                        {children}
                      </a>
                    );
                  },
                },
              }}
            />
          ) : (
            <p>No content available - add content in Sanity Studio</p>
          )}
        </div>
      </article>
    </>
  );
}
