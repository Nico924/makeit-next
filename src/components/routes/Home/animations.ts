export const textAnimation = ({ gsap, titleRef, subtitleRef }) => {
  const duration = 0.5;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: titleRef.current,
    },
    repeat: 0,
    repeatDelay: 0,
  });
  tl.to(titleRef.current, {
    startAt: { y: 100, opacity: 0 },
    duration,
    opacity: 1,
    y: 0,
  });
  tl.to(subtitleRef.current, {
    startAt: { y: 100, opacity: 0 },
    duration,
    opacity: 1,
    y: 0,
  });
  return tl;
};

export const smileyAnimation = ({
  gsap,
  smileyRef,
  ballRef,
  rainbowRef,
  startup1Ref,
  startup2Ref,
  startup3Ref,
  startup4Ref,
  startup5Ref,
  startup6Ref,
}) => {
  // avoid conflict with css
  gsap.set(smileyRef.current, {
    opacity: 1,
    translateX: '-50%',
  });

  const tl = gsap.timeline({
    defaults: {
      duration: 1,
    },
    scrollTrigger: {
      trigger: ballRef.current,
      scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
      // only do it once
      anticipatePin: 1,
      once: true,
      // snap: 0.05,
      start: 'top 60%', // when the top of the trigger hits the center of the viewport
      // endTrigger: rainbowRef.current,
      // end: 'bottom center',
    },
    repeat: 0,
    repeatDelay: 0,
  });
  tl.to(ballRef.current, {
    ease: 'circ.out',
    scale: 1,
  });
  tl.to(smileyRef.current, {
    ease: 'circ.out',
    scale: 1,
  });

  tl.to(rainbowRef.current, {
    ease: 'circ.in',
    maxHeight: '100%',
  });
  tl.from(
    [
      startup1Ref.current,
      startup2Ref.current,
      startup3Ref.current,
      startup4Ref.current,
      startup5Ref.current,
      startup6Ref.current,
    ],
    {
      duration: 1,
      stagger: 0.2,
      y: -100,
      opacity: 0,
    },
  );

  // tl.to(
  //   [
  //     startup1Ref.current,
  //     startup2Ref.current,
  //     startup3Ref.current,
  //     startup4Ref.current,
  //     startup5Ref.current,
  //     startup6Ref.current,
  //   ],
  //   {
  //     // ease: 'circ.inOut',
  //     ease: 'none',
  //     duration: 4,
  //     stagger: 0.1,
  //     y: i => (i % 2 === 0 ? 8 : -8),
  //     // rotate: i => (i % 2 === 0 ? 4 : -4),
  //     yoyo: true,
  //     repeat: 10,
  //   },
  // );
  return tl;
};
