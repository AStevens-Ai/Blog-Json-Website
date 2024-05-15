import { Outlet } from "react-router-dom";

export function PostLoading() {
  return (
    <>
      <div className="loading-spinner"></div>
      <Outlet />
      <div className="container loading"></div>
    </>
  );
}
