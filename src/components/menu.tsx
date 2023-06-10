"use client";

import { Disclosure, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";
import MenuOpenedIcon from "components/icon/menuOpened";
import MenuClosedIcon from "components/icon/menuClosed";

export default function MenuList() {
  const menu = [
    { text: "aaa", href: "/" },
    { text: "bbb", href: "/" },
    { text: "ccc", href: "/" },
    { text: "ddd", href: "/" },
  ];

  return (
    <Disclosure>
      {({ open }) => (
        <>
          {/** MobileMenuButton */}
          <Disclosure.Button className="md:hidden p-2">
            {open ? <MenuOpenedIcon /> : <MenuClosedIcon />}
          </Disclosure.Button>

          {/** MobileMenu */}
          <Transition
            as={Fragment}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel
              className="flex md:hidden w-full mt-4 flex-col justify-start"
              as="nav"
            >
              {menu.map((item, index) => (
                <Link
                  href={item.href}
                  key={index}
                  className="mx-3 px-3 py-3 text-sm hover:text-teal-500"
                >
                  {item.text}
                </Link>
              ))}
            </Disclosure.Panel>
          </Transition>

          {/** Menu */}
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
        </>
      )}
    </Disclosure>
  );
}
