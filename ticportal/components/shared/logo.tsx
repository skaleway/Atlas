import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link
      href="/"
      className="p-2 rounded shadow-sm box h-fit text-background font-bold"
    >
      TiC <span>Summit Portal</span>
    </Link>
  );
};

export default Logo;
