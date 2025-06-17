import React from 'react';
import { Users, Calendar, Clock, TrendingUp } from 'lucide-react';
import { Card } from '../../ui/Card';

export const TrainerDashboard = () => {
  const stats = [
    { label: 'Active Clients', value: '24', icon: Users, color: 'text-blue-600' },
    { label: 'Sessions Today', value: '8', icon: Calendar, color: 'text-green-600' },
    { label: 'Hours This Week', value: '32', icon: Clock, color: 'text-purple-600' },
    { label: 'Client Progress', value: '89%', icon: TrendingUp, color: 'text-yellow-600' },
  ];

  const todaySchedule = [
    { time: '9:00 AM', client: 'John Smith', type: 'Personal Training', duration: '60 min' },
    { time: '10:30 AM', client: 'Sarah Wilson', type: 'Strength Training', duration: '45 min' },
    { time: '2:00 PM', client: 'Mike Johnson', type: 'Cardio Session', duration: '30 min' },
    { time: '4:00 PM', client: 'Emma Davis', type: 'Yoga Session', duration: '60 min' },
  ];

  const recentClients = [
    { name: 'John Smith', lastSession: '2024-01-15', progress: 'Excellent', status: 'Active' },
    { name: 'Sarah Wilson', lastSession: '2024-01-14', progress: 'Good', status: 'Active' },
    { name: 'Mike Johnson', lastSession: '2024-01-13', progress: 'Fair', status: 'Active' },
    { name: 'Emma Davis', lastSession: '2024-01-12', progress: 'Excellent', status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back, Sarah!</h1>
        <p className="text-gray-600">Manage your clients and training sessions</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="text-center" hover>
              <div className="flex items-center justify-center mb-4">
                <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Today's Schedule</h2>
          <div className="space-y-4">
            {todaySchedule.map((session, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{session.client}</h3>
                  <p className="text-sm text-gray-600">{session.type} • {session.duration}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-blue-700">{session.time}</p>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Scheduled
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Clients */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Clients</h2>
          <div className="space-y-4">
            {recentClients.map((client, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                <div>
                  <h3 className="font-medium text-gray-900">{client.name}</h3>
                  <p className="text-sm text-gray-600">Last session: {client.lastSession}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-700">{client.progress}</p>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {client.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 text-left bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors">
            <Calendar className="w-6 h-6 text-blue-600 mb-2" />
            <h3 className="font-medium text-gray-900">Record Attendance</h3>
            <p className="text-sm text-gray-600">Mark client check-ins</p>
          </button>
          <button className="p-4 text-left bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors">
            <Users className="w-6 h-6 text-green-600 mb-2" />
            <h3 className="font-medium text-gray-900">Create Program</h3>
            <p className="text-sm text-gray-600">Design workout plans</p>
          </button>
          <button className="p-4 text-left bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors">
            <Clock className="w-6 h-6 text-purple-600 mb-2" />
            <h3 className="font-medium text-gray-900">Update Schedule</h3>
            <p className="text-sm text-gray-600">Manage availability</p>
          </button>
        </div>
      </Card>
    </div>
  );
};