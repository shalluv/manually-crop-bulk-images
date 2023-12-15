type Props = {
  state: number;
  handleCrop: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleReset: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Dialog = ({ state, handleCrop, handleReset }: Props) => {
  return (
    <dialog open={state >= 4} className="absolute bottom-8 bg-transparent">
      <div className="flex h-full w-full items-center justify-between gap-8 text-2xl font-semibold text-primary">
        <button
          className="px-4 py-2 underline hover:no-underline hover:opacity-80"
          onClick={handleReset}
        >
          Cancel
        </button>
        <button
          className="rounded-3xl bg-accent px-4 py-2 hover:opacity-80"
          onClick={handleCrop}
        >
          Confirm
        </button>
      </div>
    </dialog>
  );
};

export default Dialog;
