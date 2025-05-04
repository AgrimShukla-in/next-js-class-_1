'use client';

import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
    className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
      <Menu setActive={setActive} >
        <Link href={"/"}>
        <MenuItem setActive={setActive} active={active}
         item="Home"
        ></MenuItem>
        </Link>

        <Link href={"/about"}>
        <MenuItem setActive={setActive} active={active}
         item="About"
        ></MenuItem>
        </Link>

        <Link href={"/contact"}>
        <MenuItem setActive={setActive} active={active}
         item="Contact"
        ></MenuItem>
        </Link>


        <MenuItem setActive={setActive} active={active}
         item="products"
        >
          <div className="flex flex-col space-y-4 text-sm">
          <HoveredLink href="/web-dev">Web Development</HoveredLink>
            <HoveredLink href="/interface-design">Interface Design</HoveredLink>
            <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
            <HoveredLink href="/branding">Branding</HoveredLink>
            <HoveredLink href="/photography">Photography</HoveredLink>
          </div>
        </MenuItem>


      </Menu>
    
    </div>
  )
}

export default Navbar