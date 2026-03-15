export function formatWriteupDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (diffDays <= 14) {
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDaysRounded = Math.floor(diffHours / 24);

    if (diffSeconds < 60) {
      return diffSeconds === 1 ? '1 second ago' : `${diffSeconds} seconds ago`;
    } else if (diffMinutes < 60) {
      return diffMinutes === 1 ? '1 minute ago' : `${diffMinutes} minutes ago`;
    } else if (diffHours < 24) {
      return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
    } else if (diffDaysRounded < 7) {
      return diffDaysRounded === 1 ? '1 day ago' : `${diffDaysRounded} days ago`;
    } else {
      const diffWeeks = Math.floor(diffDaysRounded / 7);
      return diffWeeks === 1 ? '1 week ago' : `${diffWeeks} weeks ago`;
    }
  }

  // Absolute format for dates older than 2 weeks
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
