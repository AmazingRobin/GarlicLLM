# GarlicLLM Design Specification

## Visual Identity

### Color Palette

**Dark Theme (Default)**
- Background Primary: `#020712`
- Background Secondary: `#0a0f1d`
- Background Tertiary: `#111827`

**Accent Colors**
- Purple (Primary): `#6B4EFF`
- Cyan (Secondary): `#00FFD1`
- Pink (Tertiary): `#FF4ECD`
- Gold (Highlight): `#FFD700`

**Semantic Colors**
- High Confidence: `#10B981` (Green)
- Medium Confidence: `#F59E0B` (Amber)
- Low Confidence: `#EF4444` (Red)

### Typography

**Font Stack**
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

**Scale**
- Display: 72-96px (Hero titles)
- H1: 48-64px
- H2: 32-48px
- H3: 24-32px
- Body: 16px
- Small: 14px
- Caption: 12px

### Effects

**Glass Morphism**
```css
background: rgba(255, 255, 255, 0.03);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.08);
```

**Neon Glow**
```css
text-shadow: 
  0 0 10px rgba(107, 78, 255, 0.4),
  0 0 20px rgba(107, 78, 255, 0.4),
  0 0 40px rgba(107, 78, 255, 0.4);
```

**Gradient**
```css
background: linear-gradient(135deg, #6B4EFF, #00FFD1);
```

## Component Patterns

### Cards
- Border radius: 16px
- Padding: 24px
- Border: 1px solid glass-border
- Hover: lift + glow effect

### Buttons
- Primary: Gradient background, white text
- Secondary: Transparent, bordered
- Border radius: 8px
- Padding: 12px 28px

### Badges
- Border radius: 20px
- Padding: 4px 12px
- Font size: 12px

## Animation Guidelines

### Timing
- Fast: 150ms (micro-interactions)
- Normal: 300ms (transitions)
- Slow: 500ms+ (major transitions)

### Easing
- Default: `ease`
- Bounce: `cubic-bezier(0.68, -0.55, 0.265, 1.55)`
- Smooth: `cubic-bezier(0.4, 0, 0.2, 1)`

### Motion Preferences
Always respect `prefers-reduced-motion` media query.

## Accessibility

### Focus States
- 2px solid cyan outline
- 2px offset

### Color Contrast
- Minimum 4.5:1 for body text
- Minimum 3:1 for large text

### Screen Readers
- All images have alt text
- Interactive elements have labels
- Proper heading hierarchy
