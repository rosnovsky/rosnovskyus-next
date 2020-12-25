// @ts-nocheck
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import ReactPlayer from 'react-player/file'
import Youtube from 'react-player/youtube'
import Figure from './figure'
import Code from './code'
import { getClient } from './sanity'
import DateFormatter from '../components/date-formatter'
import dynamic from 'next/dynamic'
import { groq } from 'next-sanity'

const InternalLinkQuery = groq`
  *[_type == "post" && _id == $ref]{
    "slug": slug.current
  }
`

const ReactTinyLink = dynamic(
  () => import('react-tiny-link').then((mod) => mod.ReactTinyLink),
  { ssr: false }
)

export function getBlogUrl(date: string, slug: Record<string, string>) {
  return ``
}

const serializers = {
  marks: {
    internalLink: ({ mark, children }: { mark: any; children: any }) => {
      const [slug, setSlug] = useState('/')

      useEffect(async () => {
        const fetchSlug = async () => {
          const slug = await getClient()
            .fetch(InternalLinkQuery, {
              ref: mark.reference._ref,
            })
            .then((result) => {
              console.log(result)
              const { slug } = result[0]
              const href = `${slug}`
              setSlug(href)
              return href
            })
          return slug
        }
        const data = await fetchSlug()
        return data
      }, [])

      return <Link href={slug}>{children[0]}</Link>
    },
    link: ({ mark, children }: { mark: any; children: any }) => {
      const { blank, href } = mark
      return blank ? (
        <a href={href} target="_blank" rel="noopener">
          {children}
        </a>
      ) : (
        <a href={href}>{children}</a>
      )
    },
  },
  types: {
    mainImage: Figure,
    code: Code,

    // Youtube component could be replaced with ReactPlayer, removing 2 dependencies (YouTube and getYoutubeId)
    youtube: ({ node }: any) => {
      const { url } = node
      // const id = getYouTubeId(url)
      return (
        <div className="w-full">
          <Youtube
            url={url}
            className="youtubeContainer"
            autoPlay={false}
            pip
            width="100%"
          />
          {/* <YouTube containerClassName={'youtubeContainer'} videoId={id} /> */}
        </div>
      )
    },
    mux: (props: any) => {
      // TODO: Fix this bullshit
      const [asset, setAsset] = useState()

      const query = `*[_type == "post" && body[]._type =="mux" ]{
        "asset": *[asset._id == "${props.node.asset._ref}"]{...}
      }`

      useEffect(() => {
        getClient(false)
          .fetch(query)
          .then((video) => setAsset(video[0].asset[0].playbackId))
      }, [])

      return (
        <ReactPlayer
          url={`https://stream.mux.com/${asset}.m3u8`}
          autoPlay={false}
          pip
          width="100%"
          // height={'auto'}
        />
      )
    },
    linkCard: ({ node }: any) => {
      return (
        <div>
          <ReactTinyLink
            cardSize="small"
            showGraphic={true}
            maxLine={4}
            minLine={1}
            loadSecureUrl={false}
            autoPlay={false}
            url={node.href}
            defaultMedia={'https://rosnovsky.us/favicon.png'}
          />
        </div>
      )
    },
  },
}

export default serializers
