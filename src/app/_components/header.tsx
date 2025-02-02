import Link from "next/link";
import Logo from "@components/logo";

const GlobalHeader = () => {
  return (
    <header className="container mx-auto max-w-5xl">
      <div className="flex flex-wrap items-center justify-between px-5 py-5 md:py-6">
        <Link href="/">
          <Logo />
        </Link>
      </div>
    </header>
  );
};

export default GlobalHeader;
