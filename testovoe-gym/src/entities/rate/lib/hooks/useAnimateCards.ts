import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { usePriceCards } from "./usePriceCards";
import { Breakpoints } from "src/shared/types/breakpoints";

export const useAnimateCards = (
  listRef: React.RefObject<HTMLUListElement>,
  discountActive: boolean,
  functions: ReturnType<typeof usePriceCards>["functions"]
) => {
  const reverseAnimateCard = (element: Element) => {
    const card = element.firstElementChild;
    if (!card) return console.log("reverse-animation failed");
    const internalCards = card?.querySelectorAll(".rate-card");
    if (!internalCards) return;
    const discountBadge = internalCards.item(0)?.querySelector(".discount-badge") as HTMLDivElement;
    if (!discountBadge) return;

    setTimeout(() => {
      discountBadge.style["transform"] = "revert-layer";
      (internalCards.item(0) as HTMLDivElement).style["display"] = "flex";
      (internalCards.item(1) as HTMLDivElement).style["display"] = "none";
      (internalCards.item(1) as HTMLDivElement).style["position"] = "absolute";
      (card as HTMLDivElement).style["transform"] = "none";
    }, 0);
  };

  const animateCard = (element: Element, direction: "horizontal" | "vertical", delay?: number) => {
    const cardTL = gsap.timeline();
    const card = element.firstElementChild;
    if (!card) return console.log("Animation failed");
    const internalCards = card?.querySelectorAll(".rate-card");
    if (!internalCards) return;
    const discountBadge = internalCards.item(0)?.querySelector(".discount-badge");
    if (!discountBadge) return;
    const discountTL = gsap.timeline();

    const horizontal1Config: gsap.TweenVars = {
      duration: 1,
      rotateY: 90,
      ease: "elastic.in",
      onComplete: () => {
        (internalCards.item(0) as HTMLDivElement).style["display"] = "none";
        (internalCards.item(1) as HTMLDivElement).style["display"] = "flex";
        (internalCards.item(1) as HTMLDivElement).style["position"] = "relative";
      },
      delay
    };
    const horizontal2Config: gsap.TweenVars = {
      duration: 1,
      ease: "elastic.out",
      rotateY: 180
    };

    const vertical1Config: gsap.TweenVars = {
      duration: 1,
      rotateX: 90,
      ease: "elastic.in",
      onComplete: () => {
        (internalCards.item(0) as HTMLDivElement).style["display"] = "none";
        (internalCards.item(1) as HTMLDivElement).style["display"] = "flex";
        (internalCards.item(1) as HTMLDivElement).style["position"] = "relative";
        (internalCards.item(1) as HTMLDivElement).style["transform"] = "rotateX(180deg)";
      },
      delay
    };
    const vertical2Config: gsap.TweenVars = {
      duration: 1,
      ease: "elastic.out",
      rotateX: 180
    };

    cardTL
      .to(card, direction === "horizontal" ? horizontal1Config : vertical1Config)
      .to(card, direction === "horizontal" ? horizontal2Config : vertical2Config);

    discountTL
      .to(discountBadge, {
        delay: delay ? delay + 1 : 1,
        duration: 0.1,
        translateY: 40,
        ease: "elastic.in"
      })
      .clear(true);
  };

  useGSAP(
    () => {
      const _nodes = listRef.current?.querySelectorAll(".rate__option");
      const nodes = [..._nodes!];
      const firstRow = nodes.slice(0, 3);
      const secondRow = nodes[3];

      if (discountActive) {
        // откат стилей (не рабоотает если преключить timer-time во время анимации (onInterrupt не помогает))
        nodes?.forEach(el => {
          reverseAnimateCard(el);
        });

        functions.selectCard(null);
        return;
      } else {
        // где сама анимация вызывается
        firstRow?.forEach((el, idx) => {
          animateCard(el, "horizontal", idx * 0.1);
        });
        animateCard(secondRow, window.innerWidth <= Breakpoints["md-custom"] ? "horizontal" : "vertical", 0.4);
        functions.selectCard(null);
      }
    },
    { dependencies: [discountActive, listRef.current], scope: listRef }
  ); // анимация карточек
};
