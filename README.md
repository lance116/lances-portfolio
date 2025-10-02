# Fluid Cursor Component Integration

This project integrates a React fluid cursor component with WebGL-powered interactive effects. The component creates beautiful fluid simulations that respond to mouse movement.

## 🚀 Project Setup

The project is now fully configured with:

- ✅ **Next.js 14** with App Router
- ✅ **TypeScript** for type safety
- ✅ **Tailwind CSS** for styling
- ✅ **shadcn/ui** compatible structure
- ✅ **WebGL** fluid simulation component

## 📁 Project Structure

```
prtl/
├── app/
│   ├── globals.css          # Tailwind CSS styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page with demo
├── components/
│   ├── ui/
│   │   └── splash-cursor.tsx # Main fluid cursor component
│   └── demo.tsx             # Demo component showcasing the cursor
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── tsconfig.json
```

## 🎯 Component Features

The `SplashCursor` component includes:

- **Interactive Fluid Simulation**: Responds to mouse movement
- **WebGL Rendering**: Hardware-accelerated graphics
- **Customizable Parameters**: Extensive configuration options
- **Responsive Design**: Adapts to different screen sizes
- **TypeScript Support**: Full type safety

## 🛠️ Usage

### Basic Usage

```tsx
import { SplashCursor } from "@/components/ui/splash-cursor";

export function MyComponent() {
  return (
    <div className="relative min-h-screen">
      <SplashCursor />
      {/* Your content here */}
    </div>
  );
}
```

### Advanced Configuration

```tsx
import { SplashCursor } from "@/components/ui/splash-cursor";

export function CustomFluidDemo() {
  return (
    <SplashCursor
      SIM_RESOLUTION={256}
      DYE_RESOLUTION={2048}
      DENSITY_DISSIPATION={2.0}
      VELOCITY_DISSIPATION={1.5}
      SPLAT_RADIUS={0.3}
      SPLAT_FORCE={8000}
      SHADING={true}
      COLOR_UPDATE_SPEED={15}
      BACK_COLOR={{ r: 0.1, g: 0.1, b: 0.3 }}
    />
  );
}
```

## ⚙️ Configuration Options

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `SIM_RESOLUTION` | number | 128 | Simulation resolution |
| `DYE_RESOLUTION` | number | 1440 | Dye resolution |
| `DENSITY_DISSIPATION` | number | 3.5 | How fast density fades |
| `VELOCITY_DISSIPATION` | number | 2 | How fast velocity fades |
| `SPLAT_RADIUS` | number | 0.2 | Size of fluid splashes |
| `SPLAT_FORCE` | number | 6000 | Force of fluid splashes |
| `SHADING` | boolean | true | Enable 3D shading |
| `COLOR_UPDATE_SPEED` | number | 10 | Speed of color changes |
| `BACK_COLOR` | object | `{r: 0.5, g: 0, b: 0}` | Background color |

## 🎨 Styling

The component uses Tailwind CSS classes and can be customized:

```tsx
<SplashCursor 
  className="fixed top-0 left-0 z-50 pointer-events-none"
/>
```

## 🚀 Running the Project

1. **Development Server**:
   ```bash
   npm run dev
   ```

2. **Production Build**:
   ```bash
   npm run build
   npm start
   ```

3. **Linting**:
   ```bash
   npm run lint
   ```

## 📱 Responsive Behavior

The component automatically adapts to different screen sizes and device pixel ratios. It uses:

- `window.devicePixelRatio` for crisp rendering on high-DPI displays
- Responsive canvas sizing
- Touch support for mobile devices

## 🔧 Browser Support

- **WebGL 2.0**: Modern browsers (Chrome, Firefox, Safari, Edge)
- **WebGL 1.0**: Fallback for older browsers
- **Canvas 2D**: Fallback for browsers without WebGL support

## 🎯 Best Practices

1. **Performance**: Use the component sparingly as it's GPU-intensive
2. **Z-index**: Ensure proper layering with `z-50` or higher
3. **Pointer Events**: Use `pointer-events-none` to allow interaction with underlying content
4. **Mobile**: Test on mobile devices for touch interaction

## 🐛 Troubleshooting

### WebGL Not Supported
If WebGL is not available, the component will fall back to Canvas 2D rendering with basic splash effects.

### Performance Issues
- Reduce `SIM_RESOLUTION` and `DYE_RESOLUTION`
- Disable `SHADING` for better performance
- Lower `SPLAT_FORCE` values

### Build Errors
- Ensure all dependencies are installed: `npm install`
- Check TypeScript configuration in `tsconfig.json`
- Verify Tailwind CSS is properly configured

## 📄 License

MIT License - Feel free to use this component in your projects!

---

**Note**: This is a simplified version of the original WebGL fluid simulation. For the full implementation with advanced physics, consider using the complete shader-based version.
