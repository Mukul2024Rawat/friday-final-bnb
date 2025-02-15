// utils/dateUtils.ts
export const timeDifference = (dateString: string): string => {
    const now = new Date();
    const reviewDate = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - reviewDate.getTime()) / 1000);
    
    const years = Math.floor(diffInSeconds / (365 * 24 * 60 * 60));
    if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
  
    const months = Math.floor(diffInSeconds / (30 * 24 * 60 * 60));
    if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
  
    const days = Math.floor(diffInSeconds / (24 * 60 * 60));
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  
    const hours = Math.floor(diffInSeconds / (60 * 60));
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  
    const minutes = Math.floor(diffInSeconds / 60);
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  
    return 'just now';
  };
  