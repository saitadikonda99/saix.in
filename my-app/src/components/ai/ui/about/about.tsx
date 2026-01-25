import React from 'react'

const about = () => {
    return (
        <div className="w-full border-r-1 border-l-1 border-border-ai px-4 py-1">
            <p className="text-zinc-400">## About</p>
            <p className="text-green-400">
                $ curl https://saix.in/api/about
            </p>
            <p className="text-white pl-4">
                {`{
                    "name": "Sai Tadikonda",
                    "role": "Full-Stack Developer",
                    "stack": ["Next.js", "React", "Node.js", "Go"],
                    "focus": "High-performance, scalable web applications"
                }`}
            </p>
        </div>
    )
}

export default about    