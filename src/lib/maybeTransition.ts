export const maybeTransition = (
  transition: boolean,
  element: HTMLElement,
  fn: () => unknown
) => {
  if (!transition) {
    element.classList.add("no-transition");
    fn();
    setTimeout(() => {
      element.classList.remove("no-transition");
    }, 100);
  } else {
    fn();
  }
};
