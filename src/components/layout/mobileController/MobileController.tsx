"use client"

import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import * as Popover from "@radix-ui/react-popover"
import { Heading } from "contentlayer/generated"

import DocumentTOC from "@/components/documentTOC/DocumentTOC"
import { useDevice } from "@/components/providers/deviceWidthProvider"

interface MobileControllerProps {
  headings?: Heading[]
}

const MobileController = (props: MobileControllerProps) => {
  const { isMobile, isTablet } = useDevice()

  if (!isMobile && !isTablet) {
    return null
  }

  return (
    <div className="mobile-controller">
      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            className="mobile-controller__button"
            aria-label="Update dimensions"
          >
            <HamburgerMenuIcon />
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            className="mobile-controller__content"
            sideOffset={4}
            side="top"
            arrowPadding={10}
          >
            <Popover.Arrow
              className="mobile-controller__arrow"
              width={20}
              height={12}
            />
            <DocumentTOC headings={props.headings} />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  )
}

export default MobileController
