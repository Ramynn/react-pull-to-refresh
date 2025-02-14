export const applyRubberBandEffect = (
    delta: number,
    threshold: number,
    maxPull: number
) => {
    if (delta <= threshold) {
        return delta;
    }
    const exceeded = Math.min(delta - threshold, maxPull - threshold);
    return threshold + exceeded * (1 - 0.5 * (exceeded / (maxPull - threshold)));
};