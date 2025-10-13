import { forwardRef, useEffect, useState, useRef } from "react";
import { getPages } from "../api/wordpress";
import { Menu as MenuIcon, X as CloseIcon } from "lucide-react";

const Menu = forwardRef(function Menu(_, ref) {
  const [menu, setMenu] = useState([]);
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);

  // Passar ref externo ao <nav>
  useEffect(() => {
    if (typeof ref === "function") ref(navRef.current);
    else if (ref) ref.current = navRef.current;
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

      // 🔹 Filtra para remover a página "Home"
      const filtered = roots.filter((page) => page.slug !== "home");

      setMenu(filtered);
    });
  }, []);

  return (
    <nav
      ref={navRef}
      className="bg-[#f9fafc] text-[#0a4f7d] border-b border-[#e4e8ef] shadow-sm fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    >
      {/* Overlay com blur (fica abaixo da navbar) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-30 md:hidden transition-opacity duration-300 opacity-100"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Navbar container */}
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5 md:px-10 relative z-50 gap-4 sm:gap-8 lg:gap-12">
        {/* Logotipo */}
        <a href="/" className="flex items-center gap-2">
          <img
            src="./logotipo.png"
            alt="Pais Coragem"
            className="logo h-12 w-auto object-contain"
          />
        </a>

        {/* Botão mobile (à direita) */}
        <button
          className="ml-auto md:hidden text-[#0a4f7d]"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <CloseIcon size={28} /> : <MenuIcon size={28} />}
        </button>

        {/* Menu principal */}
        <ul
          className={[
            open
              ? "block fixed top-[72px] left-0 w-full h-[calc(100vh-72px)] bg-[#f9fafc] overflow-y-auto shadow-md z-40 animate-slide-down pb-10"
              : "hidden",
            "md:static md:flex md:items-center md:gap-8 md:bg-transparent md:shadow-none md:z-auto",
            // 🔹 Corrigido: overflow agora é visível para mostrar hover underline
            "overflow-visible transition-all duration-500 ease-in-out text-lg font-medium tracking-wide mb-0",
          ].join(" ")}
        >
          {menu.map((item) => (
            <li
              key={item.id}
              className="group relative md:py-2 list-none mb-0 overflow-visible"
            >
              <a
                href={`#/${item.slug}`}
                onClick={() => setOpen(false)}
                className="relative block py-3 px-6 md:px-0 text-[#0a4f7d] hover:text-[#0b74b6] hover:scale-[1.02] transition-all duration-300 
                after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-[#0b74b6] hover:after:w-full after:transition-all after:duration-300"
                dangerouslySetInnerHTML={{ __html: item.title.rendered }}
              />

              {/* Submenu profissional */}
              {item.children.length > 0 && (
                <ul
                  className={[
                    "md:absolute md:left-0 md:mt-4 md:min-w-[260px]",
                    "md:bg-white/95 md:backdrop-blur-sm md:text-[#0a2a43]",
                    "md:rounded-2xl md:shadow-xl md:border md:border-[#e8edf5] md:p-2",
                    "md:opacity-0 md:invisible md:group-hover:opacity-100 md:group-hover:visible",
                    "md:transition-all md:duration-300 md:ease-out md:transform md:-translate-y-2 md:group-hover:translate-y-0",
                    "z-50",
                    open
                      ? "pl-8 border-l border-[#0b74b6]/30 md:border-0 md:pl-0"
                      : "",
                  ].join(" ")}
                >
                  {item.children.map((child) => (
                    <li key={child.id} className="list-none">
                      <a
                        href={`#/${child.slug}`}
                        onClick={() => setOpen(false)}
                        className="block py-2.5 px-5 rounded-lg text-sm text-[#0a2a43] hover:text-[#0b74b6] hover:bg-[#f2f7ff] transition-all duration-200 ease-out"
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
