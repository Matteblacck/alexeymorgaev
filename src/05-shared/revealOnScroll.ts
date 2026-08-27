type RevealTarget = {
  selector: string;
  visibleClass: string;
  threshold?: number;
};

type RevealOptions = {
  rootMargin?: string;
  threshold?: number;
};

export function revealOnScroll(
  root: ParentNode | null,
  targets: RevealTarget[],
  options: RevealOptions = {}
) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const observers: IntersectionObserver[] = [];
  const scope = root ?? document;
  const rootMargin = options.rootMargin ?? "0px 0px 18% 0px";
  const defaultThreshold = options.threshold ?? 0.08;

  targets.forEach(({ selector, visibleClass, threshold }) => {
    const elements = Array.from(scope.querySelectorAll<HTMLElement>(selector));

    if (!elements.length) {
      return;
    }

    const reveal = (element: Element) => {
      element.classList.add(visibleClass);
    };

    if (!("IntersectionObserver" in window)) {
      elements.forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            reveal(entry.target);
            observerInstance.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin,
        threshold: threshold ?? defaultThreshold,
      }
    );

    elements.forEach((element) => {
      if (element.classList.contains(visibleClass)) {
        return;
      }

      observer.observe(element);
    });

    observers.push(observer);
  });

  return () => {
    observers.forEach((observer) => observer.disconnect());
  };
}
