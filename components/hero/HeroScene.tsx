/**
 * The hero SVG scene: espresso machine group head above a ceramic 929 cup,
 * inside a large sage outline circle.
 *
 * Realistic ceramic build — the cup wall is opaque, so the coffee is only
 * visible through the rim opening (like a real cup seen slightly from
 * above). The liquid group is clipped to the opening ellipse; as the level
 * rises the dark surface climbs toward the rim and the stream endpoint
 * follows it.
 *
 * All animated elements are addressed via [data-el=…] from Hero.tsx.
 */

export const SCENE = {
  spoutTipY: 196,
  surfaceEmptyY: 453,
  surfaceFullY: 415,
  streamX: 300,
  streamWidth: 8,
};

export default function HeroScene() {
  return (
    <svg
      viewBox="0 0 600 760"
      role="img"
      aria-label="A ceramic 929 cup slowly filling with espresso as you scroll"
      className="h-auto w-full max-w-[560px] max-h-[52vh] lg:max-h-[86vh]"
    >
      <defs>
        {/* Ceramic exterior — soft studio light from the left */}
        <linearGradient id="ceramic" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#d6d1c7" />
          <stop offset="0.18" stopColor="#fcfbf8" />
          <stop offset="0.5" stopColor="#f3f0e9" />
          <stop offset="0.82" stopColor="#ddd7cc" />
          <stop offset="1" stopColor="#c4bdb0" />
        </linearGradient>
        <linearGradient id="ceramicBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.75" stopColor="#8d8574" stopOpacity="0.12" />
          <stop offset="1" stopColor="#6d6656" stopOpacity="0.28" />
        </linearGradient>
        {/* Rim ring — top edge of the wall thickness */}
        <linearGradient id="rimRing" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fdfcfa" />
          <stop offset="1" stopColor="#dcd6cb" />
        </linearGradient>
        {/* Interior cavity, deep shadow toward the bottom */}
        <radialGradient id="cavity" cx="0.5" cy="0.28" r="0.9">
          <stop offset="0" stopColor="#d9d3c8" />
          <stop offset="0.55" stopColor="#b3aa9a" />
          <stop offset="1" stopColor="#7e7666" />
        </radialGradient>
        {/* Coffee body under the surface */}
        <linearGradient id="coffee" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3d2415" />
          <stop offset="1" stopColor="#1f1108" />
        </linearGradient>
        {/* Crema surface */}
        <radialGradient id="crema" cx="0.42" cy="0.4" r="0.85">
          <stop offset="0" stopColor="#d8a262" />
          <stop offset="0.45" stopColor="#b98045" />
          <stop offset="0.8" stopColor="#8a5c2c" />
          <stop offset="1" stopColor="#6d4520" />
        </radialGradient>
        {/* Chrome machine */}
        <linearGradient id="chrome" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#9aa0a2" />
          <stop offset="0.2" stopColor="#eef0f0" />
          <stop offset="0.5" stopColor="#c3c8c9" />
          <stop offset="0.8" stopColor="#eef0f0" />
          <stop offset="1" stopColor="#8f9496" />
        </linearGradient>
        <linearGradient id="chromeDark" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#6c7274" />
          <stop offset="0.5" stopColor="#b9bec0" />
          <stop offset="1" stopColor="#63696b" />
        </linearGradient>
        {/* Espresso stream */}
        <linearGradient id="streamGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7b4a26" />
          <stop offset="1" stopColor="#53321c" />
        </linearGradient>

        <filter id="softBlur" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter id="fineBlur" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
        <filter id="steamBlur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" />
        </filter>

        {/* Coffee can only exist inside the rim opening */}
        <clipPath id="openingClip">
          <ellipse cx="300" cy="430" rx="100" ry="22" />
        </clipPath>
      </defs>

      {/* sage outline circle */}
      <circle
        cx="300"
        cy="400"
        r="262"
        fill="none"
        stroke="#8FA79A"
        strokeWidth="1.5"
        opacity="0.8"
      />

      {/* ——— Espresso machine group head ——— */}
      <g data-el="machine">
        <rect x="196" y="22" width="208" height="20" rx="6" fill="url(#chromeDark)" />
        <rect x="216" y="42" width="168" height="72" rx="10" fill="url(#chrome)" />
        <rect x="216" y="102" width="168" height="12" rx="6" fill="url(#chromeDark)" />
        {/* portafilter */}
        <rect x="240" y="118" width="120" height="26" rx="8" fill="url(#chromeDark)" />
        <rect x="356" y="122" width="118" height="14" rx="7" fill="#2a2a2a" />
        <rect x="466" y="119" width="26" height="20" rx="8" fill="#1c1c1c" />
        {/* spout converging to a single tip */}
        <path d="M282 144 L292 190 L300 196 L308 190 L318 144 Z" fill="url(#chromeDark)" />
        {/* status light */}
        <circle data-el="machine-light" cx="374" cy="78" r="5" fill="#8FA79A" />
      </g>

      {/* soft contact shadow */}
      <ellipse cx="300" cy="634" rx="155" ry="17" fill="#b7b0a3" opacity="0.5" filter="url(#softBlur)" />

      {/* saucer */}
      <g>
        <ellipse cx="300" cy="614" rx="160" ry="26" fill="url(#ceramic)" />
        <ellipse cx="300" cy="610" rx="124" ry="18" fill="#e9e4da" />
        <ellipse cx="300" cy="610" rx="124" ry="18" fill="url(#ceramicBody)" />
      </g>

      {/* handle (behind the body, attached right) */}
      <path
        d="M404 452 C458 450 476 478 468 504 C460 530 428 546 400 542"
        fill="none"
        stroke="url(#ceramic)"
        strokeWidth="17"
        strokeLinecap="round"
      />
      <path
        d="M404 452 C458 450 476 478 468 504 C460 530 428 546 400 542"
        fill="none"
        stroke="#a49c8c"
        strokeWidth="17"
        strokeLinecap="round"
        opacity="0.18"
      />

      {/* ——— cup body: opaque ceramic wall ——— */}
      <path
        d="M190 432 L200 528 C206 574 246 602 300 602 C354 602 394 574 400 528 L410 432 C410 444 361 454 300 454 C239 454 190 444 190 432 Z"
        fill="url(#ceramic)"
      />
      {/* vertical shading + grounded base */}
      <path
        d="M190 432 L200 528 C206 574 246 602 300 602 C354 602 394 574 400 528 L410 432 C410 444 361 454 300 454 C239 454 190 444 190 432 Z"
        fill="url(#ceramicBody)"
      />
      {/* specular highlight on the front-left wall */}
      <path
        d="M228 452 C224 500 230 546 246 574"
        fill="none"
        stroke="#ffffff"
        strokeWidth="10"
        strokeLinecap="round"
        opacity="0.5"
        filter="url(#fineBlur)"
      />

      {/* ——— rim: wall thickness ring ——— */}
      <ellipse cx="300" cy="430" rx="110" ry="25" fill="url(#rimRing)" />

      {/* ——— the opening: interior + coffee, clipped ——— */}
      <g clipPath="url(#openingClip)">
        {/* interior cavity */}
        <ellipse cx="300" cy="430" rx="100" ry="22" fill="url(#cavity)" />
        {/* inner shadow cast by the back rim */}
        <ellipse cx="300" cy="422" rx="96" ry="16" fill="#5f5849" opacity="0.35" filter="url(#fineBlur)" />

        {/* rising coffee: body below the surface, crema on top */}
        <rect data-el="liquid" x="180" y="447" width="240" height="60" fill="url(#coffee)" />
        <ellipse data-el="crema" cx="300" cy="447" rx="99" ry="20" fill="url(#crema)" />

        {/* sheen + reflection on the surface */}
        <ellipse data-el="reflection" cx="272" cy="428" rx="34" ry="9" fill="#ffffff" opacity="0" filter="url(#softBlur)" />

        {/* ripples near full level */}
        <ellipse data-el="ripple" cx="300" cy="424" rx="42" ry="8" fill="none" stroke="#e9c9a2" strokeWidth="1.4" opacity="0" />
        <ellipse data-el="ripple" cx="300" cy="424" rx="68" ry="13" fill="none" stroke="#e9c9a2" strokeWidth="1" opacity="0" />
      </g>

      {/* inner rim edge */}
      <ellipse cx="300" cy="430" rx="100" ry="22" fill="none" stroke="#b8b1a2" strokeWidth="1" opacity="0.8" />
      {/* outer rim edge */}
      <ellipse cx="300" cy="430" rx="110" ry="25" fill="none" stroke="#c7c1b5" strokeWidth="1.2" />

      {/* first espresso drops */}
      <circle data-el="drop" cx="300" cy="206" r="4" fill="#5a3a24" opacity="0" />
      <circle data-el="drop" cx="300" cy="206" r="3.2" fill="#5a3a24" opacity="0" />
      <circle data-el="drop" cx="300" cy="206" r="3.6" fill="#5a3a24" opacity="0" />

      {/* espresso stream — height driven from JS so it ends on the surface */}
      <rect data-el="stream-glow" x="293" y="196" width="14" height="0" rx="7" fill="#8a5a30" opacity="0.35" filter="url(#softBlur)" />
      <rect data-el="stream" x="296" y="196" width="8" height="0" rx="4" fill="url(#streamGrad)" />

      {/* logo on the front wall */}
      <g
        aria-hidden="true"
        fontFamily="var(--font-instrument), 'Avenir', sans-serif"
        textAnchor="middle"
      >
        <text x="300" y="545" fontSize="30" fontWeight="600" letterSpacing="1">
          <tspan fill="#1c1c1c">92</tspan>
          <tspan fill="#8FA79A">9</tspan>
        </text>
        <text x="300" y="560" fontSize="7.5" letterSpacing="4" fill="#3a3a3a">
          NINE TWO NINE
        </text>
      </g>

      {/* steam */}
      <g data-el="steam" filter="url(#steamBlur)">
        <path d="M266 398 C258 376 274 364 266 344 C258 324 272 312 268 296" fill="none" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" opacity="0" />
        <path d="M302 394 C312 370 294 358 304 336 C314 314 298 302 306 284" fill="none" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" opacity="0" />
        <path d="M338 398 C346 378 332 366 340 346 C348 326 336 316 340 302" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" opacity="0" />
      </g>
    </svg>
  );
}
