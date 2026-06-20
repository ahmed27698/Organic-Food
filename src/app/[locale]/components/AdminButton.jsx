"use client";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { FaUserShield } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

export default function AdminButton() {
  const { data: session } = useSession();
  const name = session?.user?.name || session?.user?.email || "Admin";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center gap-2 cursor-pointer px-4 py-2 rounded-md hover:bg-gray-100">
        <FaUserShield className="text-green-600" />
        <span className="font-medium">{name}</span>
        <IoMdArrowDropdown />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="text-green-600">{name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full text-left text-red-600 cursor-pointer"
          >
            Sign Out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
