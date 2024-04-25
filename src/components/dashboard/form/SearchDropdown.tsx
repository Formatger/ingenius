import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import SearchIcon from "../../assets/icons/search.svg";
import Arrow from "@/components/assets/svg/Arrow";

interface SearchDropdownProps {
  data: any[];  // Generic data array
  onSelect: (selectedItem: any) => void;  // Generic selection handler
  placeholder?: string;
  handleSearch: (search: string) => void;  // Function to handle search input changes
  displayKey: string;  // Key to display and search in data objects
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({
    data,
    onSelect,
    placeholder = "Search...",
    handleSearch,
    displayKey
}) => {
    const [inputTerm, setInputTerm] = useState('');
    const [displayTerm, setDisplayTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     if (inputTerm === '') {
    //         setFilteredData(data.slice(0, 5)); // Show default items or some other logic
    //     } else {
    //         setFilteredData(data.filter(item => item[displayKey]?.toLowerCase().includes(inputTerm.toLowerCase())));
    //     }
    // }, [inputTerm, data, displayKey]);

    useEffect(() => {
      setFilteredData(data.filter(item => item[displayKey]?.toLowerCase().includes(inputTerm.toLowerCase())));
  }, [inputTerm, data, displayKey]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelectItem = (item: any) => {
        setDisplayTerm(item[displayKey]);
        setInputTerm('');
        onSelect(item);
        setShowDropdown(false);
    };

    return (
        <div ref={dropdownRef} className="dropdown-container">
            <div className="dropdown-header" onClick={() => setShowDropdown(!showDropdown)}>
                {displayTerm || placeholder}
                <Arrow className={`${showDropdown ? "" : "arrow-down"}`} />
            </div>
            {showDropdown && (
                <div className="dropdown-list">
                  
                    <input
                        type="text"
                        className="dropdown-search"
                        value={inputTerm}
                        onChange={(e) => {
                            setInputTerm(e.target.value);
                            handleSearch(e.target.value);
                        }}
                        placeholder="Search"
                    />

                    {filteredData.map((item, index) => (
                        <div key={index} className="dropdown-item" onClick={() => handleSelectItem(item)}>
                            {item[displayKey]}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchDropdown;
