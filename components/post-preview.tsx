import Avatar from './avatar'
import DateFormatter from './date-formatter'
import MainImage from './cover-image'
import Link from 'next/link'
import Author from '../types/author'
import { usePreviewSubscription, urlFor, PortableText } from '../lib/sanity'

type Props = {
  title: string
  mainImage: string
  date: string
  excerpt: string
  author: Author
  slug: string
  preview: boolean
}

const PostPreview = ({ title, mainImage, date, excerpt, slug }: Props) => {
  return (
    <div className="mx-5 my-10">
      <div className="mb-5">
        <MainImage preview={false} slug={slug} title={title} src={mainImage} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link as={`/blog/${slug}`} href="/blog/[slug]">
          <a className="hover:underline text-3xl font-semibold">{title}</a>
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">
        <PortableText blocks={excerpt} />
      </p>
    </div>
  )
}

export default PostPreview
