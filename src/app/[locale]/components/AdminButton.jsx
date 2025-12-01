"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { IoMdArrowDropdown } from "react-icons/io";

export default function AdminButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center gap-2 cursor-pointer p-5">Admin<IoMdArrowDropdown/></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel><Link href="../">Log Out</Link></DropdownMenuLabel>
        
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
