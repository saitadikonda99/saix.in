"use client";
import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'

const About = () => {
    const [copied, setCopied] = useState(false);
    const curlCommand = "curl -X GET http://localhost:3000/api/about";

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(curlCommand);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="w-full py-10">
            <div className="w-full flex flex-col items-center justify-between gap-4">

                <div className="w-full bg-background border-1 border-border-primary">
                    <div className="w-full flex items-center justify-between px-4 py-2">
                        <p className="text-text-primary text-[.8rem] font-sm">{curlCommand}</p>
                        <button onClick={handleCopy} className="text-text-primary cursor-pointer hover:text-text-primary-600 transition-colors flex items-center gap-1">
                            {copied ? (
                                <>
                                    <span className="text-[.8rem]">Copied</span>
                                    <Check size={16} />
                                </>
                            ) : (
                                <Copy size={16} />
                            )}
                        </button>
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-background border border-border-secondary p-5 font-mono text-sm leading-relaxed">
                        <span className="text-yellow-600">[</span>
                        <p className="pl-4 text-text-primary leading-relaxed">
                            <span className="text-green-600">"</span>
                            I'm Tadikonda Sai Manikanta, a Full-Stack Developer passionate about crafting
                            high-performance, scalable web applications. With expertise in{" "}
                            <span className="text-text-primary-600 underline font-bold">Next.js</span>,{" "}
                            <span className="text-blue-600 underline font-bold">React</span>,{" "}
                            <span className="text-green-600 underline font-bold">Node.js</span>, and{" "}
                            <span className="text-blue-600 underline font-bold">Go</span>, I specialize in
                            building seamless digital experiences and optimizing system performance for
                            real-world impact.
                            <span className="text-green-600">"</span>
                        </p>
                        <span className="text-yellow-600">]</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default About