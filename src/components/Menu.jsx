import { useEffect, useState } from "react";
import { getPages } from "../api/wordpress";

export default function Menu() {
  const [menu, setMenu] = useState([]);

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
    <nav className="bg-blue-600 text-white p-4">
      <ul className="flex gap-6">
        {menu.map((item) => (
          <li key={item.id} className="group relative">
            <a href={`/${item.slug}`} className="hover:underline">
              {item.title.rendered}
            </a>
            {item.children.length > 0 && (
              <ul className="absolute left-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg p-2 hidden group-hover:block">
                {item.children.map((child) => (
                  <li key={child.id}>
                    <a
                      href={`/${child.slug}`}
                      className="block px-4 py-2 hover:bg-gray-100 rounded"
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
