import React from 'react'

const navbar = () => {
  return (
        <div className="w-full bg-[#1a1a1a] sticky top-0 z-50 border-r-1 border-l-1 border-border-ai px-4 py-1">
            <div className="">
                <p>SAI TADIKONDA</p>
            </div>
            <div className="pt-2 flex flex-col items-start justify-start">
                <p>Navigation Links</p>
                <p>[skills](https://saix.in/#skills)</p>
                <p>[projects](https://saix.in/#projects)</p>
                <p>[blogs](https://saix.in/#blogs)</p>
                <button className="bg-white text-black my-1">[social](https://saix.in/#social)</button>
                <button className="bg-white text-black my-1">[resume](https://saix.in/#resume)</button>
            </div>
        </div>
  )
}

export default navbar