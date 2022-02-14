import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '../lib/client'
import { Post as Props } from '../models/models'

function Post({ title, slug, description, mainImage, author }: Props) {
  return (
    <Link href={`/post/${slug.current}`}>
      <article className="rounded-lg border">
        <div className="overflow-hidden rounded-t-lg ">
          <img
            src={urlFor(mainImage).url()!}
            alt=""
            className="h-60 w-full transform cursor-pointer rounded-t-lg object-cover
          transition duration-200 ease-in-out md:hover:scale-105"
          />
        </div>

        <h4 className="pt-1.5 pl-4 font-semibold">{title}</h4>

        <div className="flex items-center justify-between px-4 pb-1">
          <p className="truncate text-xs">{description}</p>
          <Image
            src={urlFor(author.image).url()!}
            width={30}
            height={30}
            className="cursor-pointer rounded-full"
          />
        </div>
      </article>
    </Link>
  )
}

export default Post
