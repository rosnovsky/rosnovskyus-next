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
    mainImage,
    categories[]->{
      _id,
      title
    },
    "slug": slug.current
  }
`

const Index = ({ data }: any) => {
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
          {/* {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )} */}
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
