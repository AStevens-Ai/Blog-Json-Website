import {
  createBrowserRouter,
  Outlet,
  ScrollRestoration,
  useNavigation,
  useRouteError,
} from "react-router-dom";
import Posts from "./pages/Posts";
import Users from "./pages/Users";
import Todos from "./pages/Todos";
import Navbar from "./Navbar";
import User from "./pages/User";
import Post from "./pages/Post";

export const router = createBrowserRouter([
  {
    element: <NavLayout />,
    children: [
      {
        path: "/",

        children: [
          {
            errorElement: <ErrorPage />,
            children: [
              {
                path: "/users",
                children: [
                  {
                    index: true,
                    loader: ({ request: { signal } }) => {
                      return fetch("http://localhost:3000/users", { signal });
                    },
                    element: <Users />,
                  },
                  {
                    path: ":userId",
                    loader: async ({
                      params: { userId },
                      request: { signal },
                    }) => {
                      const userResponse = fetch(
                        `http://localhost:3000/users/${userId}`,
                        {
                          signal,
                        }
                      );
                      const postResponse = fetch(
                        `http://localhost:3000/posts?userId=${userId}`,
                        { signal }
                      );

                      const todoResponse = fetch(
                        `http://localhost:3000/todos?userId=${userId}`,
                        { signal }
                      );
                      const user = await userResponse.then((res) => res.json());
                      const post = await postResponse.then((res) => res.json());
                      const todo = await todoResponse.then((res) => res.json());

                      return { user, post, todo };
                    },
                    element: <User />,
                  },
                ],
              },
              {
                path: "/todos",
                loader: ({ request: { signal } }) => {
                  return fetch("http://localhost:3000/todos", { signal });
                },
                element: <Todos />,
              },
            ],
          },
          {
            index: true,
            element: <Posts />,
            loader: ({ request: { signal } }) => {
              return fetch("http://localhost:3000/posts", { signal });
            },
          },
          {
            path: "/posts/:postId",
            loader: async ({ params: { postId }, request: { signal } }) => {
              try {
                const postResponse = fetch(
                  `http://localhost:3000/posts/${postId}`,
                  {
                    signal,
                  }
                );
                const commentsResponse = fetch(
                  `http://localhost:3000/posts/${postId}/comments`,
                  {
                    signal,
                  }
                );
                const post = await postResponse.then((res) => res.json());
                const comments = await commentsResponse.then((res) =>
                  res.json()
                );

                const userId = post.userId;

                const userResponse = fetch(
                  `http://localhost:3000/users/${userId}`
                );
                const user = await userResponse.then((res) => res.json());

                return { comments, post, user };
              } catch (err) {
                console.error("Error loading post", err);
                throw err;
              }
            },
            element: <Post />,
          },
          {
            path: "*",
            element: <h1>Error- Page not found</h1>,
          },
        ],
      },
    ],
  },
]);
function NavLayout() {
  const { state } = useNavigation();

  const isLoading = state === "loading";
  return (
    <>
      <Navbar />
      <ScrollRestoration />
      {isLoading && <div className="loading-spinner" />}
      <div className={`container ${isLoading ? "loading" : ""}`}>
        <Outlet />
      </div>
    </>
  );
}

function ErrorPage() {
  const error = useRouteError();

  return (
    <>
      <h1>Error - Something went wrong</h1>
      {import.meta.env.MODE !== "production" && (
        <>
          <pre>{error.message}</pre>
          <pre>{error.stack}</pre>
        </>
      )}
    </>
  );
}
