import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Arrow from "../assets/svg/Arrow";
import { set } from "react-hook-form";

const timeframes = [
  { id: "tf-1", value: "All" },
  { id: "tf-2", value: "Last 7 Days" },
  { id: "tf-3", value: "This Month" },
  { id: "tf-4", value: "This Year" },
  // { id: "tf-4", value: "Custom" },
];

interface DropdownProps {
  data?: any;
  noSlicedData?: any;
  setData?: any;
  origin?: string;
}

function Dropdown({ data, origin, setData, noSlicedData }: DropdownProps) {
  const [isTimeframeOpen, setIsTimeframeOpen] = useState(false);
  const [isPeopleOpen, setIsPeopleOpen] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframes[0]);

  const [partnerSearchFilter, setPartnerSearchFilter] = useState([]);
  const [partnerSearchOptions, setPartnerSearchOptions] = useState([]);
  const [showSuggestionDropdown, setShowSuggestionDropdown] = useState(false);
  const [dataCopy, setDataCopy] = useState([]);
  const [radialValue, setRadialValue] = useState("");

  const selectedFiltersRef = useRef<string[]>([]);
  const searchValue = useRef<string>("");
  const filterRef = useRef(null);
  const timeframeRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (filterRef.current && !(filterRef.current as HTMLElement).contains(event.target)) {
        setIsPeopleOpen(false);
      }
    };

    const handleClickOutsideTimeframe = (event: any) => {
      if (timeframeRef.current && !(timeframeRef.current as HTMLElement).contains(event.target)) {
        setIsTimeframeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("mousedown", handleClickOutsideTimeframe);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousedown", handleClickOutsideTimeframe);
    };
  }, []);

  const handleSelectTimeframe = (tf: any) => {
    if (isTimeframeOpen) selectedFiltersRef.current = [];
    setSelectedTimeframe(tf);
    setIsTimeframeOpen(false);

    switch (tf.id) {
      case "tf-1": {
        setData(dataCopy);
        break;
      }
      case "tf-2": {
        const today = new Date();
        const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const filteredData = dataCopy.filter((item: any) => {
          const createdAt = new Date(item.created_at);
          return createdAt >= sevenDaysAgo && createdAt <= today;
        });
        setData(filteredData);
        break;
      }
      case "tf-3": {
        const currentMonth = new Date().getMonth();
        const filteredData = dataCopy.filter((item: any) => {
          const createdAt = new Date(item.created_at);
          return createdAt.getMonth() === currentMonth;
        });
        setData(filteredData);
        break;
      }
      case "tf-4": {
        const currentYear = new Date().getFullYear();
        const filteredData = dataCopy.filter((item: any) => {
          const createdAt = new Date(item.created_at);
          return createdAt.getFullYear() === currentYear;
        });
        setData(filteredData);
        break;
      }
      default:
        break;
    }
  };

  useEffect(() => {
    if (data && (data.length === dataCopy.length || dataCopy.length === 0)) {
      setPartnerSearchOptions(Array.from(new Set(noSlicedData?.flatMap((item: any) => [item.creator_name, item.brand_name].filter(Boolean)))))
      setDataCopy(noSlicedData)
    }
  }, [data]);

  useEffect(() => {
    defineSearchableFields()
  }, [radialValue]);

  const defineSearchableFields = () => {
    const fields = (item: any) => {
      if (origin === "projects") {
        return [item.creator_name, item.brand_name];
      } else {
        return [item.name, item.brand_name];
      }
    }

    switch (radialValue) {
      case "brands": {
        setPartnerSearchOptions(Array.from(new Set(noSlicedData?.flatMap((item: any) => [item.brand_name].filter(Boolean)))))
        break;
      }
      case "creators": {
        setPartnerSearchOptions(Array.from(new Set(noSlicedData?.flatMap((item: any) => [item.creator_name].filter(Boolean)))))
        break;
      }
      case "deals": {
        setPartnerSearchOptions(Array.from(new Set(noSlicedData?.flatMap((item: any) => [item.name].filter(Boolean)))))
        break;
      }
      case "campaigns": {
        setPartnerSearchOptions(Array.from(new Set(noSlicedData?.flatMap((item: any) => [item.name].filter(Boolean)))))
        break;
      }
      case "": {
        setPartnerSearchOptions(Array.from(new Set(noSlicedData?.flatMap((item: any) => fields(item).filter(Boolean)))))
        break;
      }
      default: {
        setPartnerSearchOptions(Array.from(new Set(noSlicedData?.flatMap((item: any) => fields(item).filter(Boolean)))))
        break;
      }
    }
  }

  /**
   * Type can be 'people', 'timeframe'
   * If type it's one of these we close the other;
   * @param type
   */
  const handleOpenFilter = (type: string) => {
    switch (type) {
      case "people":
        setIsPeopleOpen(!isPeopleOpen);
        setIsTimeframeOpen(false);
        break;
      case "niche": {
        setIsPeopleOpen(false);
        setIsTimeframeOpen(false);
        break;
      }
      case "timeframe":
        setIsPeopleOpen(false);
        setIsTimeframeOpen(!isTimeframeOpen);
        break;
    }
  };

  const displayTimeframeFilter = () => {
    return (
      <div className="filter" ref={timeframeRef}>
        <button
          className={isTimeframeOpen ? "dropdownButtonOpen" : "dropdownButton"}
          onClick={() => handleOpenFilter("timeframe")}
        >
          <p>{`Timeframe: ${selectedTimeframe.value}`}</p>
          <Arrow className={`${isTimeframeOpen ? "" : "arrow-down"}`} />
        </button>
        {isTimeframeOpen && (
          <ul className="dropdownListStick">
            <div className="hr-line"></div>
            {timeframes.map((tf) => (
              <li className="dropdownListItem" key={tf.id}>
                <button
                  className="dropdownItem"
                  onClick={() => handleSelectTimeframe(tf)}
                >
                  {tf.value}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  const handleSelectFilter = (value: string) => {
    handleSelectTimeframe(timeframes[0]);
    searchValue.current = "";
    setShowSuggestionDropdown(false);
    selectedFiltersRef.current = [...selectedFiltersRef.current, value]
    const filteredData = [...dataCopy.filter((item: any) => {
      const { brand_name, creator_name, name } = item;
      return (
        (brand_name && selectedFiltersRef.current.includes(brand_name)) ||
        (creator_name && selectedFiltersRef.current.includes(creator_name)) ||
        (name && selectedFiltersRef.current.includes(name))
      );
    })];
    setData(filteredData)
  };

  const handleRemoveFilter = (value: string) => {
    handleSelectTimeframe(timeframes[0]);
    selectedFiltersRef.current = selectedFiltersRef.current.filter((filter: string) => filter !== value)
    if (selectedFiltersRef.current.length === 0) {
      setData(dataCopy)
    } else {
      const filteredData = [...dataCopy.filter((item: any) => {
        const { brand_name, creator_name, name, campaign_name } = item;
        return (
          (brand_name && selectedFiltersRef.current.includes(brand_name)) ||
          (creator_name && selectedFiltersRef.current.includes(creator_name)) ||
          (name && selectedFiltersRef.current.includes(name))
        );
      })];
      setData(filteredData)
    }
  }

  const displayPeopleFilter = () => {
    return (
      <div className="filter" ref={filterRef}>
        <button
          className={isPeopleOpen ? "dropdownButtonOpen" : "dropdownButton"}
          onClick={() => handleOpenFilter("people")}
        >
          {`Partner: ${selectedFiltersRef.current.length === 1 ? selectedFiltersRef.current[0] : selectedFiltersRef.current.length === 0 ? `All` : "Multiple Selected"}`}
          <Arrow className={`${isPeopleOpen ? "" : "arrow-down"}`} />
        </button>
        {isPeopleOpen && (
          <div className="dropdownListStick">
            <div className="hr-line"></div>
            <div className="peopleFiltersSection">
              <div className="dropdownSection">
                {selectedFiltersRef.current.map((filter: string) => (
                  <div className="chip">{filter}
                    <button className="chipClose" onClick={() => handleRemoveFilter(filter)}>X</button>
                  </div>
                ))}
              </div>
              <div className="dropdownSection">
                <h3 className="dropdownSectionTitle">Groups</h3>
                <div className="radialSelector">
                  <label>
                    <input type="radio" name="group" value="" checked={radialValue === ""} defaultChecked={radialValue === ""} onChange={() => setRadialValue("")} />
                    All Groups
                  </label>
                  <label>
                    <input type="radio" name="group" value="brands" checked={radialValue === "brands"} onChange={() => setRadialValue("brands")} />
                    Brands
                  </label>
                  {origin === "deals" ? (
                    <label>
                      <input type="radio" name="group" value="deals" checked={radialValue === "deals"} onChange={() => setRadialValue("deals")} />
                      Deals
                    </label>
                  ) : origin === "campaigns" ? (
                    <label>
                      <input type="radio" name="group" value="campaigns" checked={radialValue === "campaigns"} onChange={() => setRadialValue("campaigns")} />
                      Campaigns
                    </label>
                  ) : (
                    <label>
                      <input type="radio" name="group" value="creators" checked={radialValue === "creators"} onChange={() => setRadialValue("creators")} />
                      Creators
                    </label>
                  )}
                </div>
              </div>
              <h3 className="dropdownSectionTitle">Search</h3>
              <div className="searchContainer" style={{ backgroundColor: showSuggestionDropdown ? "#F9FAFB" : "#FFF" }}>
                <input
                  type="text"
                  placeholder="Search..."
                  className="searchInput"
                  value={searchValue.current}
                  onChange={(e) => {
                    searchValue.current = e.target.value;
                    if (searchValue.current.length > 0 && !showSuggestionDropdown) setShowSuggestionDropdown(true)
                    if (searchValue.current.length === 0) setShowSuggestionDropdown(false)

                    const filteredOptions: any = (partnerSearchOptions as string[]).filter((option: string) =>
                      option.toLowerCase().includes(searchValue.current.toLowerCase()) && !selectedFiltersRef.current.includes(option)
                    );

                    setPartnerSearchFilter(filteredOptions);
                  }}
                />
                {showSuggestionDropdown && (
                  <ul className="suggestionDropdown">
                    {partnerSearchFilter.map((option: any) => (
                      <li className="dropdownSearchRow" key={option}>
                        <button
                          className="dropdownSearchItem"
                          onClick={() => handleSelectFilter(option)} // Replace handleSelectPartner with handleSelectFilter
                        >
                          {option}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const displayNicheFilter = () => {
    return (
      <div className="filter">
        <button
          className={"dropdownButton"}
          onClick={() => handleOpenFilter("niche")}
        >
          {`Niche: All`}
        </button>
      </div>
    );
  };

  return (
    <div className="filtersContainer">
      {displayTimeframeFilter()}
      {displayPeopleFilter()}
      {displayNicheFilter()}
    </div>
  );
}

Dropdown.propTypes = {};

export default Dropdown;
