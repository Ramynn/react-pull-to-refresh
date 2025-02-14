import { useRef, useEffect, memo } from 'react';
import { Spinner } from './Spinner';
import {usePWA} from "@/hooks/usePwa";
import {usePullToRefresh} from "@/hooks/use-pull-to-refresh";

interface PullToRefreshProps {
    onRefresh: () => Promise<void>;
    children: React.ReactNode;
    disabled?: boolean;
    enableOnlyInPWA?: boolean;
    pullThreshold?: number;
    maxPull?: number;
}

export const PullToRefresh = memo(({
                                       onRefresh,
                                       children,
                                       disabled = false,
                                       enableOnlyInPWA = false,
                                       pullThreshold = 100,
                                       maxPull = 150
                                   }: PullToRefreshProps) => {
    const isPWA = usePWA();
    const isEnabled = !disabled && (!enableOnlyInPWA || isPWA);
    const { containerRef, pullDistance } = usePullToRefresh({
        onRefresh,
        pullThreshold,
        maxPull,
        isEnabled
    });

    const progress = Math.min(pullDistance / pullThreshold, 1);

    return (
        <div ref={containerRef} className="ptr-container">
            {isEnabled && (
                <div
                    className="ptr-indicator"
                    style={{
                        transform: `translateY(${Math.min(pullDistance, maxPull)}px)`,
                        opacity: progress
                    }}
                >
                    <Spinner />
                </div>
            )}
            {children}
        </div>
    );
});