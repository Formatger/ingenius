import React, { useState, useRef, useEffect } from "react";
import { Arrow } from "@/components/assets/svg/Arrow";

interface InvoiceDropdownProps {
  selectedValue: string;  // "Paid" or "Unpaid"
  onSelect: (value: string) => void;  // Handler to update the state in the parent component
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

// import React, { useEffect, useState, useRef } from "react";
// import { Arrow } from "@/components/assets/svg/Arrow"; // Ensure this import path is correct
// import { UseFormSetValue, FieldErrorsImpl } from "react-hook-form";

// interface InvoiceDropdownProps {
//   setValue: UseFormSetValue<any>;
//   trigger: (field: string) => void;
//   errors: FieldErrorsImpl<any>;
// }

// const InvoiceDropdown: React.FC<InvoiceDropdownProps> = ({
//   setValue,
//   trigger,
//   errors
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedStatus, setSelectedStatus] = useState<boolean | null>(false); // Initialized as false representing "Unpaid"
//   const ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     // Set the default value for the form
//     setValue("invoice_paid", false); // Ensures backend receives "Unpaid" if no interaction occurs
//     trigger("invoice_paid");
//   }, [setValue, trigger]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (ref.current && !ref.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleSelect = (value: boolean) => {
//     setSelectedStatus(value);
//     setValue("invoice_paid", value);
//     trigger("invoice_paid");
//     setIsOpen(false);
//   };

//   return (
//     <div className="form-box" ref={ref}>
//       <span className="smallcaps">INVOICE STATUS*</span>
//       <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
//         {selectedStatus ? "Paid" : "Unpaid"}
//         <Arrow className={isOpen ? "arrow-up" : "arrow-down"} />
//       </div>
//       {isOpen && (
//         <div className="dropdown-list">
//           <div className="dropdown-item" onClick={() => handleSelect(true)}>Paid</div>
//           <div className="dropdown-item" onClick={() => handleSelect(false)}>Unpaid</div>
//         </div>
//       )}
//       {errors.invoice_paid && (
//         <span className="error-message"></span>
//       )}
//     </div>
//   );
// };

// export default InvoiceDropdown;
