export type Theme = 'light' | 'dark';

export interface NavLinkItem {
  name: string;
  pageId: string;
  href: string;
  current: boolean;
}

export interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  category: 'work' | 'education';
} 