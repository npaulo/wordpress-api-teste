import { useEffect, useState, useRef } from "react";
import { getPages } from "../api/wordpress";
import { Menu as MenuIcon, X as CloseIcon } from "lucide-react";

export default function Menu() {
  const [menu, setMenu] = useState([]);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Fechar menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Obter páginas do WordPress e estruturar hierarquia
  useEffect(() => {
    getPages().then((pages) => {
      const map = new Map();
      pages.forEach((p) => map.set(p.id, { ...p, children: [] }));

      const roots = [];
      pages.forEach((p) => {
        if (p.parent && map.has(p.parent)) {
          map.get(p.parent).children.push(map.get(p.id));
        } else if (p.parent === 0) {
          roots.push(map.get(p.id));
        }
      });

      setMenu(roots);
    });
  }, []);

  return (
    <nav ref={menuRef} className="bg-primary text-neutral shadow-md relative">
      {/* Overlay com blur e fade */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40 md:hidden transition-opacity duration-300 opacity-100"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Header + botão mobile */}
      <div className="flex items-center justify-between px-6 py-4 md:px-10 relative z-50">
        <a href="/" className="font-sans font-semibold text-xl">
          Pais Coragem
        </a>
        <button
          className="md:hidden text-neutral"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <CloseIcon size={28} /> : <MenuIcon size={28} />}
        </button>
      </div>

      {/* Menu principal */}
      <ul
        className={`animate-slide-down overflow-hidden md:overflow-visible transition-all duration-500 ease-in-out
          ${
            open
              ? "max-h-[600px] opacity-100 z-50 relative"
              : "max-h-0 opacity-0 md:max-h-none md:opacity-100"
          }
          md:flex md:items-center md:gap-8 px-6 pb-4 md:px-10 md:pb-0
        `}
      >
        {menu.map((item) => (
          <li key={item.id} className="group relative md:py-2">
            <a
              href={`#/${item.slug}`}
              onClick={() => setOpen(false)}
              className="block py-2 text-neutral hover:text-secondary font-medium transition-colors"
            >
              {item.title.rendered}
            </a>

            {/* Submenu */}
            {item.children.length > 0 && (
              <ul
                className={`
                  md:absolute md:left-0 md:mt-2 md:bg-white md:text-text md:rounded-xl md:shadow-md md:p-2 md:hidden md:group-hover:block md:min-w-[180px] z-50
                  ${
                    open
                      ? "pl-4 border-l border-secondary/30 md:border-0 md:pl-0"
                      : ""
                  }
                `}
              >
                {item.children.map((child) => (
                  <li key={child.id}>
                    <a
                      href={`#/${child.slug}`}
                      onClick={() => setOpen(false)}
                      className="block py-2 md:px-4 md:py-2 rounded hover:text-secondary md:hover:bg-muted transition"
                    >
                      {child.title.rendered}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
