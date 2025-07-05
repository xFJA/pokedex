import { z } from 'zod';

export const PokemonMoveSchema = z.object({
  move: z.object({
    name: z.string(),
    url: z.string().url(),
  }),
});

export const PokemonTypeSchema = z.object({
  slot: z.number(),
  type: z.object({
    name: z.string(),
    url: z.string().url(),
  }),
});

export const PokemonStatSchema = z.object({
  base_stat: z.number(),
  effort: z.number(),
  stat: z.object({
    name: z.string(),
    url: z.string().url(),
  }),
});

export const PokemonDetailsSchema = z.object({
  id: z.number(),
  name: z.string(),
  moves: z.array(PokemonMoveSchema),
  stats: z.array(PokemonStatSchema),
  types: z.array(PokemonTypeSchema),
});

export type PokemonDetails = z.infer<typeof PokemonDetailsSchema>;
