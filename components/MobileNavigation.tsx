"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Menu, LogOut } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { navItems } from "@/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import FileUploader from "@/components/FileUploader";
import { signOutUser } from "@/lib/actions/user.actions";

interface Props {
  $id: string;
  accountId: string;
  fullName: string;
  avatar: string;
  email: string;
}

const MobileNavigation = ({
  $id: ownerId,
  accountId,
  fullName,
  avatar,
  email,
}: Props) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="mobile-header">
      <Image
        src="/assets/images/logo-2.png"
        alt="Drop"
        width={40}
        height={40}
        className="size-10 object-contain"
      />

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Menu className="size-8 text-light-100" />
        </SheetTrigger>
        <SheetContent className="h-screen px-3 pt-0">
          <SheetTitle>
            <div className="header-user">
              <Image
                src={avatar}
                alt="avatar"
                width={44}
                height={44}
                className="header-user-avatar"
              />
              <div className="sm:hidden lg:block">
                <p className="text-[14px] leading-[20px] font-semibold capitalize">
                  {fullName}
                </p>
                <p className="text-[12px] leading-[16px] font-normal">
                  {email}
                </p>
              </div>
            </div>
            <Separator className="mb-4 bg-light-200/20" />
          </SheetTitle>

          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              {navItems.map(({ url, name, icon: Icon }) => (
                <Link key={name} href={url} className="lg:w-full">
                  <li
                    className={cn(
                      "mobile-nav-item",
                      pathname === url &&
                        "bg-brand text-white shadow-[var(--shadow-drop-2)] hover:bg-brand-100",
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-6 shrink-0",
                        pathname === url ? "text-white" : "text-brand",
                      )}
                    />
                    <p>{name}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </nav>

          <Separator className="my-5 bg-light-200/20" />

          <div className="flex flex-col justify-between gap-5 pb-5">
            <FileUploader ownerId={ownerId} accountId={accountId} />
            <form action={signOutUser}>
              <Button type="submit" className="mobile-sign-out-button">
                <LogOut className="size-6 shrink-0" />
                <p>Logout</p>
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavigation;
