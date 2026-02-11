import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  POST_BY_SLUG_QUERY,
  POST_SLUGS_QUERY,
  RECENT_POSTS_QUERY,
} from "@/sanity/lib/queries";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PortableTextRenderer } from "@/components/shared/portable-text";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await client.fetch(POST_SLUGS_QUERY);
  return slugs.map((slug: string) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(POST_BY_SLUG_QUERY, { slug });

  if (!post) return { title: "Post Not Found" };

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt || "",
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt || "",
      type: "article",
      publishedTime: post.publishedAt,
      ...(post.mainImage && {
        images: [
          {
            url: urlFor(post.mainImage).width(1200).height(630).url(),
            width: 1200,
            height: 630,
          },
        ],
      }),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch(POST_BY_SLUG_QUERY, { slug });

  if (!post) {
    notFound();
  }

  const recentPosts = await client.fetch(RECENT_POSTS_QUERY);
  const otherPosts = recentPosts.filter(
    (p: any) => p.slug?.current !== slug
  );

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              All Posts
            </Link>

            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((cat: any) => (
                  <Badge key={cat.title} variant="secondary">
                    {cat.title}
                  </Badge>
                ))}
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-jakarta tracking-tight">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {/* Author + Date */}
            <div className="mt-6 flex items-center gap-4">
              {post.author?.image && (
                <Image
                  src={urlFor(post.author.image).width(80).height(80).url()}
                  alt={post.author.name || "Author"}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              <div>
                {post.author?.name && (
                  <p className="text-sm font-medium">{post.author.name}</p>
                )}
                {post.publishedAt && (
                  <p className="text-sm text-muted-foreground">
                    {formatDate(post.publishedAt)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {post.mainImage && (
        <section className="pb-8">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <Image
                src={urlFor(post.mainImage).width(1200).height(630).url()}
                alt={post.mainImage.alt || post.title || "Cover image"}
                width={1200}
                height={630}
                priority
                className="rounded-2xl w-full"
              />
            </div>
          </div>
        </section>
      )}

      {/* Body */}
      <section className="py-8 pb-24">
        <div className="container">
          <article className="max-w-3xl mx-auto prose-custom">
            <PortableTextRenderer value={post.body} />
          </article>
        </div>
      </section>

      {/* More Posts */}
      {otherPosts.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold font-jakarta mb-8">
                More Posts
              </h2>
              <div className="space-y-6">
                {otherPosts.map((other: any) => (
                  <Link
                    key={other._id}
                    href={`/blog/${other.slug?.current}`}
                    className="group flex gap-4 items-start"
                  >
                    {other.mainImage && (
                      <Image
                        src={urlFor(other.mainImage)
                          .width(160)
                          .height(100)
                          .url()}
                        alt={other.mainImage.alt || other.title || "Post"}
                        width={160}
                        height={100}
                        className="rounded-lg object-cover shrink-0"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold font-jakarta group-hover:text-primary transition-colors">
                        {other.title}
                      </h3>
                      {other.excerpt && (
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                          {other.excerpt}
                        </p>
                      )}
                      {other.publishedAt && (
                        <p className="mt-2 text-xs text-muted-foreground">
                          {formatDate(other.publishedAt)}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold font-jakarta">
              Need Help With Your Project?
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Our team is ready to help you grow. Get a free consultation today.
            </p>
            <Button size="lg" asChild className="mt-8 text-base px-8 h-12">
              <Link href="/contact">Get Free Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
