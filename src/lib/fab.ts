export const FAB_SIZE = 52;
export const FAB_PADDING = 8;

/** Bottom-left dock. `indexFromBottom` 0 sits on the edge; 1 stacks above it. */
export function fabStartPosition(indexFromBottom = 0) {
  return {
    x: FAB_PADDING,
    y:
      window.innerHeight -
      FAB_PADDING -
      FAB_SIZE -
      indexFromBottom * (FAB_SIZE + FAB_PADDING),
  };
}
