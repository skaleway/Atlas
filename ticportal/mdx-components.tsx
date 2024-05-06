"use client";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="font-bold text-4xl" style={{ fontSize: 32 }}>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-bold" style={{ fontSize: 24 }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-bold" style={{ fontSize: 18.72 }}>
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-bold" style={{ fontSize: 16 }}>
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className="font-bold" style={{ fontSize: 13.28 }}>
        {children}
      </h5>
    ),
    h6: ({ children }) => (
      <h6 className="font-bold" style={{ fontSize: 10.72 }}>
        {children}
      </h6>
    ),
    p: ({ children }) => (
      <p
        style={{
          display: "block",
          marginTop: "1em",
          marginBottom: "1em",
        }}
      >
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul
        className="list-disc list "
        style={{
          listStyle: "inside",
          marginTop: "1em",
          marginBottom: "1em",
          marginLeft: 0,
          marginRight: 0,
          paddingLeft: "40px",
        }}
      >
        {children}
      </ul>
    ),
    ...components,
  };
}
