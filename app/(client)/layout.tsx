"use client";

import { AppContextProvider } from "@/contexts/AppContext";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function ({ children }: { children: React.ReactNode }) {
  return (
    <AppContextProvider>
      <div className="w-screen h-screen">
        <Header />
        <main className="mt-[80px]">
          {children}
        </main>
        <Footer />
        <div className="border-t border-slate-900/5 py-10">
          <p className="font-inter text-center text-sm text-gray-500 lg:mt-0">
            © Copyright 2024.{" "}
            <a
              href="https://arcade.863.ai"
              target="_blank"
              className="text-primary hidden md:inline-block"
            >
              arcade.863.ai
            </a>{" "}
            All rights reserved.
          </p>
        </div>
      </div>
    </AppContextProvider>
  );
}
