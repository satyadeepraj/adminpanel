"use client";
import React, { useState } from "react";
import Projectable from "./Project-Table";
import Allblogs from "@/app/allBlogs/Allblogs";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
const SwitchCards = () => {
  const [isCardView, setIsCardView] = useState(false);

  const handleSwitchChange = () => {
    setIsCardView((prevState) => !prevState);
  };

  return (
    <div>
      <div className="flex items-center space-x-2">
        <Switch id="view-mode" onChange={handleSwitchChange} />
        <Label htmlFor="view-mode">{isCardView ? 'Table View' : 'Card View'}</Label>
      </div>
      {isCardView ? <Allblogs/> : <Projectable />}
    </div>
  );
};

export default SwitchCards;
