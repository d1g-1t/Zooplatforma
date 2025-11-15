
import React from 'react';
import { CSSProperties } from 'react';


export interface InputProps extends React.ComponentPropsWithoutRef<'input'> {

  type: 'text' | 'password' | 'email' | 'tel' | 'number';
  placeholder?: string;
  label?: string;
  error: string | undefined;
  className?: string;

  name: string;
  value?: string;
  classInput?: string;
  style?: CSSProperties;

}
