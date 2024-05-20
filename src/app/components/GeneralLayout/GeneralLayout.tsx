import { ReactNode } from "react";
import { ModalEstimate } from "../ModalEstimate/ModalEstimate";
import { Navbar } from "../NavBar/NabBar";

export const GeneralLayout = ({children}: {children: ReactNode}) => {
  return (
    <>
      <Navbar />
      <ModalEstimate />
      {children}
    </>
  )
}

