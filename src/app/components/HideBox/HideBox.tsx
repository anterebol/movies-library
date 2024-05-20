import { ReactNode } from "react";

export const HideBox = ({children, isShow}: {children: ReactNode, isShow: boolean}) => 
  isShow && children