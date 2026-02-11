import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights, guides, and tips on web development, SEO, social media, business strategy, and finance.",
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogPage() {
  const posts = await client.fetch(POSTS_QUERY);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Blog
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold font-jakarta tracking-tight">
              Insights &{" "}
              <span className="text-primary">Resources</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Practical advice on growing your business online. No fluff, just
              actionable strategies from our team.
            </p>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16 bg-white">
        <div className="container">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl font-semibold font-jakarta mb-2">
                No posts yet
              </p>
              <p className="text-muted-foreground">
                We&apos;re working on some great content. Check back soon!
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                👉 Add your first post at{" "}
                <Link href="/studio" className="text-primary underline">
                  /studio
                </Link>
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug?.current}`}
                  className="group"
                >
                  <article className="rounded-2xl border bg-card overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                    {/* Image */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                      {post.mainImage ? (
                        <Image
                          src={urlFor(post.mainImage).width(600).height(340).url()}
                          alt={post.mainImage.alt || post.title || "Blog post"}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          No image
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      {/* Categories */}
                      {post.categories && post.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.categories.map((cat: any) => (
                            <Badge
                              key={cat.title}
                              variant="secondary"
                              className="text-xs"
                            >
                              {cat.title}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <h2 className="text-lg font-semibold font-jakarta group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      {post.excerpt && (
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1">
                          {post.excerpt}
                        </p>
                      )}

                      <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
                        {post.author && (
                          <span className="font-medium text-foreground">
                            {post.author.name}
                          </span>
                        )}
                        {post.publishedAt && (
                          <>
                            <span>·</span>
                            <time>{formatDate(post.publishedAt)}</time>
                          </>
                        )}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
