import Image from 'next/image'

function Banner() {
  return (
    <div className="border-b border-black bg-blue-200 py-8 lg:py-0">
      <div
        className="mx-5 flex max-w-6xl items-center 
      justify-between lg:mx-auto"
      >
        {/* Left */}
        <div className="max-w-lg">
          <h1 className="font-serif text-5xl lg:text-6xl">
            <span className="underline decoration-black decoration-4">
              Medium
            </span>{' '}
            is a place to write, read, and connect
          </h1>

          <p className="mt-2 font-semibold">
            It's easy and free to post your thinking on any topic and connect
            with millions of readers.
          </p>

          <button
            className="mt-5 rounded-full border
          border-black bg-white py-2 px-4"
          >
            Start Writing
          </button>
        </div>

        {/* Right */}
        <img
          src="/medium2.png"
          className="hidden cursor-pointer md:inline-flex md:h-32 lg:h-full"
        />
      </div>
    </div>
  )
}

export default Banner
