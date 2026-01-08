import Image from "next/image";

interface HeaderProps {
  signOut: () => void;
  user: { image: string; email: string; name: string };
}
const Header = ({ user, signOut }: HeaderProps) => {
  return (
    <header className="backdrop-blur-md bg-white/10 border-b border-white/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  height={32}
                  width={32}
                  className="rounded-lg sm:rounded-xl"
                />
              ) : (
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              )}
            </div>
            <div>
              <h1 className="text-base sm:text-xl font-bold text-white">
                TaskFlow Pro
              </h1>
              <p className="text-xs text-purple-200 hidden sm:block">
                {user?.name || user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={() => signOut()}
            className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition backdrop-blur-sm"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
