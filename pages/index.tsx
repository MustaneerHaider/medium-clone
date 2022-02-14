import Head from 'next/head'
import { GetStaticProps } from 'next'
import Banner from '../components/Banner'
import Header from '../components/Header'
import { sanityClient } from '../lib/client'
import { Post as BlogPost } from '../models/models'
import Post from '../components/Post'
import { useEffect, useState } from 'react'

interface Props {
  posts: BlogPost[]
}

export default function Home({ posts }: Props) {
  const [show, setShow] = useState(false)

  function handleShow() {
    if (window.scrollY > 300) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleShow)
    return () => window.removeEventListener('scroll', handleShow)
  }, [])

  return (
    <>
      <Head>
        <title>Medium Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header show={show} />
      <Banner />

      <section
        className="mx-5 grid max-w-6xl grid-cols-1 gap-4
      py-4 pt-5 sm:grid-cols-2 lg:mx-auto lg:grid-cols-3"
      >
        {posts.map(({ _id, slug, title, author, description, mainImage }) => (
          <Post
            key={_id}
            _id={_id}
            title={title}
            slug={slug}
            author={author}
            description={description}
            mainImage={mainImage}
          />
        ))}
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const posts = await sanityClient.fetch(
    `
      *[_type == "post"] | order(publishedAt desc){
        _id,
        title,
        description,
        author->{
          name,
          image
        },
        slug,
        mainImage
      }
    `
  )

  return {
    props: {
      posts,
    },
    revalidate: 60,
  }
}
