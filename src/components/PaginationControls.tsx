import type { FC } from "react";

interface PaginationControlsProps {
  since: number;
  perPage: number;
  goNext: () => void;
  goPrev: () => void;
  goFirst: () => void;
  disablePrev: boolean;
  disableNext: boolean;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  goNext,
  goPrev,
  goFirst,
  disablePrev,
  disableNext,
}) => {
  return (
    <div className="flex justify-center gap-4 mt-6">
      <button
        onClick={goFirst}
        disabled={disablePrev}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        First
      </button>
      <button
        onClick={goPrev}
        disabled={disablePrev}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Previous
      </button>
      <button
        onClick={goNext}
        disabled={disableNext}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Next
      </button>
      <button
        title="Not implemented since GitHub API does not support it"
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-not-allowed"
      >
        Last
      </button>
    </div>
  );
};

export default PaginationControls;
