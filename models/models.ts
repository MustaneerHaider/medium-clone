export interface Post {
  _id: string
  title: string
  description: string
  body?: string
  publishedAt?: string
  author: {
    name: string
    image: object
  }
  slug: {
    current: string
  }
  mainImage: object
  comments?: { comment: string; name: string; _id: string }[]
}
