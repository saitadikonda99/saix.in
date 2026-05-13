import Link from "next/link";
import SectionTag from "@/components/ui/section-tag";
import { blogsData } from "@/data/blogs";

const Blogs = () => (
  <div>
    <SectionTag>writing</SectionTag>
    <ul className="flex flex-col gap-2">
      {blogsData.map((blog) => (
        <li key={blog.id} className="flex items-start gap-2">
          <span className="text-text-secondary select-none mt-0.5">•</span>
          <span>
            <Link href={blog.url} target="_blank" rel="noopener noreferrer" className="hl-link text-text-primary">
              {blog.title}
            </Link>
            <span className="text-text-secondary"> — {blog.date}</span>
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export default Blogs;
