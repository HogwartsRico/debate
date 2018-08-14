export const addModifiers = (className, modifiers) => {
  if (modifiers.length) {
    return modifiers.reduce((acc, modifier) => `${acc} ${modifier}`, className)
  }

  return className
}
