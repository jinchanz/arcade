import { AppContext } from "@/contexts/AppContext";
import { useContext } from "react";
import User from "@/components/user";

export default function () {
  const { user } = useContext(AppContext);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="h-auto w-screen">
        <nav className="font-inter mx-auto h-auto w-full max-w-[1600px] lg:relative lg:top-0">
          <div className="flex flex-row items-center px-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-6 xl:px-20">
            <a href="/" className="text-xl font-medium flex items-center">
              <img
                src="/logo.webp"
                className="h-8 mr-3"
                alt="logo"
              />
            </a>

            <div className="flex-1"></div>

            <div className="flex flex-row items-center lg:flex lg:flex-row lg:space-x-3 lg:space-y-0">
              {user === undefined ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <>
                  {user ? (
                    <>
                      <User user={user} />
                    </>
                  ) : (
                    <div className="lg:flex lg:flex-1 lg:justify-end">
                      <a href="/sign-in" className="text-sm font-semibold leading-6 text-gray-900">
                        Log in <span aria-hidden="true">&rarr;</span>
                      </a>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
