import React, { useState, useRef, useEffect, forwardRef } from "react";
import Image from "next/image";
import SearchIcon from "../../assets/icons/search.svg";
import Arrow from "@/components/assets/svg/Arrow";

interface SearchDropdownProps {
    data: any[];
    onSelect: (selectedItem: any) => void;
    placeholder?: string;
    handleSearch: (search: string) => void; 
    displayKey: string; 
}

const SearchDropdown: React.ForwardRefRenderFunction<HTMLDivElement, SearchDropdownProps> = ({
    data,
    onSelect,
    placeholder = "Search...",
    handleSearch,
    displayKey
}, ref) => {
    const [inputTerm, setInputTerm] = useState('');
    const [displayTerm, setDisplayTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

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
                        ref={inputRef}
                    />

                    {filteredData?.map((item, index) => (
                        <div key={`fd-${index}`} className="dropdown-item" onClick={() => handleSelectItem(item)}>
                            {item[displayKey]}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default forwardRef(SearchDropdown);
