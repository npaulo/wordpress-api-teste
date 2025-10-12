import { forwardRef, useEffect, useState, useRef } from "react";
import { getPages } from "../api/wordpress";
import { Menu as MenuIcon, X as CloseIcon } from "lucide-react";

const Menu = forwardRef(function Menu(_, ref) {
  const [menu, setMenu] = useState([]);
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);

  // Permitir que o ref externo aceda ao <nav>
  useEffect(() => {
    if (typeof ref === "function") {
      ref(navRef.current);
    } else if (ref) {
      ref.current = navRef.current;
    }
  }, [ref]);

  // Fechar menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
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
    <nav
      ref={navRef}
      className="bg-primary text-neutral shadow-md fixed top-0 left-0 right-0 z-50"
    >
      {/* Overlay com blur e fade */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40 md:hidden transition-opacity duration-300 opacity-100"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Navbar container */}
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4 md:px-10 relative z-50">
        {/* Logo / Nome */}
        <a
          href="/"
          className="font-sans font-semibold text-2xl tracking-tight flex items-center gap-2 hover:text-secondary transition-colors"
        >
          <img
            src="./logotipo.png"
            alt="Pais Coragem"
            className="logo h-8 md:h-10 w-auto object-contain"
          />
        </a>

        {/* Botão mobile */}
        <button
          className="md:hidden text-neutral"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <CloseIcon size={28} /> : <MenuIcon size={28} />}
        </button>

        {/* Menu principal */}
        <ul
          className={`animate-slide-down overflow-hidden md:overflow-visible transition-all duration-500 ease-in-out
            ${
              open
                ? "max-h-[600px] opacity-100 absolute top-full left-0 w-full bg-primary shadow-lg"
                : "max-h-0 opacity-0 md:max-h-none md:opacity-100"
            }
            md:static md:flex md:items-center md:gap-8 md:bg-transparent md:shadow-none text-lg font-medium
          `}
        >
          {menu.map((item) => (
            <li key={item.id} className="group relative md:py-2 list-none">
              <a
                href={`#/${item.slug}`}
                onClick={() => setOpen(false)}
                className="block py-3 px-6 md:px-0 text-neutral hover:text-secondary transition-colors"
                dangerouslySetInnerHTML={{ __html: item.title.rendered }}
              />

              {/* Submenu moderno */}
              {item.children.length > 0 && (
                <ul
                  className={`
                    md:absolute md:left-0 md:mt-3 md:bg-white md:text-text md:rounded-2xl md:shadow-xl md:p-3
                    md:opacity-0 md:invisible md:group-hover:opacity-100 md:group-hover:visible
                    md:transition-all md:duration-300 md:ease-out md:transform md:-translate-y-2 md:group-hover:translate-y-0
                    md:min-w-[240px] z-50
                    ${
                      open
                        ? "pl-8 border-l border-secondary/30 md:border-0 md:pl-0"
                        : ""
                    }
                  `}
                >
                  {item.children.map((child) => (
                    <li key={child.id} className="list-none">
                      <a
                        href={`#/${child.slug}`}
                        onClick={() => setOpen(false)}
                        className="block py-2 px-4 rounded-lg text-text/90 hover:text-primary hover:bg-muted transition-colors duration-200"
                        dangerouslySetInnerHTML={{
                          __html: child.title.rendered,
                        }}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
});

export default Menu;
