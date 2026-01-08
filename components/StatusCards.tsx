import { StatusCardProps } from "@/app/types";

const StatusCards = ({ todoData }: StatusCardProps) => {
  const { total, activeCount, completedCount } = todoData;
  return (
    <div className="lg:w-64 shrink-0">
      <div className="grid grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-4">
        <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-2xl transform hover:scale-105 transition">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-blue-100 text-xs sm:text-sm font-medium mb-1">
                Total
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                {total}
              </h3>
            </div>
            <div className="hidden lg:flex w-12 h-12 bg-white/20 rounded-xl items-center justify-center mt-3">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-linear-to-br from-orange-500 to-red-500 rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-2xl transform hover:scale-105 transition">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-orange-100 text-xs sm:text-sm font-medium mb-1">
                Active
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                {activeCount}
              </h3>
            </div>
            <div className="hidden lg:flex w-12 h-12 bg-white/20 rounded-xl items-center justify-center mt-3">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-linear-to-br from-green-500 to-emerald-600 rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-2xl transform hover:scale-105 transition">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-green-100 text-xs sm:text-sm font-medium mb-1">
                Done
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                {completedCount}
              </h3>
            </div>
            <div className="hidden lg:flex w-12 h-12 bg-white/20 rounded-xl items-center justify-center mt-3">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusCards;
