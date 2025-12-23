import Link from "next/link";
import data from "../data.json";

export async function getStaticProps() {
  return {
    props: {
      posts: data
    }
  };
}

export default function PagesBlogIndex({ posts }) {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Pages Router Blog (SSG)</h1>
      <p>This index is built with getStaticProps.</p>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
