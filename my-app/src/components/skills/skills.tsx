import React from 'react'

import { IoLogoJavascript } from "react-icons/io5";
import { SiTypescript } from "react-icons/si";
import { FaGolang } from "react-icons/fa6";
import { FaJava } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";
import { FaNode } from "react-icons/fa";
import { FaGitAlt } from "react-icons/fa";
import { FaDocker } from "react-icons/fa";
import { GrMysql } from "react-icons/gr";
import { SiRedis } from "react-icons/si";

const skills = () => {

    const skills = [
        {
            name: "JavaScript",
            icon: <IoLogoJavascript />
        },
        {
            name: "TypeScript",
            icon: <SiTypescript />
        },
        {
            name: "Golang",
            icon: <FaGolang />
        },
        {
            name: "Java",
            icon: <FaJava />
        },
        {
            name: "React",
            icon: <FaReact />
        },
        {
            name: "Next.js",
            icon: <SiNextdotjs />
        },
        {
            name: "Node.js",
            icon: <FaNode />
        },
        {
            name: "Git",
            icon: <FaGitAlt />
        },
        {
            name: "Docker",
            icon: <FaDocker />
        },
        {
            name: "MySQL",
            icon: <GrMysql />
        },
        {
            name: "Redis",
            icon: <SiRedis />
        }
    ]

    return (
        <div className="w-full">
            <div className="w-full py-5">
                <p className="text-text-primary text-[1.2rem] font-bold">Skills</p>
            </div>
            <div className="w-full flex flex-wrap items-center justify-between">
                {skills.map((skill, index) => (
                    <div 
                        key={index}
                        className="w-fit  relative group cursor-pointer"
                    >
                        <div className="w-fit text-[2rem] text-text-secondary hover:text-text-primary transition-colors">
                            {skill.icon}
                        </div>
                        <p className="text-text-secondary text-[.8rem] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-full left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap">
                            {skill.name}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default skills