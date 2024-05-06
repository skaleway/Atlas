import React from "react";

import zenith from "@/public/zenith.jpg";
import Image from "next/image";

const Messsage = () => {
  return (
    <div className="p-6 odd:bg-foreground flex gap-2">
      <Image
        height={24}
        width={24}
        alt="user Image"
        src={zenith}
        className="rounded-full object-cover w-6 h-6 border min-w-[24px]"
      />
      <div>
        <div>
          <p className="flex gap-4 items-center text-sm">
            <span className="font-semibold">Zenith noble</span>
            <span className="text-gray-400 text-xs">17:49</span>
          </p>
          <p className="text-zinc-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum
            culpa quis aperiam magnam nisi optio qui animi ratione vero soluta
            nostrum a, ad fugit atque, in incidunt unde consequatur assumenda?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Messsage;
