import { ReactNode } from 'react';
import { getCategoryColor } from '@/lib/colors';

type CategoryColor = { bg: string; text: string; bar?: string; hex?: string };

interface CategoryBadgeProps {
  children: ReactNode;
  category?: string;
  className?: string;
  size?: 'sm' | 'md';
}

export default function CategoryBadge({ 
  children, 
  category,
  className = '', 
  size = 'md' 
}: CategoryBadgeProps) {
  const color: CategoryColor = category ? getCategoryColor(category) : { bg: 'bg-[#DFE104]', text: 'text-black' };
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs',
  };

  return (
    <span 
      className={`font-bold border-2 border-black uppercase tracking-wide inline-block ${color.bg} ${color.text} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
}