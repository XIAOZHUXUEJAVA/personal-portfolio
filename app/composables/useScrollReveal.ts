import { onBeforeUnmount, onMounted } from "vue";

export function useScrollReveal() {
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    // 只接管首屏以下的区块，首屏内容不参与隐藏，避免影响首屏渲染。
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    ).filter((target) => target.getBoundingClientRect().top > window.innerHeight * 0.9);
    if (!targets.length) return;

    targets.forEach((target) => target.classList.add("reveal-pending"));

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          observer?.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    targets.forEach((target) => observer?.observe(target));
  });

  onBeforeUnmount(() => observer?.disconnect());
}
