"use client";

import Link from "next/link";
import Image from "next/image";
import { navItems } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface Props {
  fullName: string;
  avatar: string;
  email: string;
}

const Sidebar = ({ fullName, avatar, email }: Props) => {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen flex-col items-center overflow-auto px-5 py-7 sm:flex lg:w-[280px] xl:w-[325px] lg:items-stretch w-[90px] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:h-0">
      <Link
        href="/"
        className="flex w-fit shrink-0 justify-center self-center rounded-xl border border-light-300/60 bg-brand/5 p-2 transition-colors hover:bg-brand/10"
      >
        <Image
          src="/assets/images/logo-2.png"
          alt="Drop"
          width={48}
          height={48}
          className="hidden size-12 rounded-lg object-contain lg:block"
        />

        <Image
          src="/assets/images/logo-2.png"
          alt="Drop"
          width={40}
          height={40}
          className="size-10 rounded-lg object-contain lg:hidden"
        />
      </Link>

      <nav className="mt-9 flex flex-1 gap-1 text-[16px] font-semibold leading-[24px] text-brand">
        <ul className="flex flex-1 flex-col gap-6">
          {navItems.map(({ url, name, icon: Icon }) => (
            <Link key={name} href={url} className="lg:w-full">
              <li
                className={cn(
                  "flex h-[52px] items-center justify-center gap-4 rounded-xl text-[16px] font-semibold leading-[24px] text-light-100 lg:w-full lg:justify-start lg:rounded-full lg:px-[30px]",
                  pathname === url && "bg-brand text-white shadow-[var(--shadow-drop-2)]",
                )}
              >
                <Icon
                  className={cn(
                    "size-6 shrink-0",
                    pathname === url ? "text-white" : "text-brand",
                  )}
                />
                <p className="hidden lg:block">{name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>

      <Image
        src="/assets/images/files-2.png"
        alt="Files illustration"
        width={506}
        height={418}
        className="w-full"
      />

      <div className="mt-4 flex items-center justify-center gap-2 rounded-full bg-brand/10 p-1 text-light-100 lg:justify-start lg:p-3">
        <Image
          src={avatar}
          alt="Avatar"
          width={44}
          height={44}
          className="aspect-square w-10 rounded-full object-cover"
        />
        <div className="hidden lg:block">
          <p className="text-[14px] leading-[20px] font-semibold capitalize">
            {fullName}
          </p>
          <p className="text-[12px] leading-[16px] font-normal">{email}</p>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
