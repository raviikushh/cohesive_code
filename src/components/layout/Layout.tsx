import React from "react";

function Layout({ children }) {
  return <div className="p-4 flex flex-col gap-4">{children}</div>;
}

export default Layout;
