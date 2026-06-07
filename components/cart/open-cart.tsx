import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function OpenCart({
  className,
  quantity,
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border-2 border-creeper/35 bg-creeper-light/55 text-creeper-dark shadow-sm shadow-creeper/10 transition-all duration-200 hover:scale-105 hover:border-creeper hover:bg-creeper hover:text-white active:scale-100">
      <ShoppingCartIcon
        className={clsx(
          "h-5 w-5 transition-all ease-in-out group-hover:scale-110",
          className,
        )}
      />

      {quantity ? (
        <div className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-or px-1 font-rubik text-[10px] font-black leading-none text-pierre shadow-sm">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
