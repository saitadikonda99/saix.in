"use client";
import React from 'react'

interface Blog {
  id: number;
  date: string;
  title: string;
  url: string;
  tags: string[];
  image?: string;
}

const blogsData: Blog[] = [
  {
    id: 1,
    date: "07 MAR 2024",
    title: "Deploying a React App on Kubernetes: A Quick Guide",
    url: "https://dev.to/saitadikonda99/deploying-a-react-app-on-kubernetes-a-quick-guide-3e9",
    tags: ["DevOps", "React", "Kubernetes"],
    image: "/blog1.jpg"
  },
  {
    id: 2,
    date: "30 JAN 2024",
    title: "From Code to Container: Dockerizing Your React Application Like a Pro",
    url: "https://saitadikonda99.hashnode.dev/docker-react",
    tags: ["DevOps", "React", "Docker"],
    image: "/blog2.jpg"
  },
  {
    id: 3,
    date: "28 NOV 2023",
    title: "JWT Authentication with node JS and Express",
    url: "https://saitadikonda99.hashnode.dev/jwt-authentication-with-node-js-and-express",
    tags: ["Backend", "Node.js", "Express", "JWT"],
    image: "/blog3.jpg"
  },
  {
    id: 4,
    date: "22 JAN 2023",
    title: "Make your work 10X productive using ChatGPT",
    url: "https://saitadikonda.hashnode.dev/make-your-work-10x-productive-using-chatgpt",
    tags: ["AI", "Productivity", "ChatGPT"],
    image: "/blog4.jpg"
  }
];

const Blogs = () => {
  return (
    <div className="w-full py-10">
      <div className="w-full flex flex-col items-center justify-between gap-4">
        <div className="w-full py-4">
          <h2 className="text-text-primary text-[1.2rem] font-bold">Blogs</h2>
        </div>
        
        <div className="w-full flex flex-wrap items-center justify-between gap-4">
          {blogsData.map((blog) => (
            <div 
              key={blog.id} 
              className="w-full sm:w-[48%] cursor-pointer group"
              onClick={() => window.open(blog.url, '_blank', 'noopener,noreferrer')}
            >
              <div 
                className="w-full h-[200px] bg-cover bg-center bg-no-repeat relative overflow-hidden"
                style={{ backgroundImage: blog.image ? `url('${blog.image}')` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300"></div>
                <div className="w-full h-full flex items-end justify-end relative z-10">
                  <div className="text-text-primary text-[.8rem] font-bold p-2 bg-black/20 group-hover:bg-black/40 transition-all duration-300">
                    {blog.title}
                  </div>
                </div>
              </div>
              <div className="w-full flex items-center justify-start gap-2 py-2">
                {blog.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="text-text-secondary border-1 border-border-primary text-[.8rem] font-bold px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blogs