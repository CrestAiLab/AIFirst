import {
  Brain,
  Cloud,
  Database,
  Zap,
  Users,
  MessageSquare,
  BookOpen,
  Calendar,
  type LucideIcon,
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Brain,
  Cloud,
  Database,
  Zap,
  Users,
  MessageSquare,
  BookOpen,
  Calendar,
}

export function getIcon(name?: string): LucideIcon {
  if (!name) return Zap
  return iconMap[name] || Zap
}
