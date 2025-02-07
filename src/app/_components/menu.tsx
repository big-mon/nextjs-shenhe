"use client";

import { useState } from "react";
import Link from "next/link";
import MenuOpenedIcon from "@components/icon/menuOpened";
import MenuClosedIcon from "@components/icon/menuClosed";

export default function MenuList() {
  const [isOpen, setIsOpen] = useState(false);

  const menu = [
    { text: "aaa", href: "/" },
    { text: "bbb", href: "/" },
    { text: "ccc", href: "/" },
    { text: "ddd", href: "/" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* PC画面用メニュー */}
      <nav className="hidden md:flex w-auto">
        {menu.map((item, index) => (
          <Link
            href={item.href}
            key={index}
            className="mx-3 px-3 py-3 text-sm hover:text-teal-500"
          >
            {item.text}
          </Link>
        ))}
      </nav>

      {/* スマートフォン画面用ハンバーガーメニュー */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="p-2">
          {isOpen ? <MenuOpenedIcon /> : <MenuClosedIcon />}
        </button>
        {isOpen && (
          <nav className="flex flex-col items-start">
            {menu.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                className="px-3 py-3 text-sm hover:text-teal-500"
                onClick={() => setIsOpen(false)} // メニュー項目をクリックしたらメニューを閉じる
              >
                {item.text}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </>
  );
}
