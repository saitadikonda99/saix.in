import React from 'react'
import { Github, Linkedin, Instagram, X, Mail } from 'lucide-react'
import Link from 'next/link'

const Social = () => {
  return (
    <div className="w-full">
      <div className="w-full flex flex-col items-center justify-between gap-4">
        <div className="w-full">
          <div className="w-full flex items-center justify-center gap-6">
            <Link 
              href="https://github.com/saitadikonda99" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-text-primary hover:text-text-primary transition-all duration-300"
            >
              <Github size={20} />
            </Link>
            <Link 
              href="https://linkedin.com/in/tadikondasaimanikanta" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-text-primary hover:text-text-secondary transition-all duration-300"
            >
              <Linkedin size={20} />
            </Link>
            <Link 
              href="https://instagram.com/saixdotin" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-text-primary hover:text-text-secondary transition-all duration-300"
            >
              <Instagram size={20} />
            </Link>
            <Link 
              href="https://x.com/sai_tadikonda_" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-text-primary hover:text-text-secondary transition-all duration-300"
            >
              <X size={20} />
            </Link>
            <Link 
              href="mailto:saitadikonda.dev@gmail.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-text-primary hover:text-text-secondary transition-all duration-300"
            >
              <Mail size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Social