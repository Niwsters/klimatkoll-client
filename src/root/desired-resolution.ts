function scalePixelRatio(pixels: number) {
  return pixels * window.devicePixelRatio
}

export function desiredWidth(element: HTMLElement): number {
  const viewportWidth = element.clientWidth
  const viewportHeight = element.clientHeight
  if (viewportHeight / viewportWidth < 0.5625)
    return scalePixelRatio(viewportHeight) / 0.5625;

  return scalePixelRatio(viewportWidth);
}

export function desiredHeight(element: HTMLElement): number {
  return desiredWidth(element) * 0.5625
}
