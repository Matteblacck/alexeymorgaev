import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function setLenisInstance(instance: Lenis | null) {
  lenisInstance = instance;
}

export function getLenisInstance() {
  return lenisInstance;
}

export function stopSmoothScroll() {
  lenisInstance?.stop();
}

export function startSmoothScroll() {
  lenisInstance?.start();
}

export function scrollToElement(element: HTMLElement, scrollOffset = 0) {
  if (lenisInstance) {
    lenisInstance.scrollTo(element, { duration: 1.1, lock: true, offset: scrollOffset });
    return;
  }

  const targetTop = element.getBoundingClientRect().top + window.scrollY + scrollOffset;
  window.scrollTo({ top: targetTop, behavior: "smooth" });
}
