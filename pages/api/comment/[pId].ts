import type { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from '../../../lib/sanity'

interface Data {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { pId } = req.query
  const { name, email, comment } = req.body

  try {
    await sanityClient.create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: pId,
      },
      name,
      email,
      comment,
    })
  } catch (err) {
    return res.status(400).json({ message: 'Could not submit the comment!' })
  }

  return res.status(201).json({ message: 'Comment submitted!!' })
}
