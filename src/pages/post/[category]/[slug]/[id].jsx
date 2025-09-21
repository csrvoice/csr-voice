import { Layout } from "@/components/Layout/Layout";
import { PostPage } from "@/components/Post/PostPage";
import { RelatedNews } from "@/components/Post/RelatedNews";
import { API_URL, INIT_URI } from "@/constant";
import { useDecodeHtml } from "@/hooks/useDecodeHtml";
import axios from "axios";
import Head from "next/head";
import React from "react";
import { parseStringPromise } from "xml2js";

const Index = ({ post, rssItems, categroy }) => {
  const title = useDecodeHtml(post?.data?.title);
  const excerpt = useDecodeHtml(post?.data?.excerpt);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <link rel="icon" href="/shyna.ico" />
        <meta
          http-equiv="Content-Type"
          content="text/html; charset=utf-8"
        ></meta>

        <meta property="og:site_name" content="Shyna" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta name="description" content={excerpt || title} />
        <meta property="og:description" content={excerpt || title} />
        <link
          rel="canonical"
          href={`${INIT_URI}/post/${post?.data?.categories[0]?.slug}/${post?.data?.slug}/${post?.data?.id}`}
        />
        <meta
          name="tweetmeme-title"
          content={`${INIT_URI}/post/${post?.data?.categories[0]?.slug}/${post?.data?.slug}/${post?.data?.id}`}
        />

        <meta
          name="image"
          property="og:image"
          content={post?.data?.featured_image}
        />

        <meta name="title" content={title} />
        <meta name="twitter:image" content={post?.data?.featured_image} />

        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="675" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content={title} />
        <meta
          property="og:url"
          content={`${INIT_URI}/post/${post?.data?.categories[0]?.slug}/${post?.data?.slug}/${post?.data?.id}`}
        />
        <meta
          property="article:published_time"
          content={post?.data?.date_gmt}
        />
        <meta
          property="article:modified_time"
          content={post?.data?.modified_gmt}
        />
        <meta itemprop="name" content={title} />
        <meta itemprop="description" content={excerpt || title} />
      </Head>
      <Layout marqueeData={rssItems}>
        <PostPage post={post?.data} />
        <RelatedNews catName={categroy} />
      </Layout>
    </>
  );
};

export async function getServerSideProps({ query }) {
  try {
    // Fetch custom posts from your CMS
    const postsResponse = await axios.get(
      `${API_URL}/wp-json/custom/v1/posts/${query?.slug}`
    );

    // Fetch RSS feed from TOI
    const rssResponse = await axios.get(
      "https://timesofindia.indiatimes.com/rssfeedstopstories.cms"
    );

    const parsedRSS = await parseStringPromise(rssResponse.data, {
      explicitArray: false,
    });

    const rssItems = parsedRSS?.rss?.channel?.item?.slice(0, 5) || [];

    return {
      props: {
        post: postsResponse.data,
        rssItems,
        error: null,
        categroy: query?.category,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        posts: [],
        rssItems: [],
        error: "Failed to fetch data",
        categroy: "",
      },
    };
  }
}

export default Index;
