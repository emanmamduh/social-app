import React from "react";
import { Label, SearchField } from "@heroui/react";

export default function BarSearch() {
  return (
    <div>
      <div className="hidden md:block">
        <SearchField name="search">
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input className="w-60" placeholder="Search..." />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>
      </div>
        <div className="md:hidden  search size-11 rounded-full bg-white flex items-center justify-center">
            <i className="fa-solid fa-magnifying-glass text-black text-[20px]"></i>
        </div>
    </div>
  );
}
