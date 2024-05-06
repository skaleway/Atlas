import React from "react";
import {} from "lucide-react";

const SearchTeam = () => {
  return (
    <div className="border px-3 h-8 rounded">
      <input
        type="text"
        placeholder="Search team"
        className="bg-transparent focus:outline-none outline-none h-full"
      />
    </div>
  );
};

export default SearchTeam;
