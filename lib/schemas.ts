import { z } from 'zod';

export const WriteupInfoSchema = z.object({
  slug: z.array(z.string()),
  event: z.string(),
  category: z.string(),
  title: z.string(),
  path: z.string(),
  createdAt: z.string(),
  lastModified: z.string(),
  writer: z.string().optional(),
  nickname: z.string().optional(),
});

export const WriteupsIndexSchema = z.object({
  writeups: z.array(WriteupInfoSchema),
});

export type WriteupInfo = z.infer<typeof WriteupInfoSchema>;