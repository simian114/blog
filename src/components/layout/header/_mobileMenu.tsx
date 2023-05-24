"use client"
import { ReactElement } from "react"

import DisableScroll from "@/components/client/DisableScroll"
import { useDevice } from "@/store/deviceWidthProvider"

interface HeaderMobileMenuProps {
  toggleMobileMenu: () => void
  open: boolean
}

function HeaderMobileMenu(props: HeaderMobileMenuProps): ReactElement {
  const { isMobile } = useDevice()

  return (
    <>
      <DisableScroll enable={props.open && isMobile} />
      <button
        className="navigation__utils__mobile-menu"
        onClick={props.toggleMobileMenu}
      >
        <div className={`mobile-menu ${props.open ? "open" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
    </>
  )
}

export default HeaderMobileMenu
