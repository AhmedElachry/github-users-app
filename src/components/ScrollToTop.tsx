import { useEffect, useState } from "react";

function ScrollToTopComponent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) setIsVisible(true);
      else setIsVisible(false);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-10 right-10 px-3 cursor-pointer text-5xl animate-pulse bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all"
      >
        ↑
      </button>
    )
  );
}

export default ScrollToTopComponent;
