import { useRouter } from "next/router";

const BackBtn = ({ className, children }) => {
  const router = useRouter();

  return (
    <button
      className={`btn shop-now ${className ? className : ""}`}
      onClick={() => router.back()}
    >
      {children}
    </button>
  );
};

export default BackBtn;
