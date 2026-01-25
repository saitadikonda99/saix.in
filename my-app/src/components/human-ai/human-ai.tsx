"use client";
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


const HumanAI = () => {

  const pathname = usePathname();
  const isHuman = pathname === '/';
  const isMachine = pathname === '/ai';

  return (
        <div className="w-full fixed bottom-[1.5rem] z-50 flex items-center justify-center">
            <div className="bg-[#484b4d] rounded-[5px] px-2 py-1 flex items-center justify-center gap-4">
                <Link 
                    href="/"
                    className='w-fit flex items-center justify-center gap-1.5'
                >
                    <span className='w-[10px] h-[10px] border-1 border-white rounded-full flex items-center justify-center'>
                        <span className={`w-[5px] h-[5px] rounded-full ${isHuman ? 'bg-white' : 'bg-[#484b4d]'}`} /></span>
                    <span className="w-fit text-white">HUMAN</span>
                </Link>
                 <Link 
                    href="/ai"
                    className='w-fit flex items-center justify-center gap-1.5'
                >
                    <span className='w-[10px] h-[10px] border-1 border-white rounded-full flex items-center justify-center'>
                        <span className={`w-[5px] h-[5px] rounded-full ${isMachine ? 'bg-white' : 'bg-[#484b4d]'}`} /></span>
                    <span className="w-fit text-white">MACHINE</span>
                </Link>
            </div>
        </div>
    );
};

export default HumanAI;