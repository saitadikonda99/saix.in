import Link from "next/link"

const Navbar = () => {
  return (
    <div className="w-full">
      <h1 className="text-[1.6rem] font-bold text-text-primary">Sai Tadikonda</h1>
      <p className="text-text-secondary mt-1">Full-Stack Developer</p>
      <div className="mt-3 flex items-center gap-4">
        <Link
          href="https://drive.google.com/file/d/19JVRbP53htxUW6oULB_aI7XLyJjX43Te"
          target="_blank"
          rel="noopener noreferrer"
          className="hl-link text-text-secondary text-sm"
        >
          resume ↗
        </Link>
      </div>
    </div>
  )
}

export default Navbar
