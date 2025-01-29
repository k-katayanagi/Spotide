// ListSelect.tsx
import React from "react";

type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
  onSelect: (value: string) => void;
};

const ListSelect: React.FC<Props> = ({ options, onSelect }) => {
  return (
    <select onChange={(e) => onSelect(e.target.value)} style={{ padding: "10px" }}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default ListSelect;
