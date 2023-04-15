"use client"

import * as Popover from "@radix-ui/react-popover"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import { Heading } from "contentlayer/generated"
import DocumentTOC from "@/components/documentTOC/DocumentTOC"

interface MobileControllerProps {
  headings?: Heading[]
}

const MobileController = (props: MobileControllerProps) => (
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

export default MobileController
