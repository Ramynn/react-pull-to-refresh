export const applyRubberBandEffect = (
    delta: number,
    threshold: number,
    maxPull: number,
    resistance: number
): number => {
    if (delta <= threshold) return delta;

    const exceeded = delta - threshold;
    const limited = Math.min(exceeded, maxPull - threshold);
    return threshold + limited * (1 - (1 / (limited * resistance + 1)));
};

export const dampenValue = (
    value: number,
    maxValue: number
): number => {
    return maxValue * (1 - Math.exp(-value / maxValue));
};