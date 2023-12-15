import clsx from "clsx";
import { useState } from "react";

type Props = {
  state: number;
  showState: number;
  divRef: React.MutableRefObject<HTMLDivElement>;
  markerRef: React.MutableRefObject<HTMLDivElement>;
  setCrop: React.Dispatch<
    React.SetStateAction<{
      left: number;
      top: number;
      right: number;
      bottom: number;
    }>
  >;
  overlayRef: React.MutableRefObject<HTMLDivElement>;
  cropArea: { left: number; top: number; right: number; bottom: number };
};

const Marker = ({
  state,
  showState,
  divRef,
  markerRef,
  overlayRef,
  setCrop,
  cropArea: { left, top, right, bottom },
}: Props) => {
  const [isDragging, setIsDragging] = useState(false);

  const onMouseDown = () => setIsDragging(true);
  const onMouseUp = () => setIsDragging(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDragging || state < 4) return;
    const { clientX, clientY } = e;
    const { left: rectLeft, top: rectTop } =
      divRef.current?.getBoundingClientRect() || {};
    const x = Math.floor(clientX - rectLeft);
    const y = Math.floor(clientY - rectTop);
    markerRef.current?.style.setProperty("left", `${x}px`);
    markerRef.current?.style.setProperty("top", `${y}px`);
    switch (showState) {
      case 0:
        setCrop((prev) => ({ ...prev, left: x }));
        overlayRef.current?.style.setProperty("left", `${x}px`);
        overlayRef.current?.style.setProperty("width", `${right - x}px`);
        break;
      case 1:
        setCrop((prev) => ({ ...prev, top: y }));
        overlayRef.current?.style.setProperty("top", `${y}px`);
        overlayRef.current?.style.setProperty("height", `${bottom - y}px`);
        break;
      case 2:
        setCrop((prev) => ({ ...prev, right: x }));
        overlayRef.current?.style.setProperty("width", `${x - left}px`);
        break;
      case 3:
        setCrop((prev) => ({ ...prev, bottom: y }));
        overlayRef.current?.style.setProperty("height", `${y - top}px`);
        break;
    }
  };

  return (
    <div
      className={clsx(
        "absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full",
        ["bg-orange", "bg-accent", "bg-red", "bg-secondary"][showState],
        showState % 2 === 0 ? "h-36 w-4" : "h-4 w-36",
        state <= showState && "hidden",
      )}
      ref={markerRef}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    ></div>
  );
};

export default Marker;
