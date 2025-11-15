import React from 'react';
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';

export interface CustomCheckboxProps extends CheckboxProps {

  children?: React.ReactNode;

  onChange: () => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  children,
  checked,
  onChange,

}) => (
  <Checkbox onChange={onChange} checked={checked}>
    {children}
  </Checkbox>
);



export default CustomCheckbox;
