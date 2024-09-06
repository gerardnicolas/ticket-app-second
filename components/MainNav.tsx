"use client"

import Link from 'next/link';
import React from 'react';
import { ModeToggle } from './ModeToggle';
import { Button } from './ui/button';
import MainNavLinks from './MainNavLinks';

const MainNav = () => {
  return (
    <div className="flex justify-between">
      <MainNavLinks />
      <div className="flex items-center gap-4">
        <Button>Logout</Button>
        <ModeToggle />
      </div>
    </div>
  );
};

export default MainNav;
