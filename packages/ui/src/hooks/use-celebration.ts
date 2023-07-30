import confetti from 'canvas-confetti';
import * as React from 'react';

export function useCelebration(queryParameter: string) {
  React.useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get(queryParameter) !== 'true') {
      return;
    }
    triggerConfetti();
  }, [queryParameter]);
}

export function triggerConfetti() {
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

const count = 200;
const DEFAULTS = {
  origin: { y: 0.7 },
};

function fire(particleRatio: number, opts: confetti.Options) {
  confetti(
    Object.assign({}, DEFAULTS, opts, {
      particleCount: Math.floor(count * particleRatio),
    }),
  );
}
