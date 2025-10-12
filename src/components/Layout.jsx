import { useRef, useEffect, useState } from "react";
import Menu from "./Menu";

export default function Layout({ children }) {
  const menuRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!menuRef.current) return;

    // Função que atualiza o padding-top conforme a altura do menu
    const updateOffset = () => {
      if (menuRef.current) {
        setOffset(menuRef.current.offsetHeight);
      }
    };

    // Cria o observer para reagir a mudanças na altura
    const observer = new ResizeObserver(updateOffset);
    observer.observe(menuRef.current);

    // Mede imediatamente na primeira montagem
    updateOffset();

    // Cleanup
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Menu ref={menuRef} />
      <main style={{ paddingTop: offset, transition: "padding-top 0.3s ease" }}>
        {children}
      </main>
    </>
  );
}
