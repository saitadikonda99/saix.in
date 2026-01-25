import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        
        const About =  "I'm Tadikonda Sai Manikanta, a Full-Stack Developer passionate about crafting high-performance, scalable web applications. With expertise in Next.js, React, and Node.js, I specialize in building seamless digital experiences and optimizing system performance for real-world impact.";

        return NextResponse.json([About], { status: 200 });
    } catch (error: any | unknown) {
        return NextResponse.json({ message: "Error", error: error?.message || "Internal Server Error" }, { status: 500 });
    }
}