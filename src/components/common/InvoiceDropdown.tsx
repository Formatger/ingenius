import React, { useState, useRef, useEffect } from "react";
import { Arrow } from "@/components/assets/svg/Arrow";

interface InvoiceDropdownProps {
  selectedValue: string;  
  onSelect: (value: string) => void; 
}

const InvoiceDropdown: React.FC<InvoiceDropdownProps> = ({
  selectedValue,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="form-box" ref={ref}>
      <span className="smallcaps">INVOICE STATUS*</span>
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        {selectedValue}
        <Arrow className={isOpen ? "arrow-up" : "arrow-down"} />
      </div>
      {isOpen && (
        <div className="dropdown-list">
          <div className="dropdown-item" onClick={() => handleSelect("Paid")}>Paid</div>
          <div className="dropdown-item" onClick={() => handleSelect("Unpaid")}>Unpaid</div>
        </div>
      )}
    </div>
  );
};

export default InvoiceDropdown;