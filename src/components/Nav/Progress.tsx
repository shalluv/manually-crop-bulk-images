import { count } from "@/stores/count";
import { useStore } from "@nanostores/react";
import { AnimatePresence, animate, motion } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  imageCount: number;
};

const Progress = ({ imageCount }: Props) => {
  const $count = useStore(count);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(0, $count, {
      duration: Math.log10($count),
      ease: [0.67, 0.33, 0.17, 0.83],
      onUpdate: (value) => {
        if (counterRef.current) {
          counterRef.current.textContent = value.toFixed(0).toString();
        }
      },
    });
    return () => controls.stop();
  }, [$count]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-5xl font-semibold text-primary">
        <span ref={counterRef}></span> / {imageCount}
      </h1>
      <AnimatePresence>
        <div className="h-4 w-full overflow-clip rounded-full bg-primary">
          <motion.div
            className="h-full rounded-full bg-accent"
            initial={{ width: "0%" }}
            animate={{ width: `${($count / imageCount) * 100}%` }}
            transition={{
              duration: Math.log10($count),
              ease: [0.67, 0.33, 0.17, 0.83],
            }}
            exit={{ width: "0%" }}
          ></motion.div>
        </div>
      </AnimatePresence>
    </div>
  );
};

export default Progress;
