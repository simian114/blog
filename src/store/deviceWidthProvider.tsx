"use client"
import {
  createContext,
  useContext,
  useLayoutEffect,
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

export default function DeviceWidthProvider(props: any) {
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

  useLayoutEffect(() => {
    onResizeDevice()
    window.addEventListener("resize", onResizeDevice)
    return () => {
      window.removeEventListener("resize", onResizeDevice)
    }
  }, [])

  return (
    <DeviceWidthProviderContext.Provider value={{ device }}>
      {props?.children}
    </DeviceWidthProviderContext.Provider>
  )
}
