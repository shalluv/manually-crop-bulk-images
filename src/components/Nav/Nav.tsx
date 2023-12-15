import NavItem from "@/components/Nav/NavItem.tsx";
import { useEffect, useRef } from "react";
import Progress from "./Progress";

interface Props {
  imageCount: number;
}

export default function Nav({ imageCount }: Props) {
  let curr = 0;
  if (window && window.location.pathname !== "/")
    curr = parseInt(window.location.pathname.split("/")[1]);
  const ref = useRef<HTMLUListElement>(null);
  const liRef = Array.from({ length: imageCount }, () =>
    useRef<HTMLLIElement>(null),
  );

  useEffect(() => {
    if (curr <= 5 || typeof liRef[curr - 5].current === "undefined") return;
    liRef[curr - 5].current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }, [curr]);

  return (
    <nav className="flex h-screen w-64 flex-col gap-4 bg-secondary px-5 py-8 text-center">
      <a href="/">
        <Progress imageCount={imageCount} />
      </a>
      <ul
        className="no-scrollbar flex flex-col gap-2 overflow-y-scroll"
        ref={ref}
      >
        {Array.from({ length: imageCount }).map((_, index) => (
          <NavItem key={index + 1} number={index + 1} liRef={liRef[index]} />
        ))}
      </ul>
    </nav>
  );
}
