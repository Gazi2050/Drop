import React from "react";
import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-dvh bg-light-400 lg:flex">
      {/* Left marketing panel (desktop/tablet only) */}
      <section className="hidden lg:flex lg:w-5/12 xl:w-2/5 items-center justify-center bg-brand px-8 py-10">
        <div className="w-full max-w-107.5 space-y-10">
          <div className="flex items-center gap-3 xl:gap-4">
            <Image
              src="/assets/images/logo.png"
              alt="logo"
              width={224}
              height={82}
              className="h-16 w-auto shrink-0 object-contain rounded-xl xl:h-19"
              priority
            />
            <span className="text-[2rem] font-bold leading-none tracking-tight text-white xl:text-[2.25rem]">
              Drop
            </span>
          </div>

          <div className="space-y-4 text-white">
            <h1 className="h1 max-w-[20ch]">Manage your files the best way</h1>
            <p className="body-1 max-w-[34ch]">
              This is a place where you can store all your documents.
            </p>
          </div>

          <Image
            src="/assets/images/files.png"
            alt="Files"
            width={342}
            height={342}
            className="h-auto w-full max-w-70 xl:max-w-85.5 transition-transform duration-300 hover:rotate-2 hover:scale-105"
            priority
          />
        </div>
      </section>

      {/* Right auth content */}
      <section className="flex min-h-dvh w-full flex-1 items-center justify-center bg-white px-4 py-8 sm:px-8 lg:px-10">
        <div className="w-full max-w-145">
          {/* Mobile logo */}
          <div className="mb-10 flex items-center justify-center gap-2 sm:gap-2.5 lg:hidden">
            <Image
              src="/assets/images/logo.png"
              alt="logo"
              width={224}
              height={82}
              className="h-14 w-auto shrink-0 object-contain sm:h-16"
              priority
            />
            <span className="text-[1.75rem] font-bold leading-none tracking-tight text-brand sm:text-[1.875rem]">
              Drop
            </span>
          </div>

          {children}
        </div>
      </section>
    </div>
  );
};

export default Layout;
