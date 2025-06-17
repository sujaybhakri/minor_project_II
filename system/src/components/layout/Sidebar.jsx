import React from 'react';
import { 
  Home, 
  Users, 
  CreditCard, 
  BarChart3, 
  Settings, 
  Calendar,
  Dumbbell,
  CheckSquare,
  UserCheck,
  Clock,
  BookOpen
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const sidebarItems = [
  { icon: Home, label: 'Dashboard', path: 'dashboard', roles: ['admin', 'trainer', 'member'] },
  { icon: Users, label: 'Member Management', path: 'members', roles: ['admin'] },
  { icon: Users, label: 'Trainer Management', path: 'trainers', roles: ['admin'] },
  { icon: CreditCard, label: 'Membership Plans', path: 'plans', roles: ['admin'] },
  { icon: BarChart3, label: 'Attendance Reports', path: 'reports', roles: ['admin'] },
  { icon: Settings, label: 'System Settings', path: 'settings', roles: ['admin'] },
  { icon: UserCheck, label: 'Profile', path: 'profile', roles: ['trainer', 'member'] },
  { icon: CreditCard, label: 'My Membership', path: 'membership', roles: ['member'] },
  { icon: Dumbbell, label: 'Workout History', path: 'workouts', roles: ['member'] },
  { icon: Calendar, label: 'Book Session', path: 'book-session', roles: ['member'] },
  { icon: CheckSquare, label: 'Record Attendance', path: 'attendance', roles: ['trainer'] },
  { icon: BookOpen, label: 'Workout Programs', path: 'programs', roles: ['trainer'] },
  { icon: Clock, label: 'My Schedule', path: 'schedule', roles: ['trainer'] },
];

export const Sidebar = ({ activeTab, onTabChange }) => {
  const { user } = useAuth();

  const filteredItems = sidebarItems.filter(item => 
    item.roles.includes(user?.role || '')
  );

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <nav className="p-4 space-y-2">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => onTabChange(item.path)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};