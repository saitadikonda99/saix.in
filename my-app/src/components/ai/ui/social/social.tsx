import React from 'react'
import { socialLinks } from '@/data/social'

const social = () => {
    return (
        <div className="w-full border-r-1 border-l-1 border-border-ai px-4 py-1">
            {socialLinks.map((link) => (
                <p key={link.label} className="bg-white text-black my-1">
                    [{link.label}]({link.url})
                </p>
            ))}
        </div>
    )
}

export default social