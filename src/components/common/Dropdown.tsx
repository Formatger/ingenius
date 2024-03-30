import React, { useState } from "react";
import PropTypes from "prop-types";

const timeframes = [
  { id: "tf-1", value: "Last 7 Days" },
  { id: "tf-2", value: "This Month" },
  { id: "tf-3", value: "This Year" },
  { id: "tf-4", value: "Custom" },
];
function Dropdown() {
  const [isTimeframeOpen, setIsTimeframeOpen] = useState(false);
  const [isPeopleOpen, setIsPeopleOpen] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframes[0]);

  const handleSelectTimeframe = (tf: any) => {
    setSelectedTimeframe(tf);
    setIsTimeframeOpen(false);
  };

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
      <div className="filter">
        <button
          className={isTimeframeOpen ? "dropdownButtonOpen" : "dropdownButton"}
          onClick={() => handleOpenFilter("timeframe")}
        >
          {`Timeframe: ${selectedTimeframe.value}`}
        </button>
        {isTimeframeOpen && (
          <ul className="dropdownListStick">
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

  const displayPeopleFilter = () => {
    return (
      <div className="filter">
        <button
          className={"dropdownButton"}
          onClick={() => handleOpenFilter("people")}
        >
          {`People: All`}
        </button>
        {isPeopleOpen && (
          <div className="dropdownListSeparated">
            <div className="dropdownSection">
              <h3 className="dropdownSectionTitle">Partner</h3>
              <input
                type="text"
                className="dropdownInput"
                placeholder="Search"
              />
            </div>
            <div className="dropdownSection">
              <h3 className="dropdownSectionTitle">Groups</h3>
              <div className="radialSelector">
                <label>
                  <input type="radio" name="group" value="all" />
                  All Groups
                </label>
                <label>
                  <input type="radio" name="group" value="brands" />
                  Brands
                </label>
                <label>
                  <input type="radio" name="group" value="creators" />
                  Creators
                </label>
              </div>
            </div>
            <div className="dropdownSection">
              <h3 className="dropdownSectionTitle">Specific Search</h3>
              <input
                type="text"
                className="dropdownInput"
                placeholder="Search for a brand or creator"
              />
            </div>
            <button className="clearButton">Clear</button>
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
