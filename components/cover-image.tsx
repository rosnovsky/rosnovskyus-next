import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import { usePreviewSubscription, urlFor, PortableText } from '../lib/sanity'

const MainImage = ({ title, src, slug, preview }: any) => {
  const image = (
    <Image
      src={
        urlFor(src.asset).format('webp').maxWidth(1860).maxHeight(1000).url() ||
        'default.jpg'
      }
      width={preview ? 840 : 1860}
      height={preview ? 344 : 1000}
      alt={`Cover Image for ${title}`}
      layout={'responsive'}
      className={cn('object-cover shadow-small', {
        'hover:shadow-medium object-cover transition-shadow duration-200': slug,
      })}
    />
  )
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}

export default MainImage
