export const CATEGORY_COLORS: Record<string, { bg: string; text: string; bar: string; hex: string }> = {
  web: { bg: 'bg-[#DFE104]', text: 'text-black', bar: 'bg-[#616200]', hex: '#DFE104' },
  crypto: { bg: 'bg-[#A855F7]', text: 'text-black', bar: 'bg-[#A855F7]', hex: '#A855F7' },
  reverse: { bg: 'bg-[#F97316]', text: 'text-black', bar: 'bg-[#F97316]', hex: '#F97316' },
  rev: { bg: 'bg-[#F97316]', text: 'text-black', bar: 'bg-[#F97316]', hex: '#F97316' },
  pwn: { bg: 'bg-[#EF4444]', text: 'text-black', bar: 'bg-[#EF4444]', hex: '#EF4444' },
  forensics: { bg: 'bg-[#22C55E]', text: 'text-black', bar: 'bg-[#22C55E]', hex: '#22C55E' },
  misc: { bg: 'bg-[#06B6D4]', text: 'text-black', bar: 'bg-[#06B6D4]', hex: '#06B6D4' },
  osint: { bg: 'bg-[#EC4899]', text: 'text-black', bar: 'bg-[#EC4899]', hex: '#EC4899' },
  stego: { bg: 'bg-[#F59E0B]', text: 'text-black', bar: 'bg-[#F59E0B]', hex: '#F59E0B' },
  default: { bg: 'bg-[#e2e2e2]', text: 'text-black', bar: 'bg-[#616200]', hex: '#616200' },
};

export function getCategoryColor(category: string) {
  const key = category.toLowerCase();
  return CATEGORY_COLORS[key] ?? CATEGORY_COLORS.default;
}
