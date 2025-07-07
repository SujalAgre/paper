"use client"
import Interface from "@/components/Interface";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function Home() {
  const [sidebar, setSidebar] = useState<boolean>(false);

  return (
    <>
      <div className="flex">
        {sidebar && <div className="border-r-1 bg-white h-screen w-80 border-[#948979]">
        {/*  <Sidebar setSidebar={setSidebar}/> */}
        </div>}

        <div className="w-full">
          <Interface sidebar={sidebar} setSidebar={setSidebar}/>
        </div>
      </div>

    </>
  );
}
