const ResetButton = () => {
  const handleReset = () => {
    const confirmed = window.confirm("Are you sure you want to reset?");
    if (!confirmed) return;
    window.localStorage.clear();
    window.location.href = "/";
  };

  return (
    <button
      className="fixed right-4 top-4 rounded-full bg-secondary px-4 py-2 text-2xl font-semibold text-primary opacity-50 hover:opacity-80"
      onClick={handleReset}
    >
      Reset
    </button>
  );
};

export default ResetButton;
