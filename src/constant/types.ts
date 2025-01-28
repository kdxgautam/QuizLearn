// types.ts
import { LucideIcon } from 'lucide-react';
// export interface NavItem {
//     href: string;
//     icon: React.ComponentType<{ className?: string }>;
//     label: string;
//     isActive: boolean;
//   }
  
  export interface Notification {
    id: number;
    text: string;
    time: string;
    unread: boolean;
  }



export interface NavItem {
  path: string;
  icon: LucideIcon;
  label: string;
}