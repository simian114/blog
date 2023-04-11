"use client"

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

// 브라우저의 현재 크기에 따른 분류.
type Device = "mobile" | "tablet" | "labtop" | "desktop"

interface IDeviceWidthProviderContext {
  device: Device | undefined
}

export const DeviceWidthProviderContext = createContext<
  undefined | IDeviceWidthProviderContext
>(undefined)

export const useDevice = () => {
  const context = useContext(DeviceWidthProviderContext)
  const ret = useMemo(() => {
    return {
      isMobile: context?.device === "mobile",
      isTablet: context?.device === "tablet",
      isLabtop: context?.device === "labtop",
      isDesktop: context?.device === "desktop",
    }
  }, [context?.device])

  return ret
}
export default function DeviceWidthProvider({
  children,
}: {
  children: ReactNode
}) {
  const [device, setDevice] = useState<Device | undefined>(undefined)

  useEffect(() => {
    const mqls = [
      window.matchMedia(`(max-width: ${768}px)`),
      window.matchMedia(`(min-width: ${768 + 1}px) and (max-width: ${1024}px)`),
      window.matchMedia(
        `(min-width: ${1024 + 1}px) and (max-width: ${1280}px)`
      ),
      window.matchMedia(`(min-width: ${1280 + 1}px)`),
    ]

    function mediaQueryHandler(mql: MediaQueryListEvent) {
      if (mqls[0].media === mql.media && mql.matches) {
        setDevice("mobile")
      } else if (mqls[1].media === mql.media && mql.matches) {
        setDevice("tablet")
      } else if (mqls[2].media === mql.media && mql.matches) {
        setDevice("labtop")
      } else if (mqls[3].media === mql.media && mql.matches) {
        setDevice("desktop")
      }
    }

    function initDevice() {
      mqls.map((mql, idx) => {
        if (mql.matches) {
          if (idx === 0) {
            setDevice("mobile")
          } else if (idx === 1) {
            setDevice("tablet")
          } else if (idx === 2) {
            setDevice("labtop")
          } else if (idx === 3) {
            setDevice("desktop")
          }
        }
        mql.addListener(mediaQueryHandler)
      })
    }
    initDevice()
    return () => {
      mqls?.forEach(mql => mql.removeListener(mediaQueryHandler))
    }
  }, [])

  return (
    <DeviceWidthProviderContext.Provider value={{ device }}>
      {children}
    </DeviceWidthProviderContext.Provider>
  )
}
