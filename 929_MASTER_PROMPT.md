# 929 Specialty Coffee --- MASTER PROMPT (Claude Code)

## Role

You are my Lead Product Designer, Creative Director, Senior Frontend
Engineer, Motion Designer and UX Architect.

Your objective is to build the **official Digital Flagship Experience**
for **929 Specialty Coffee**.

This is **not** a typical coffee shop website. It must feel like a
premium international brand experience inspired by Apple, Aesop, Blue
Bottle Coffee, COS, Nothing and Awwwards-winning websites.

## Brand Identity

### Logo

The logo consists only of typography: - Large "929" - First 9: matte
black - 2: matte black - Last 9: muted sage green `#8FA79A` - Below:
`NINE TWO NINE` (uppercase, thin, widely spaced) - Below:
`SPECIALTY COFFEE` (uppercase, smaller, thin)

No icons. No coffee bean. No cup symbol. Minimal typography only.

## Color Palette

  Name              Hex
  ----------------- ---------
  Primary White     #F5F2EC
  Secondary White   #ECE8E2
  Primary Black     #1C1C1C
  Dark Gray         #3A3A3A
  Accent Green      #8FA79A
  Secondary Green   #6F8578
  Border            #D8D4CE

Green is an accent only: buttons, hover, active navigation, icons, map
pins, progress bars, section labels.

## Typography

Inspired by: - General Sans - Satoshi - Neue Montreal - Avenir

Editorial typography. Large headlines. Generous whitespace. Minimal UI.

## Tech Stack

-   Next.js 15 (App Router)
-   React 19
-   Tailwind CSS
-   shadcn/ui
-   GSAP + ScrollTrigger
-   Lenis
-   Framer Motion
-   React Three Fiber
-   Three.js
-   Lucide Icons
-   React Hook Form
-   Zod
-   Vercel

## Project Structure

``` text
app/
components/
  hero/
  navbar/
  footer/
  menu/
  origins/
  locations/
  journal/
  subscription/
  ui/
hooks/
lib/
styles/
public/
```

## Homepage

Sections: 1. Hero 2. Brand Values 3. Locations 4. Signature Drinks 5.
Subscription 6. Instagram 7. Footer

## Hero

Split layout.

Left: - Editorial heading - Paragraph - CTA buttons

Right: - Premium ceramic 929 cup - Premium espresso machine group head
above the cup - Warm white background - Large sage-green outline circle

### Hero Scroll Animation

The hero is controlled **entirely by scroll** using GSAP ScrollTrigger.

At load: - Cup empty - Espresso machine idle - No coffee flow

Scroll timeline:

0% - Empty cup

10% - First espresso drops

20% - Continuous espresso extraction

40% - Coffee begins filling the cup

60% - Rich reflections - Crema develops

80% - Cup almost full - Surface ripples

90% - Steam appears

100% - Machine stops - Cup full - Steam rises - Headline fades upward -
Next section enters

### IMPORTANT IMPLEMENTATION

Do NOT fake the liquid using a brown rectangle.

Build the cup with layered elements:

1.  Back of cup
2.  Inner rim
3.  Coffee liquid
4.  Front ceramic wall
5.  Logo
6.  Steam

The coffee must exist **between** the back and front wall.

Use SVG clipPath or CSS mask so the liquid always remains inside the
cup.

The coffee stream must terminate exactly on the liquid surface.

As the liquid rises, the stream endpoint rises too.

The cup should look like a premium photographed ceramic product, not an
illustration.

## Motion Design

Everything should feel handcrafted.

Use: - opacity - translateY - blur reduction - stagger reveals - gentle
hover lift - image zoom (2--3%) - subtle parallax

Avoid bounce animations.

## Remaining Pages

### Menu

Editorial product catalog with filters.

### Coffee Origins

Interactive encyclopedia: - country - producer - processing - altitude -
flavor notes - origin map - gallery

### Locations

Interactive map and premium branch cards.

### About

Story, mission, vision, timeline.

### Experiences

Workshops, cupping, brewing classes.

### Journal

Magazine layout with coffee articles.

### Contact

Minimal form, map and social links.

## Accessibility

Semantic HTML. Keyboard navigation. Readable contrast. ARIA labels.

## Performance

Target Lighthouse 95+.

Lazy loading. Optimized images. Minimal layout shift.

## Final Goal

The final result must look like the official digital flagship for 929
Specialty Coffee.

Every page should communicate: - craftsmanship - calmness - precision -
elegance - quiet luxury

The website should feel worthy of an Awwwards Website of the Day
nomination.
