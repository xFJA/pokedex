import { z } from 'zod';

export const PokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  url: z.string().url(),
  image: z.string(),
});
export type Pokemon = z.infer<typeof PokemonSchema>;

export const PokemonListResponseSchema = z.object({
  count: z.number(),
  next: z.string().url().nullable(),
  previous: z.string().url().nullable(),
  results: z.array(
    z.object({
      name: z.string(),
      url: z.string().url(),
    }),
  ),
});
export type PokemonListResponse = z.infer<typeof PokemonListResponseSchema>;
