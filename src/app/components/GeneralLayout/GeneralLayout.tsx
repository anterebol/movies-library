import { ReactNode, useState } from "react";
import { ModalEstimate } from "../ModalEstimate/ModalEstimate";
import { Navbar } from "../NavBar/NabBar";

export const GeneralLayout = ({children}: {children: ReactNode}) => {
  const [openedNav, setOpenedNav] = useState(false)
  return (
    <>
      
      <Navbar />
      <ModalEstimate />
      {children}
    </>
  )
}

