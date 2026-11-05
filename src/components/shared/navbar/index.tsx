"use client";

import Link from "next/link";
import { ArrowRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import NavLink from "./NavLink";
import { navLinks } from "@/constant";
import Logo from "../Logo";

export default function Navbar() {
  return (
    <header className="w-full sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100/90 transition-all">
      <div className="container h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Logo width={160} height={50} priority />

        {/* Desktop Menu & Actions */}
        <div className="hidden md:flex items-center gap-8">
          <nav>
            <ul className="flex items-center gap-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <NavLink
                    href={link.href}
                    label={link.label}
                    exact={link.href === "/"}
                  />
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Sign In Button */}
          <Link href="/login">
            <Button className="bg-primary hover:bg-[#123258] text-white px-5 py-2.5 h-10 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-xs transition-all cursor-pointer">
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <Link href="/login">
            <Button
              size="sm"
              className="bg-primary hover:bg-[#123258] text-white px-3.5 h-9 rounded-lg text-xs font-semibold flex items-center gap-1.5"
            >
              <span>Sign In</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[300px] p-6 flex flex-col justify-between"
            >
              <div>
                <div className="pb-6 border-b border-slate-100">
                  <Logo width={140} height={45} />
                </div>

                <nav className="mt-6">
                  <ul className="space-y-2">
                    {navLinks.map((link) => (
                      <li key={link.label}>
                        <SheetClose asChild>
                          <Link
                            href={link.href}
                            className="block px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-primary font-medium text-base transition-colors"
                          >
                            {link.label}
                          </Link>
                        </SheetClose>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <SheetClose asChild>
                  <Link href="/login" className="block w-full">
                    <Button className="w-full bg-primary hover:bg-[#123258] text-white h-11 rounded-lg text-base font-semibold flex items-center justify-center gap-2">
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
