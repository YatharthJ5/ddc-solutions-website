import Link from "next/link";
import type { Post } from "@/lib/data";
export function PostLink({ post, className, children }: { post: Post; className?: string; children: React.ReactNode }) {
  return post.external ? <a href={post.external} target="_blank" rel="noopener noreferrer" className={className}>{children}<span className="sr-only"> (original article, opens in a new tab)</span></a> : <Link href={`/blog/${post.slug}`} className={className}>{children}</Link>;
}
