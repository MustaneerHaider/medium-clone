import { GetStaticPaths, GetStaticProps } from 'next'
import { Fragment, useState } from 'react'
import Header from '../../components/Header'
import { sanityClient, urlFor, BlockContent } from '../../lib/client'
import { Post } from '../../models/models'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import Input from '../../components/Input'

const validationSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  comment: yup.string().required().min(5),
})

interface Props {
  post: Post
}

function Post({ post }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setLoading] = useState(false)

  async function handleSubmit(values: {
    name: string
    email: string
    comment: string
  }) {
    if (isLoading) {
      return
    }

    try {
      setLoading(true)
      await fetch(`/api/comment/${post._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          comment: values.comment,
        }),
      }).then((res) => res.json())
      setSubmitted(true)
      setLoading(false)
    } catch (err) {
      alert(err)
      setSubmitted(false)
      setLoading(false)
    }
  }

  return (
    <Fragment>
      <Header show />

      <img
        src={urlFor(post.mainImage).url()!}
        className="h-36 w-full object-cover"
      />

      <section
        className="mx-5 mt-10 max-w-lg border-b-2 border-blue-500 pb-4 
      md:mx-auto"
      >
        <h4 className="text-3xl font-semibold">{post.title}</h4>

        <p className="mt-2 text-xl italic text-gray-600">{post.description}</p>

        <div className="mt-2 flex items-center">
          <img
            src={urlFor(post.author.image).url()!}
            className="h-12 w-12 cursor-pointer rounded-full"
          />
          <p className="ml-1.5 text-sm text-gray-600">
            Blog Post by{' '}
            <span className="text-blue-400">{post.author.name}</span>
            {' - '}
            Published at {new Date(post.publishedAt!).toLocaleString()}
          </p>
        </div>

        <div className="mt-10">
          <h1 className="mb-2 text-2xl font-semibold italic">
            What have you got to say!
          </h1>
          <BlockContent blocks={post.body} />
        </div>
      </section>

      <section className="mx-5 mt-8 max-w-lg pb-10 md:mx-auto">
        {submitted ? (
          <div
            className="relative rounded-md bg-blue-400
          p-5 text-white"
          >
            <span
              className="absolute top-0 right-2 transform cursor-pointer
            text-lg font-semibold transition duration-100 ease-out 
            hover:scale-125"
              onClick={() => setSubmitted(false)}
            >
              x
            </span>
            <h3 className="text-2xl font-bold">
              Thanks for submitting your comment.
            </h3>
            <h4 className="text-lg font-semibold">
              Your comment will appear below once approved.
            </h4>
          </div>
        ) : (
          <Fragment>
            <h3 className="mt-3 mb-1 font-semibold text-blue-400">
              Enjoyed this article?
            </h3>
            <h2 className="mb-3 text-3xl font-bold">Leave a Comment below!</h2>
            <Formik
              validationSchema={validationSchema}
              initialValues={{
                name: '',
                email: '',
                comment: '',
              }}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form>
                  <Input name="name" label="Name" type="text" />
                  <Input name="email" label="Email Address" type="email" />
                  <Input name="comment" label="Comment" textArea />
                  <button
                    className="mt-5 w-full rounded-sm bg-blue-400 p-2
              ring-blue-700 active:ring-2 md:hover:bg-blue-500"
                    type="submit"
                  >
                    {isLoading ? 'Submitting...' : 'Submit'}
                  </button>
                </Form>
              )}
            </Formik>
          </Fragment>
        )}

        {/* comments */}
        <div className="mt-10 rounded-sm bg-white p-5 shadow shadow-blue-400">
          <h1
            className="mb-4 border-b border-blue-200 pb-2
          text-2xl font-semibold"
          >
            Comments
          </h1>
          {post.comments?.map(({ _id, name, comment }) => (
            <div className="my-1 flex items-center text-sm" key={_id}>
              <h2 className="truncate font-semibold text-blue-400">{name}</h2>
              <p className="ml-2 truncate">{comment}</p>
            </div>
          ))}
        </div>
      </section>
    </Fragment>
  )
}

export default Post

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await sanityClient.fetch(
    `
      *[_type == "post"]{
        "slug": slug.current
      }
    `
  )

  const paths = posts.map((post: { slug: string }) => ({
    params: {
      slug: post.slug,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await sanityClient.fetch(
    `
    *[_type == "post" && slug.current == $slug]{
      _id,
      title,
      description,
      publishedAt,
      body,
      mainImage,
      "comments": *[_type == "comment" && 
                   post._ref == ^._id &&
                   approved == true]{
        _id,
        name,
        comment
      },
      author-> {
        name,
        image
      }
    }[0]
  `,
    { slug: params?.slug }
  )

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
    },
  }
}
