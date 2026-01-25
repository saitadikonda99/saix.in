import React from 'react'

import Navbar from '@/components/ai/navbar/navbar'

const page = () => {
  return (
    <div className="w-full bg-[#1a1a1a] text-white py-2">
        <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] mx-auto py-2 sm:py-4 px-4 sm:px-0 flex flex-col items-start justify-center gap-15">
            <Navbar />
        </div>
    </div>
  )
}

export default page