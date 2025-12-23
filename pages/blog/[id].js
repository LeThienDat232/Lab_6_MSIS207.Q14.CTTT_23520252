import { useRouter } from "next/router";
import data from "../../data.json";

export async function getStaticPaths() {
  const paths = data.map((post) => ({
    params: { id: post.id }
  }));

  return {
    paths,
    fallback: true
  };
}

export async function getStaticProps({ params }) {
  const post = data.find((p) => p.id === params.id) || null;

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      post
    }
  };
}

export default function BlogPostPage({ post }) {
  const router = useRouter();

  if (router.isFallback) {
    return <p style={{ padding: "2rem" }}>Loading...</p>;
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>
        <a href="/">Back to index</a>
      </p>
    </div>
  );
}
