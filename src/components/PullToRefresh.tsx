import React, { memo, useMemo } from 'react';
import { usePullToRefresh } from '../hooks/use-pull-to-refresh';
import type { PullToRefreshProps } from '../types';

const Spinner = memo(({ progress, rotation }: {
    progress: number;
    rotation: number
}) => (
    <div
        className="ptr-spinner"
        style={{
            transform: `translateY(${progress * 20}px) rotate(${rotation}deg)`,
            opacity: progress
        }}
        role="status"
        aria-live="polite"
        aria-label={progress >= 1 ? 'Refreshing content' : 'Pull to refresh'}
    >
        <div className="ptr-spinner-inner" />
    </div>
));

export const PullToRefresh = memo(({
                                       children,
                                       onRefresh,
                                       pullThreshold = 100,
                                       maxPull = 150,
                                       resistance = 0.5,
                                       renderSpinner,
                                       className,
                                       ...props
                                   }: PullToRefreshProps) => {
    const {
        containerRef,
        pullDistance,
        isRefreshing
    } = usePullToRefresh({ onRefresh, pullThreshold, maxPull, resistance });

    const { progress, rotation } = useMemo(() => ({
        progress: Math.min(pullDistance / pullThreshold, 1),
        rotation: Math.min(pullDistance / (pullThreshold / 360), 720)
    }), [pullDistance, pullThreshold]);

    return (
        <div
            ref={containerRef}
            className={`ptr-container ${className || ''}`}
            {...props}
        >
            {renderSpinner ? (
                renderSpinner(progress, rotation, isRefreshing)
            ) : (
                <Spinner progress={pullDistance} rotation={rotation} />
            )}
            {children}
        </div>
    );
});