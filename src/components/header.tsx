import Link from "next/link";
import MenuList from "./menu";
import Logo from "./icon/logo";

/** 全体ヘッダー */
export default function GlobalHeader() {
  return (
    <header className="container mx-auto max-w-5xl">
      <div className="flex flex-wrap items-center justify-between px-5 py-5 md:py-6">
        <Link href="/">
          <Logo size={32} />
        </Link>
        <MenuList />
      </div>
    </header>
  );
}
