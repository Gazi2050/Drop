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
    <header className="flex h-[60px] justify-between px-5 sm:hidden">
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
            <div className="my-3 flex items-center gap-2 rounded-full p-1 text-light-100 sm:justify-center sm:bg-brand/10 lg:justify-start lg:p-3">
              <Image
                src={avatar}
                alt="avatar"
                width={44}
                height={44}
                className="aspect-square w-10 rounded-full object-cover"
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

          <nav className="flex flex-1 gap-1 text-[16px] font-semibold leading-[24px] text-brand">
            <ul className="flex flex-1 flex-col gap-4">
              {navItems.map(({ url, name, icon: Icon }) => (
                <Link key={name} href={url} className="lg:w-full">
                  <li
                    className={cn(
                      "flex h-[52px] w-full items-center justify-start gap-4 rounded-full px-6 text-[16px] font-semibold leading-[24px] text-light-100",
                      pathname === url && "bg-brand text-white shadow-[var(--shadow-drop-2)]",
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
            <Button
              type="submit"
              className="flex h-[52px] w-full items-center gap-4 rounded-full bg-brand/10 px-6 text-[16px] font-semibold leading-[24px] text-brand shadow-none transition-all hover:bg-brand/20"
              onClick={async () => await signOutUser()}
            >
              <LogOut className="size-6 shrink-0" />
              <p>Logout</p>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavigation;
