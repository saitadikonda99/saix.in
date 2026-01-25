import React from "react"
import Link from "next/link"

const Navbar = () => {
  return (
    <div className="relative my-4">

      <div className="absolute top-0 left-0 w-3 h-3 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-orange" />
        <div className="absolute top-0 left-0 h-full w-px bg-orange" />
      </div>

      <div className="absolute top-0 right-0 w-3 h-3 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-px bg-orange" />
        <div className="absolute top-0 right-0 h-full w-px bg-orange" />
      </div>

      <div className="absolute bottom-0 left-0 w-3 h-3 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-px bg-orange" />
        <div className="absolute bottom-0 left-0 h-full w-px bg-orange" />
      </div>

        <div className="absolute bottom-0 right-0 w-3 h-3 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-full h-px bg-orange" />
        <div className="absolute bottom-0 right-0 h-full w-px bg-orange" />
      </div>

      <div className="w-full bg-background px-4 py-1 flex items-center justify-between">
        <div className="w-fit">
          <h1 className="font-michroma font-[900] text-[1rem] text-text-primary sm:text-[1.4rem]">
            Sai Tadikonda
          </h1>
        </div>

        <div className="w-fit flex items-center justify-between gap-6 px-4 py-2">
          <div className="w-fit items-center justify-center gap-4 hidden sm:flex">
            <Link href="/" className="text-text-secondary text-sm hover:text-text-primary transition-all duration-300">Work</Link>
            <Link href="/" className="text-text-secondary text-sm hover:text-text-primary transition-all duration-300">Projects</Link>
            <Link href="/" className="text-text-secondary text-sm hover:text-text-primary transition-all duration-300">Blogs</Link>
          </div>

          <div className="w-fit flex items-center gap-4">
            <button className="bg-button-primary text-white px-4 py-2 rounded-md sm:block hidden">CONTACT</button>
            <button className="bg-orange text-white px-4 py-2 rounded-md">RESUME</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Navbar