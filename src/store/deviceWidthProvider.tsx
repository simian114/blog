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

/**
 * media query 사용하는 로직으로 수정할것. 현재는 왜인지는 몰라도
 * 모바일로 접속했을 시 width 가 900px; 로 고정되서 모바일로 안바뀜
 *
 */
export default function DeviceWidthProvider({
  children,
}: {
  children: ReactNode
}) {
  const [device, setDevice] = useState<Device | undefined>(undefined)

  const onResizeDevice = () => {
    return window.innerWidth <= 768
      ? setDevice("mobile")
      : window.innerWidth <= 1024
      ? setDevice("tablet")
      : window.innerWidth <= 1280
      ? setDevice("labtop")
      : setDevice("desktop")
  }

  useEffect(() => {
    onResizeDevice()
    window.addEventListener("resize", onResizeDevice)
    return () => {
      window.removeEventListener("resize", onResizeDevice)
    }
  }, [])

  return (
    <DeviceWidthProviderContext.Provider value={{ device }}>
      {children}
    </DeviceWidthProviderContext.Provider>
  )
}
