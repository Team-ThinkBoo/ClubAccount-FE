const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-8 h-8 border-4 border-white rounded-full border-t-transparent animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
