import { Link, useLoaderData } from "react-router-dom";

export default function Posts() {
  const postData = useLoaderData();
  console.log(postData);
  return (
    <>
      <div className="container">
        <h1 className="page-title">Posts</h1>
        <div className="card-grid">
          {postData.map((post) => (
            <div className="card" key={post.id}>
              <div className="card-header">{post.title}</div>
              <div className="card-body">
                <div className="card-preview-text">{post.body}</div>
              </div>
              <div className="card-footer">
                <Link className="btn" to={`/posts/${post.id}`}>
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      ;
    </>
  );
}
