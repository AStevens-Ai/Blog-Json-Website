import { useLoaderData } from "react-router-dom";

export default function Todos() {
  const todos = useLoaderData();
  console.log(todos);
  return (
    <>
      <div className="container">
        <h1 className="page-title">Todos</h1>
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={todo.completed ? "strike-through" : undefined}
            >
              {todo.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
