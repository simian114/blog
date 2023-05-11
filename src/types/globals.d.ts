type Combine<T, K> = T & Omit<K, keyof T>

type CombineElementProps<T extends ElementType, K = unknown> = Combine<
  K,
  ComponentPropsWithoutRef<T>
>
