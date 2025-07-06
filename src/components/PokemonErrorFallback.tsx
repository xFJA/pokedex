import type { ReactNode } from 'react';

interface PokemonErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
  children?: ReactNode;
}

export function PokemonErrorFallback({ error, resetError, children }: PokemonErrorFallbackProps) {
  return (
    <div className="p-6 rounded-lg bg-red-50 border border-red-200 text-center">
      <div className="mb-4">
        <img src="/pokeball.svg" alt="Broken Pokeball" className="w-16 h-16 mx-auto opacity-50" />
      </div>
      <h2 className="text-xl font-bold text-red-700 mb-2">Pokémon Data Error</h2>
      <p className="text-red-600 mb-4">{error?.message ?? 'Unable to load Pokémon data'}</p>
      {resetError && (
        <button
          onClick={resetError}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Try Again
        </button>
      )}
      {children}
    </div>
  );
}
