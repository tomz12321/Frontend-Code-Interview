'use client';
import React from 'react';
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <div className="w-full h-20 bg-emerald-800 smart-scroll">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <ul className="hidden md:flex gap-x-6 text-white">
              <li>
                  <p>Jedi Software</p>
              </li>
              <li>
                <Link href="/">
                  <p>Homepage</p>
                </Link>
              </li>
              <li>
                <Link href="/find-the-cheese">
                  <p>Find the Cheese</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;