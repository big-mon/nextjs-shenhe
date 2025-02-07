import Link from "next/link";
import Logo from "@components/logo";
import Menu from "@components/menu";

const GlobalHeader = () => {
  return (
    <header className="container mx-auto max-w-5xl">
      <div className="flex flex-wrap items-center justify-between px-5 py-5 md:py-6">
        <Link href="/">
          <Logo />
        </Link>
        <Menu />
      </div>
    </header>
  );
};

export default GlobalHeader;
