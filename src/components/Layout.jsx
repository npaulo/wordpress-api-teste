import { Outlet } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import Menu from "./Menu";

export default function Layout() {
  const menuRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!menuRef.current) return;
    const updateOffset = () => setOffset(menuRef.current.offsetHeight);
    const observer = new ResizeObserver(updateOffset);
    observer.observe(menuRef.current);
    updateOffset();
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Menu ref={menuRef} />
      <main style={{ paddingTop: offset, transition: "padding-top 0.3s ease" }}>
        <Outlet />
      </main>
    </>
  );
}
