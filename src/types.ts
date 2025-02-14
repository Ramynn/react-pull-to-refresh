import type { HTMLAttributes } from 'react';

export interface UsePullToRefreshParams {
    onRefresh: () => Promise<void>;
    pullThreshold?: number;
    maxPull?: number;
    resistance?: number;
}

export interface PullToRefreshProps
    extends HTMLAttributes<HTMLDivElement>,
        UsePullToRefreshParams {
    renderSpinner?: (
        progress: number,
        rotation: number,
        isRefreshing: boolean
    ) => React.ReactNode;
}