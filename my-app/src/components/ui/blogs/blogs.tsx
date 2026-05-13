import Link from "next/link";

interface Blog {
  id: number;
  date: string;
  title: string;
  url: string;
}

const blogsData: Blog[] = [
  {
    id: 1,
    date: "07 MAR 2024",
    title: "Deploying a React App on Kubernetes: A Quick Guide",
    url: "https://dev.to/saitadikonda99/deploying-a-react-app-on-kubernetes-a-quick-guide-3e9",
  },
  {
    id: 2,
    date: "30 JAN 2024",
    title: "From Code to Container: Dockerizing Your React Application Like a Pro",
    url: "https://saitadikonda99.hashnode.dev/docker-react",
  },
  {
    id: 3,
    date: "28 NOV 2023",
    title: "JWT Authentication with Node.js and Express",
    url: "https://saitadikonda99.hashnode.dev/jwt-authentication-with-node-js-and-express",
  },
  {
    id: 4,
    date: "22 JAN 2023",
    title: "Make your work 10X productive using ChatGPT",
    url: "https://saitadikonda.hashnode.dev/make-your-work-10x-productive-using-chatgpt",
  },
];

const Blogs = () => {
  return (
    <div>
      <div className="inline-block bg-[#f2f0e5] dark:bg-[#242424] text-text-primary px-2 py-0.5 text-[0.8rem] mb-3">
        writing
      </div>
      <ul className="flex flex-col gap-2">
        {blogsData.map((blog) => (
          <li key={blog.id} className="flex items-start gap-2">
            <span className="text-text-secondary select-none mt-0.5">•</span>
            <span>
              <Link
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hl-link text-text-primary"
              >
                {blog.title}
              </Link>
              <span className="text-text-secondary"> — {blog.date}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
