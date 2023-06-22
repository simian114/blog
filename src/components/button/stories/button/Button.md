> A button triggers an action or event when activated.

# ALL

## Type

- primary
- seondary

## Size

- xlarge
- large
- medium
- small
- xsmall

## Icon

> { position: left | right, asset: ReactNode }

- { position: 'right', asset: <SunIcon /> }
- { position: 'left', asset: <MoonIcon /> }

## base design system

- shape
- typography
- fluid

## Usage

```tsx
function Container() {
  return (
    <Button
      design={{
        type: "primary",
        size: "small",
        icon: {
          position: "left",
          asset: <SunIcon />,
        },
      }}
      baseDesign={{
        typography: {
          variants: "h1",
          weight: "regular",
        },
      }}
    >
      React Node in here
    </Button>
  )
}
```
