Here's an SEO-optimized README.md file:

```markdown
# React Pull to Refresh 🔄

[![npm version](https://img.shields.io/npm/v/react-pull-to-refresh.svg?style=flat-square)](https://www.npmjs.com/package/react-pull-to-refresh)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-pull-to-refresh?style=flat-square)](https://bundlephobia.com/package/react-pull-to-refresh)
[![npm downloads](https://img.shields.io/npm/dm/react-pull-to-refresh.svg?style=flat-square)](https://npm-stat.com/charts.html?package=react-pull-to-refresh)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/your-username/react-pull-to-refresh/blob/main/LICENSE)

A high-performance, iOS-style pull-to-refresh component for React PWAs with TypeScript support and customizable touch gestures.

## Features ✨

- 📱 **Native iOS Behavior** - Perfect rubber band effect and smooth animations
- ⚡ **60fps Performance** - Optimized for mobile devices and PWAs
- 🎨 **Fully Customizable** - Modify spinner, thresholds, and animations
- 📦 **Zero Dependencies** - Lightweight (3.5kB gzipped)
- 🛠 **TypeScript Ready** - Full type definitions included
- 🎣 **Hook & Component** - Choose between ready component or custom implementation
- 📱 **PWA Optimized** - Perfect for standalone installed web apps
- 🔄 **Touch Gestures** - Precision touch event handling
- 🌓 **Dark Mode Ready** - CSS variables for easy theming

## Installation 📦

```bash
npm install react-pull-to-refresh
# or
yarn add react-pull-to-refresh
```

## Basic Usage 🚀

```tsx
import { PullToRefresh } from 'react-pull-to-refresh';
import 'react-pull-to-refresh/styles.css';

const App = () => {
  const handleRefresh = async () => {
    // Your refresh logic
    await fetchNewData();
  };

  return (
    <PullToRefresh
      onRefresh={handleRefresh}
      pullThreshold={100}
      maxPull={150}
    >
      <main>
        {/* Your content */}
      </main>
    </PullToRefresh>
  );
};
```

## Custom Spinner Example 🎨

```tsx
<PullToRefresh
  onRefresh={handleRefresh}
  renderSpinner={(progress, rotation) => (
    <div 
      style={{
        position: 'absolute',
        top: 20,
        left: '50%',
        transform: `translateX(-50%) rotate(${rotation}deg)`,
        opacity: progress
      }}
    >
      🔄 Loading ({Math.round(progress * 100)}%)
    </div>
  )}
>
  {/* Content */}
</PullToRefresh>
```

## Hook Usage 🎣

```tsx
import { usePullToRefresh } from 'react-pull-to-refresh';

const CustomRefresh = ({ children }) => {
  const { containerRef, pullDistance } = usePullToRefresh({
    onRefresh: fetchData,
    pullThreshold: 120
  });

  return (
    <div ref={containerRef}>
      <div style={{ height: pullDistance }}>⬇️ Pull down</div>
      {children}
    </div>
  );
};
```

## Props 🛠

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| **onRefresh** | `() => Promise<void>` | **Required** | Refresh handler |
| **pullThreshold** | `number` | `100` | Minimum pull distance to trigger refresh |
| **maxPull** | `number` | `150` | Maximum allowed pull distance |
| **renderSpinner** | `(progress: number, rotation: number) => ReactNode` | Default spinner | Custom spinner render function |
| **children** | `ReactNode` | **Required** | Content to wrap |

## Customization 🎨

Override CSS variables in your global styles:

```css
:root {
  --ptr-spinner-color: #007aff;
  --ptr-spinner-size: 1.5rem;
  --ptr-spinner-stroke-width: 0.2em;
  --ptr-pull-easing: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

## Performance Tips ⚡

1. Use `React.memo` for child components
2. Keep refresh handler lightweight
3. Avoid complex animations in renderSpinner
4. Use CSS transforms instead of layout-changing properties

## Browser Support 🌐

| ![Chrome](https://cdn.jsdelivr.net/gh/alrra/browser-logos/src/chrome/chrome_48x48.png) | ![Firefox](https://cdn.jsdelivr.net/gh/alrra/browser-logos/src/firefox/firefox_48x48.png) | ![Safari](https://cdn.jsdelivr.net/gh/alrra/browser-logos/src/safari/safari_48x48.png) | ![Edge](https://cdn.jsdelivr.net/gh/alrra/browser-logos/src/edge/edge_48x48.png) |
|----------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|----------------------------------------------------------------------------------|
| Chrome ≥ 80 ✅                                                                          | Firefox ≥ 72 ✅                                                                          | Safari ≥ 12.1 ✅                                                                       | Edge ≥ 80 ✅                                                                     |

## Contributing 🤝

We welcome contributions! Please follow our [contribution guidelines](CONTRIBUTING.md).

## License 📄

MIT © [Ramin Mohammadi](https://github.com/Ramynn)

---

**Looking for React Native version?** Check out our sister package [react-native-pull-to-refresh](https://github.com/Ramynn/react-native-pull-to-refresh)
