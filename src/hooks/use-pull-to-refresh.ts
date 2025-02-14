import {useCallback, useEffect, useRef, useState} from 'react';
import {applyRubberBandEffect} from '../utils/physics';

interface UsePullToRefreshParams {
    onRefresh: () => Promise<void>;
    pullThreshold?: number;
    maxPull?: number;
    isEnabled: boolean;
}

export const usePullToRefresh = (
    {
        onRefresh,
        pullThreshold = 100,
        maxPull = 150,
        isEnabled
    }: UsePullToRefreshParams) => {
    const [pullDistance, setPullDistance] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const touchStartY = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const isActive = useRef(false);
    const animationFrame = useRef<number>(null);

    const handleRefresh = useCallback(async () => {
        setIsRefreshing(true);
        try {
            await onRefresh();
        } finally {
            setIsRefreshing(false);
            setPullDistance(0);
        }
    }, [onRefresh]);

    const updatePullDistance = useCallback((delta: number) => {
        const dampedDelta = applyRubberBandEffect(delta, pullThreshold, maxPull);

        cancelAnimationFrame(animationFrame.current!);
        animationFrame.current = requestAnimationFrame(() => {
            setPullDistance(dampedDelta);
        });
    }, [pullThreshold, maxPull]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || !isEnabled) return;

        const handleTouchStart = (e: TouchEvent) => {
            if (window.scrollY <= 0 && e.touches.length === 1) {
                touchStartY.current = e.touches[0].clientY;
                isActive.current = true;
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!isActive.current || isRefreshing) return;
            const delta = e.touches[0].clientY - touchStartY.current;

            if (delta > 0) {
                e.preventDefault();
                updatePullDistance(delta);
            }
        };

        const handleTouchEnd = () => {
            if (!isActive.current || isRefreshing) return;
            isActive.current = false;

            if (pullDistance >= pullThreshold) {
                handleRefresh();
            } else {
                updatePullDistance(0);
            }
        };

        container.addEventListener('touchstart', handleTouchStart);
        container.addEventListener('touchmove', handleTouchMove, {passive: false});
        container.addEventListener('touchend', handleTouchEnd);

        return () => {
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('touchend', handleTouchEnd);
            cancelAnimationFrame(animationFrame.current!);
        };
    }, [pullDistance, isRefreshing, updatePullDistance, handleRefresh, pullThreshold, isEnabled]);

    return {containerRef, pullDistance, isRefreshing};
};