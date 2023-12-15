import { formatNumber } from "@/lib/utils";
import { ifImageExists } from "@/stores/count";
import clsx from "clsx";

interface Props {
  number: number;
  liRef: React.MutableRefObject<HTMLLIElement>;
}

export default function NavItem({ number, liRef }: Props) {
  let current = 0;
  if (window) current = parseInt(window.location.pathname.split("/")[1]);

  return (
    <li
      className={clsx(
        "relative cursor-pointer text-3xl",
        number === current && "font-bold underline",
        ifImageExists(formatNumber(number)) ? "text-accent" : "text-primary",
      )}
      ref={liRef}
    >
      <a href={`/${formatNumber(number)}`}>{formatNumber(number)}</a>
      <i
        className={clsx(
          "absolute right-2 top-1/2 aspect-square w-4 -translate-y-1/2 rounded-full",
          ifImageExists(formatNumber(number)) && "bg-accent",
        )}
      ></i>
    </li>
  );
}
