import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // ensure the calendar CSS is imported

interface DateInputProps {
  name: string; // Name of the input for form submission
  onChange: (date: Date) => void; // Handler to update parent component state or context
}

const DateInput: React.FC<DateInputProps> = ({ name, onChange }) => {
  const [date, setDate] = useState<Date>(new Date());

  const handleDateChange = (newDate: Date | Date[]) => {
    const selectedDate = Array.isArray(newDate) ? newDate[0] : newDate; // Handling single date selection
    setDate(selectedDate);
    onChange(selectedDate); // Call the parent handler
  };

  return (
    <div>
      {/* <Calendar
        onChange={handleDateChange}
        value={date}
        className="calendar-custom-style"
      />
      <input
        type="date"
        name={name}
        value={date.toISOString().substring(0, 10)} // Formats date as 'YYYY-MM-DD'
      /> */}
    </div>
  );
};

export default DateInput;
