import React, { ChangeEvent, FC } from 'react';
import styles from './Select.module.css'

export type Option = {
  label: string;
  value: string;
};

type SelectComponentProps = {
  options: Option[];
  label: string;
  onChange?: (value: string) => void;
  value?: string;
};

const SelectComponent: FC<SelectComponentProps> = ({ options, label, onChange, value }) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    onChange?.(newValue);
  };

  return (
    <label>
      {label}:
      <select value={value} className={styles.select} onChange={handleChange}>
        {options.map((option) => (
          <option key={option.value} className={styles.options}  value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default SelectComponent;
