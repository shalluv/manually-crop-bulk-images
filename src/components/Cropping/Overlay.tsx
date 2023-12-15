import { crop } from "@/lib/utils";
import { addImage } from "@/stores/count";
import { useRef, useState } from "react";
import Dialog from "./Dialog";
import Marker from "./Marker";

interface Props {
  image: any;
  next: string;
  number: string;
}

const CroppingOverlay = ({ image, number, next }: Props) => {
  const imageWidth: number = image.width;
  const imageHeight: number = image.height;
  const [state, setState] = useState(0);
  const [{ left, top, right, bottom }, setCrop] = useState({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  });
  const ref = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const markersRef = Array.from({ length: 4 }, () =>
    useRef<HTMLDivElement>(null),
  );

  const reset = () => {
    overlayRef.current?.style.setProperty("box-shadow", "none");
    overlayRef.current?.style.setProperty("width", "0");
    overlayRef.current?.style.setProperty("height", "0");
    overlayRef.current?.style.setProperty("left", "0");
    overlayRef.current?.style.setProperty("top", "0");
    setState(0);
  };

  const setOverlay = (y: number) => {
    overlayRef.current?.style.setProperty("width", `${right - left}px`);
    overlayRef.current?.style.setProperty("height", `${y - top}px`);
    overlayRef.current?.style.setProperty("left", `${left}px`);
    overlayRef.current?.style.setProperty("top", `${top}px`);
    overlayRef.current?.style.setProperty(
      "box-shadow",
      `0 0 0 9999px rgba(0, 0, 0, 0.5)`,
    );
  };

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (state === 4) return;

    const { clientX, clientY } = e;
    const { left: rectLeft, top: rectTop } =
      ref.current?.getBoundingClientRect() || {};
    const x = Math.floor(clientX - rectLeft);
    const y = Math.floor(clientY - rectTop);
    markersRef[state].current?.style.setProperty("left", `${x}px`);
    markersRef[state].current?.style.setProperty("top", `${y}px`);
    switch (state) {
      case 0:
        setCrop((prev) => ({ ...prev, left: x }));
        break;
      case 1:
        setCrop((prev) => ({ ...prev, top: y }));
        break;
      case 2:
        setCrop((prev) => ({ ...prev, right: x }));
        break;
      case 3:
        setCrop((prev) => ({ ...prev, bottom: y }));
        const midX = left + (right - left) / 2;
        const midY = top + (y - top) / 2;
        markersRef.forEach((marker, i) => {
          if (i & 1) marker.current?.style.setProperty("left", `${midX}px`);
          else marker.current?.style.setProperty("top", `${midY}px`);
        });
        setOverlay(y);

        break;
    }
    setState((prev) => prev + 1);
  };

  const handleCrop = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    crop(image.src, number, left, top, right, bottom);

    if (!addImage(`${number}`)) reset();
    if (window) window.location.href = `/${next}`;
  };

  return (
    <div
      className="absolute z-10 overflow-hidden outline-dashed outline-4 outline-secondary"
      style={{ width: imageWidth, height: imageHeight }}
      onClick={onClick}
      ref={ref}
    >
      {markersRef.map((marker, i) => (
        <Marker
          key={i}
          state={state}
          showState={i}
          divRef={ref}
          markerRef={marker}
          overlayRef={overlayRef}
          setCrop={setCrop}
          cropArea={{ left, top, right, bottom }}
        />
      ))}
      <div className="relative" ref={overlayRef}></div>
      <Dialog state={state} handleCrop={handleCrop} handleReset={reset} />
    </div>
  );
};

export default CroppingOverlay;
