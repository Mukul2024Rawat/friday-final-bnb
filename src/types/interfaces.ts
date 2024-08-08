import { ChangeEvent } from "react";
import { IconType } from "react-icons/lib";

export interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}
export interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

export interface Destination {
  name: string;
  unique: string;
}

export interface DestinationsData {
  [key: string]: Destination[];
}
export interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}
export interface ContatinerProps {
  children: React.ReactNode;
}
export interface AvatarProps {
  src: string | null | undefined;
}
export interface MenuItemProps {
    onClick: () => void;
    label: string;
  }
  