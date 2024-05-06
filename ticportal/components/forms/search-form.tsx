"use client";

import React from "react";

import Link from "next/link";

const SearchForm = () => {
  return (
    <div className="p-6">
      <p>
        Already have team?{" "}
        <Link href="/teams" className="hover:underline slowmo">
          find it
        </Link>
      </p>
    </div>
  );
};

export default SearchForm;
