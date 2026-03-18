"use client";

import * as runtime from "react/jsx-runtime";
import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

function getMDXComponent(code: string) {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
}

const mdxComponents = {
  h1: (props: any) => (
    <h1 className="text-3xl font-bold tracking-tight" {...props} />
  ),
  h2: (props: any) => {
    const id =
      typeof props.children === "string"
        ? props.children
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
        : undefined;
    return <h2 id={id} {...props} />;
  },
  h3: (props: any) => {
    const id =
      typeof props.children === "string"
        ? props.children
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
        : undefined;
    return <h3 id={id} {...props} />;
  },
  a: ({ href, children, ...props }: any) => {
    if (href?.startsWith("/")) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
  img: ({ src, alt, ...props }: any) => (
    <Image
      src={src}
      alt={alt ?? ""}
      width={800}
      height={450}
      className="rounded-xl"
      {...props}
    />
  ),
  blockquote: (props: any) => <blockquote {...props} />,
  pre: (props: any) => <pre {...props} />,
  code: (props: any) => <code {...props} />,
};

interface MDXContentProps {
  code: string;
}

export function MDXContent({ code }: MDXContentProps) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return (
    <div className="prose">
      <Component components={mdxComponents} />
    </div>
  );
}
