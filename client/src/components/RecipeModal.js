import React, { useEffect, useRef } from "react";

export default function RecipeModal({ meal, onClose }) {
  const modalRef = useRef(null);

  // Trap focus + ESC close
  useEffect(() => {
    if (!modalRef.current) return;

    const focusableEls = modalRef.current.querySelectorAll(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
    );
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    firstEl?.focus();

    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && focusableEls.length > 1) {
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Print handler
  const handlePrint = () => {
    const printContent = document.getElementById("print-section").innerHTML;
    const newWin = window.open("", "_blank");
    newWin.document.write(`
      <html>
        <head>
          <title>${meal.strMeal}</title>
          <style>
            body { font-family: sans-serif; margin: 20mm; }
            img { max-width: 100%; border-radius: 8px; }
            h2 { margin-bottom: 8px; }
          </style>
        </head>
        <body>${printContent}</body>
      </html>
    `);
    newWin.document.close();
    newWin.print();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      onClick={onClose} // close modal when clicking outside
    >
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
      >
        <div id="print-section">
          <h2 className="text-2xl font-bold mb-2">{meal.strMeal}</h2>
          <p className="text-gray-600 mb-4">
            {meal.strCategory} • {meal.strArea}
          </p>
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full rounded-lg mb-4"
          />
          <h3 className="text-lg font-semibold mb-2">Instructions</h3>
          <p className="text-sm mb-4 whitespace-pre-line">{meal.strInstructions}</p>
        </div>

        {meal.strYoutube && (
          <a
            href={meal.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline block mb-4"
          >
            ▶ Watch on YouTube
          </a>
        )}

        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Print Recipe
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
