export interface Blog {
  id: number;
  date: string;
  title: string;
  url: string;
  tags: string[];
}

export const blogsData: Blog[] = [
  {
    id: 1,
    date: "07 MAR 2024",
    title: "Deploying a React App on Kubernetes: A Quick Guide",
    url: "https://dev.to/saitadikonda99/deploying-a-react-app-on-kubernetes-a-quick-guide-3e9",
    tags: ["DevOps", "React", "Kubernetes"]
  },
  {
    id: 2,
    date: "30 JAN 2024",
    title: "From Code to Container: Dockerizing Your React Application Like a Pro",
    url: "https://saitadikonda99.hashnode.dev/docker-react",
    tags: ["DevOps", "React", "Docker"]
  },
  {
    id: 3,
    date: "28 NOV 2023",
    title: "JWT Authentication with node JS and Express",
    url: "https://saitadikonda99.hashnode.dev/jwt-authentication-with-node-js-and-express",
    tags: ["Backend", "Node.js", "Express", "JWT"]
  },
  {
    id: 4,
    date: "22 JAN 2023",
    title: "Make your work 10X productive using ChatGPT",
    url: "https://saitadikonda.hashnode.dev/make-your-work-10x-productive-using-chatgpt",
    tags: ["AI", "Productivity", "ChatGPT"]
  }
];
