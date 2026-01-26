import React from 'react'
import { aboutData } from '@/data/about'

const about = () => {
    return (
        <div className="w-full border-r-1 border-l-1 border-border-ai px-4 py-1">
            <p className="text-white text-[.8rem]">## ABOUT</p>
            <p className="text-green-400">
                $ curl https://saix.in/api/about
            </p>
            <p className="text-white pl-4">
                {JSON.stringify(aboutData, null, 20)}
            </p>
        </div>
    )
}

export default about    