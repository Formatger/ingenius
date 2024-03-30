import React, { useState } from "react";
import Search from "@/assets/icons/search.svg";

const DATA_FILTERS = {
  1: "Today",
  2: "Yesterday",
  3: "Week",
  4: "Month",
};

interface EasyFiltersProps {
  handleSearch: (search: string) => void;
}

export default function EasyFilters({ handleSearch }: EasyFiltersProps) {
  const [selectedFilter, setSelectedFilter] = useState<string | undefined>(undefined);

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter === selectedFilter ? undefined : filter);
  };

  return (
    <div className="campaigns-filters-container">
      <div className="easyfilters-container">
        <button
          value={DATA_FILTERS[1]}
          className={
            selectedFilter === DATA_FILTERS[1]
              ? "easyfilters-slide"
              : "easyfilters-button"
          }
          onClick={() => handleFilterClick(DATA_FILTERS[1])}
        >
          Today
        </button>
        <button
          value={DATA_FILTERS[2]}
          className={
            selectedFilter === DATA_FILTERS[2]
              ? "easyfilters-slide"
              : "easyfilters-button"
          }
          onClick={() => handleFilterClick(DATA_FILTERS[2])}
        >
          Yesterday
        </button>
        <button
          value={DATA_FILTERS[3]}
          className={
            selectedFilter === DATA_FILTERS[3]
              ? "easyfilters-slide"
              : "easyfilters-button"
          }
          onClick={() => handleFilterClick(DATA_FILTERS[3])}
        >
          Week
        </button>
        <button
          value={DATA_FILTERS[4]}
          className={
            selectedFilter === DATA_FILTERS[4]
              ? "easyfilters-slide"
              : "easyfilters-button"
          }
          onClick={() => handleFilterClick(DATA_FILTERS[4])}
        >
          Month
        </button>
      </div>
      <div>
        {/* <div>
          <Image src={Search} alt="Icon" width={20} height={20} />
        </div> */}
        <input
          type="text"
          placeholder="Search"
          className="campaigns-search"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
