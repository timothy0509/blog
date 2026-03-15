export const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  web: { bg: 'bg-blue-500', text: 'text-white' },
  crypto: { bg: 'bg-purple-500', text: 'text-white' },
  reverse: { bg: 'bg-orange-500', text: 'text-white' },
  pwn: { bg: 'bg-red-500', text: 'text-white' },
  forensics: { bg: 'bg-green-500', text: 'text-white' },
  misc: { bg: 'bg-cyan-500', text: 'text-white' },
  osint: { bg: 'bg-pink-500', text: 'text-white' },
  stego: { bg: 'bg-amber-500', text: 'text-white' },
  default: { bg: 'bg-zinc-500', text: 'text-white' },
};

export function getCategoryColor(category: string) {
  const key = category.toLowerCase();
  return CATEGORY_COLORS[key] ?? CATEGORY_COLORS.default;
}