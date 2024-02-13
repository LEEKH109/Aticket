const ShortsLoading = ({ height }) => {
  return (
    <main className="relative bg-black animate-pulse" style={{ height: `${height}px` }}>
      <div className="absolute z-10 w-full flex items-center justify-between pt-10 pb-3.5 px-2 bottom-0">
        <div className="w-40 h-7 ms-4 bg-transparent"></div>
        <div className="w-9 h-9 mx-4 bg-transparent"></div>
      </div>
    </main>
  );
};

export default ShortsLoading;
