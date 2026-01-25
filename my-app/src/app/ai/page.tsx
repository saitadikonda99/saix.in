import React from 'react'

import Navbar from '@/components/ai/navbar/navbar'
import About from '@/components/ai/ui/about/about'
import Social from '@/components/ai/ui/social/social'
import Skills from '@/components/ai/ui/skills/skills'

const page = () => {
  return (
    <div className="w-full bg-[#1a1a1a] text-white py-2">
        <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] mx-auto py-2 sm:py-4 px-4 sm:px-0 flex flex-col items-start justify-center gap-15">
            <Navbar />
            <About />
            <Social />
            <Skills />
        </div>
    </div>
  )
}

export default page