import React from "react";

interface InputComponentProps {
  labelName: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputComponent: React.FC<InputComponentProps> = ({
  labelName,
  value,
  onChange,
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={labelName}
    />
  );
};
