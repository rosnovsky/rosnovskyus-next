import Image from 'next/image'
import { urlFor } from './sanity'

export const Figure = (props: any) => {
  const { asset } = props.node

  if (!asset) {
    return null
  }

  if (asset.extension === 'gif') {
    return (
      <figure>
        <Image
          src={
            urlFor(asset).maxWidth(1000).maxHeight(1000).url() || 'default.jpg'
          }
          alt={props.alt}
          loading="lazy"
          width={900}
          height={900}
          objectFit="cover"
          objectPosition="50% 50%"
          layout="responsive"
          className="w-full"
        />
        <figcaption>{props.alt}</figcaption>
      </figure>
    )
  }

  return (
    <div className="container max-h-120">
      <figure className="">
        <Image
          src={
            urlFor(asset)
              .width(900)
              .height(900)
              .format('jpg')
              .quality(80)
              .fit('crop')
              .url() || 'default.jpg'
          }
          loading="lazy"
          objectFit="cover"
          objectPosition="50% 50%"
          layout="responsive"
          quality={80}
          width={900}
          height={900}
          alt={props.title}
        />
        <figcaption>{props.alt}</figcaption>
      </figure>
    </div>
  )
}

export default Figure
