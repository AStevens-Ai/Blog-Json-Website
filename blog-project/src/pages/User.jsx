import { Link, useLoaderData } from "react-router-dom";

export default function User() {
  const { user, post, todo } = useLoaderData();
  console.log(user);

  return (
    <>
      <Link to=".." relative="path" className="btn backBtn top-left">
        Go Back
      </Link>

      <div className="container">
        <>
          <h1 className="page-title">{user.name}</h1>
          <div className="page-subtitle">{user.email}</div>
          <div>
            <b>Company:</b> {user.company.name}
          </div>
          <div>
            <b>Website:</b> {user.website}
          </div>
          <div>
            <b>Address:</b> {user.address.street}, {user.address.suite},
            {user.address.city}, {user.address.zipcode}
          </div>
          <h3 className="mt-4 mb-2">Posts</h3>
          <div className="card-grid">
            {post.map((p) => (
              <div className="card" key={p.id}>
                <div className="card-header">{p.title}</div>
                <div className="card-body">
                  <div className="card-preview-text">{p.body}</div>
                </div>
                <div className="card-footer">
                  <Link className="btn" to={`/posts/${p.id}`}>
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <h3 className="mt-4 mb-2">Todos</h3>
          <ul>
            {todo.map((t) => (
              <li
                key={t.id}
                className={t.completed ? "strike-through" : undefined}
              >
                {t.title}
              </li>
            ))}
          </ul>
        </>
      </div>
    </>
  );
}
