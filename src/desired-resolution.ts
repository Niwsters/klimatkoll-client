import { Root } from './root'

function scalePixelRatio(pixels: number) {
  return pixels * window.devicePixelRatio
}

export function desiredWidth(root: Root): number {
  const viewportWidth = root.element.clientWidth
  const viewportHeight = root.element.clientHeight
  if (viewportHeight / viewportWidth < 0.5625)
    return scalePixelRatio(viewportHeight) / 0.5625;

  return scalePixelRatio(viewportWidth);
}

export function desiredHeight(root: Root): number {
  return desiredWidth(root) * 0.5625
}
