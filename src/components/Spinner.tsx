import { memo } from 'react';

export const Spinner = memo(() => (
    <div className="ios-spinner">
        <svg viewBox="0 0 38 38">
            <defs>
                <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="ios-spinner-gradient">
                    <stop stopColor="#007AFF" stopOpacity="0" offset="0%"/>
                    <stop stopColor="#007AFF" stopOpacity=".631" offset="63.146%"/>
                    <stop stopColor="#007AFF" offset="100%"/>
                </linearGradient>
            </defs>
            <g fill="none" fillRule="evenodd">
                <g transform="translate(1 1)">
                    <path
                        d="M36 18c0-9.94-8.06-18-18-18"
                        stroke="url(#ios-spinner-gradient)"
                        strokeWidth="2"
                    />
                    <circle cx="36" cy="18" r="1" fill="#007AFF"/>
                </g>
            </g>
        </svg>
    </div>
));