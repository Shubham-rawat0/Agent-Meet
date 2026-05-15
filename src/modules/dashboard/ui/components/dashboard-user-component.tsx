"use client";

import { useRouter } from "next/navigation";
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useUser, useClerk } from "@clerk/nextjs";

import { useIsMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { GeneratedAvatar } from "@/components/generated-avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";

export const DashboardUserButton = () => {
  const router = useRouter();
  const isMobile = useIsMobile();

  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  const onLogout = async () => {
    await signOut();
    router.push("/sign-in");
  };

  const onBilling = async () => {
    try {
      const res = await fetch("/api/billing/portal", {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Failed to open billing portal");
      }

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!isLoaded || !user) return null;

  const image = user.imageUrl;
  const name = user.fullName || "User";
  const email = user.primaryEmailAddress?.emailAddress;

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 gap-x-2">
          {image ? (
            <Avatar>
              <AvatarImage src={image} />
            </Avatar>
          ) : (
            <GeneratedAvatar
              seed={name}
              variant="initials"
              className="size-9 mr-3"
            />
          )}

          <div className="flex flex-col text-left flex-1 min-w-0">
            <p className="text-sm truncate">{name}</p>
            <p className="text-xs truncate">{email}</p>
          </div>

          <ChevronDownIcon className="size-4" />
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{name}</DrawerTitle>
            <DrawerDescription>{email}</DrawerDescription>
          </DrawerHeader>

          <DrawerFooter>
            <Button variant="outline" onClick={onBilling}>
              <CreditCardIcon className="size-4" />
              Billing
            </Button>

            <Button variant="outline" onClick={onLogout}>
              <LogOutIcon className="size-4" />
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 gap-x-2">
        {image ? (
          <Avatar>
            <AvatarImage src={image} />
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={name}
            variant="initials"
            className="size-9 mr-3"
          />
        )}

        <div className="flex flex-col text-left flex-1 min-w-0">
          <p className="text-sm truncate">{name}</p>
          <p className="text-xs truncate">{email}</p>
        </div>

        <ChevronDownIcon className="size-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="font-medium truncate">{name}</span>
            <span className="text-sm text-muted-foreground truncate">
              {email}
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={onBilling}
          className="flex justify-between cursor-pointer"
        >
          Billing
          <CreditCardIcon className="size-4" />
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onLogout}
          className="flex justify-between cursor-pointer"
        >
          Logout
          <LogOutIcon className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
