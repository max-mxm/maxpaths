'use client';

import Link from 'next/link';

/**
 * Logo Option 3 - Path Arrow Dynamic (PLUS AUDACIEUX)
 *
 * Style: Chevron stylisé avec gradient radial + texte avec lettres individuelles animées
 * Animation: Chevron qui se déplace vers la droite, gradient qui tourne, lettres en stagger, glow intense
 */
export function LogoOption3() {
  const letters = 'Maxpaths'.split('');

  return (
    <Link
      href="/"
      className="group flex items-center gap-2.5 transition-all duration-300"
      aria-label="Maxpaths - Accueil"
    >
      {/* Chevron avec gradient radial animé */}
      <div className="relative w-7 h-7 flex items-center justify-center overflow-hidden">
        {/* Background rotating gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[rgb(0,150,136)] via-[rgb(62,104,186)] to-[rgb(124,58,237)]
            group-hover:animate-[rotate-gradient_3s_linear_infinite]"
          style={{
            clipPath: 'polygon(40% 0%, 40% 20%, 100% 60%, 40% 100%, 40% 80%, 0% 60%)',
          }}
        />

        {/* Chevron shape */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 w-5 h-5 group-hover:animate-[chevron-forward_1.5s_ease-in-out_infinite]
            group-hover:drop-shadow-[0_0_8px_rgba(0,150,136,0.8)]"
        >
          <path
            d="M9 5 L17 12 L9 19"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-sm"
          />
        </svg>

        {/* Glow effect au hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
            group-hover:animate-[intense-glow_2s_ease-in-out_infinite]"
          style={{
            clipPath: 'polygon(40% 0%, 40% 20%, 100% 60%, 40% 100%, 40% 80%, 0% 60%)',
          }}
        />
      </div>

      {/* Texte avec lettres individuelles */}
      <span className="text-xl font-bold flex tracking-tight">
        {letters.map((letter, i) => (
          <span
            key={i}
            className="inline-block bg-gradient-to-r from-[rgb(0,150,136)] to-[rgb(124,58,237)] bg-clip-text text-transparent
              group-hover:animate-[letter-bounce_0.6s_ease-in-out]
              transition-all duration-200"
            style={{
              animationDelay: `${i * 50}ms`,
            }}
          >
            {letter}
          </span>
        ))}
      </span>
    </Link>
  );
}
