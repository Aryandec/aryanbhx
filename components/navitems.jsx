"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FaBars } from "react-icons/fa";
import { FaBookBookmark } from "react-icons/fa6";

const NavItems = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/#projects" },
    { label: "Socials", href: "/socials" },
  ];

  return (
    <>
      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-6">
        {links.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className={`${
              pathname === href
                ? "text-gray-600 font-semibold"
                : "text-gray-700"
            } transition-colors hover:text-gray-500`}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Mobile Nav */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <FaBars />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pt-8 px-6">
            <div className="flex flex-col gap-6">
              {links.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setOpen(false)} // Close the sheet on click
                  className={`${
                    pathname === href
                      ? "text-gray-600 font-semibold"
                      : "text-gray-800"
                  } text-lg transition-colors hover:text-gray-500`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default NavItems;