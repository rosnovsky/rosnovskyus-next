import Author from './author'

type PostType = {
  slug: string
  title: string
  date: string
  mainImage: string
  author: Author
  excerpt: any
  ogImage: {
    url: string
  }
  body: any
  preview: boolean
}

export default PostType
