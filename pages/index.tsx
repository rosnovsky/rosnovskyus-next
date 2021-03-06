import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Head from 'next/head'
import Post from '../types/post'
import { groq } from 'next-sanity'
import { getClient } from '../lib/sanity'

const postQuery = groq`
  *[_type == "post"] {
    _id,
    title,
    body,
    excerpt,
    featured,
    publishedAt,
    mainImage,
    categories[]->{
      _id,
      title
    },
    "slug": slug.current
  } | order(publishedAt desc)
`

const Index = ({ data }: any) => {
  const featuredPost = data.posts.filter((post: any) => post.featured === true)

  const randomFeaturedPostIndex = Math.floor(
    Math.random() * featuredPost.length
  )

  const randomFeaturedPost = featuredPost[randomFeaturedPostIndex]
  return (
    <>
      <Layout>
        <Head>
          <title>Rosnovsky Park</title>
          <link
            rel="preload"
            href="https://api.covidtracking.com/v1/us/current.json"
            as="fetch"
            crossOrigin="anonymous"
          />
          <script
            src="https://llama.rosnovsky.us/script.js"
            data-site="UHVHKTPD"
            honor-dnt="true"
            excluded-domains="rosnovskyus.vercel.app,localhost"
            defer
          ></script>
        </Head>
        <Container>
          <Intro />
          {featuredPost && (
            <HeroPost
              title={randomFeaturedPost.title}
              mainImage={randomFeaturedPost.mainImage}
              date={randomFeaturedPost.publishedAt}
              slug={randomFeaturedPost.slug}
              excerpt={randomFeaturedPost.excerpt}
            />
          )}
          <MoreStories posts={data.posts} />
        </Container>
      </Layout>
    </>
  )
}

export default Index

export async function getStaticProps({ preview = false }) {
  const posts = await getClient(preview).fetch(postQuery)
  return {
    props: {
      preview,
      data: { posts },
    },
  }
}
