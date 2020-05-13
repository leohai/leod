import { FC, InputHTMLAttributes, ReactElement, ChangeEvent } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
declare type INPUTSIZE = 'lg' | 'sm';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    size?: INPUTSIZE;
    prepend?: string | ReactElement;
    icon?: IconProp;
    append?: string | ReactElement;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
export declare const Input: FC<InputProps>;
export default Input;
