import Loader from "./Loader";

const PageLoader = () => {
  return (
    <div className="flex h-[70vh] items-center justify-center">
      <Loader size={40} />
    </div>
  );
};

export default PageLoader;
