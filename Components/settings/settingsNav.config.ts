import { User, Lock, Bell, Shield, Palette, Globe, HelpCircle, LucideIcon } from 'lucide-react'

export type SettingsSection =
  | 'profile' | 'account' | 'privacy'
  | 'notifications' | 'appearance' | 'language' | 'help'

interface NavItem {
  id: SettingsSection
  icon: LucideIcon
  label: string
  desc: string
}

interface NavGroup {
  group: string
  items: NavItem[]
}

export const sidebarNav: NavGroup[] = [
  {
    group: 'Account',
    items: [
      { id: 'profile', icon: User, label: 'Profile', desc: 'Name, photo, bio' },
      { id: 'account', icon: Lock, label: 'Account', desc: 'Password, email, phone' },
      { id: 'privacy', icon: Shield, label: 'Privacy', desc: 'Who can see your info' },
    ]
  },
  {
    group: 'Preferences',
    items: [
      { id: 'notifications', icon: Bell, label: 'Notifications', desc: 'Alerts and updates' },
      { id: 'appearance', icon: Palette, label: 'Appearance', desc: 'Theme and display' },
      { id: 'language', icon: Globe, label: 'Language', desc: 'Language and region' },
    ]
  },
  {
    group: 'Support',
    items: [
      { id: 'help', icon: HelpCircle, label: 'Help', desc: 'Support and feedback' },
    ]
  }
]