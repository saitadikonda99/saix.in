"use client";
import React from 'react'
import { blogsData } from '@/data/blogs'

const Blogs = () => {
  return (
    <div className="w-full border-r-1 border-l-1 border-border-ai relative">
      <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-white"></div>
      <div className="w-full px-4 py-2">
        <button className="text-white text-[.8rem]">## BLOGS</button>
        {blogsData.map((blog, index) => (
          <div key={blog.id} className="mb-8 last:mb-0">
            <div className="flex items-start gap-2">
              <span className="text-white">-</span>
              <div className="flex-1">
                <a
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white uppercase hover:underline block pb-1 font-mono text-[.8rem]"
                >
                  [{blog.title.toUpperCase()}]
                </a>
                <p className="text-white text-[.8rem] pb-1 font-mono">
                  ({blog.url})
                </p>
                <div className="flex items-center gap-2 pb-1 flex-wrap">
                  <span className="text-white text-[.8rem]">Tech Stack:</span>
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#484b4d] text-white px-1 py-0 text-[.8rem] font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Blogs
