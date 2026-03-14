export const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  web: { bg: 'bg-blue-400', text: 'text-black' },
  crypto: { bg: 'bg-purple-400', text: 'text-black' },
  reverse: { bg: 'bg-orange-400', text: 'text-black' },
  pwn: { bg: 'bg-red-400', text: 'text-black' },
  forensics: { bg: 'bg-green-400', text: 'text-black' },
  misc: { bg: 'bg-cyan-400', text: 'text-black' },
  osint: { bg: 'bg-pink-400', text: 'text-black' },
  stego: { bg: 'bg-amber-400', text: 'text-black' },
  default: { bg: 'bg-zinc-400', text: 'text-black' },
};

export function getCategoryColor(category: string) {
  const key = category.toLowerCase();
  return CATEGORY_COLORS[key] ?? CATEGORY_COLORS.default;
}