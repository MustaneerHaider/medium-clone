import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Props {
  show: boolean
}

function Header({ show }: Props) {
  return (
    <header
      className={`sticky top-0 z-50 border-b border-black 
    ${!show ? 'bg-blue-200' : 'bg-white'} transition-all duration-150`}
    >
      <div
        className="mx-5 flex max-w-6xl items-center 
      justify-between py-3 lg:mx-auto"
      >
        {/* Left */}
        <Link href="/">
          <div className="relative h-10 w-36 cursor-pointer">
            <Image src="/medium.png" layout="fill" objectFit="contain" />
          </div>
        </Link>

        {/* Right */}
        <div className="flex items-center space-x-4">
          <p className="link">Our Story</p>
          <p className="link">Membership</p>
          <p className="link">Write</p>
          <p className="hidden text-sm sm:inline-flex">Sign In</p>

          <button
            className={`rounded-full ${
              !show ? 'bg-black' : 'bg-green-600'
            } py-2 px-4
          text-sm text-white`}
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
