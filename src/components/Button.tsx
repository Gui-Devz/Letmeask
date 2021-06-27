import {ButtonHTMLAttributes} from 'react';
import '../styles/button.scss';

import{useTheme} from "../hooks/useTheme";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
};

export function Button({isOutlined = false, ...props}: ButtonProps){
  const theme = useTheme();

  console.log(theme)
  return (
    <button className={`theme-${theme.theme}  button ${isOutlined ? 'outlined': ''}`} {...props}/>
  );
}
