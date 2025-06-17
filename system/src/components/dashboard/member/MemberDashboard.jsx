import React from 'react';
import { Calendar, TrendingUp, Clock, Award } from 'lucide-react';
import { Card } from '../../ui/Card';

export const MemberDashboard = () => {
  const stats = [
    { label: 'Workouts This Month', value: '18', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Hours Trained', value: '24.5', icon: Clock, color: 'text-blue-600' },
    { label: 'Upcoming Sessions', value: '3', icon: Calendar, color: 'text-purple-600' },
    { label: 'Goals Achieved', value: '12', icon: Award, color: 'text-yellow-600' },
  ];

  const recentWorkouts = [
    { date: '2024-01-15', type: 'Cardio', duration: '45 min', trainer: 'Sarah Johnson' },
    { date: '2024-01-13', type: 'Strength Training', duration: '60 min', trainer: 'Mike Wilson' },
    { date: '2024-01-11', type: 'Yoga', duration: '30 min', trainer: 'Emma Davis' },
  ];

  const upcomingSessions = [
    { date: '2024-01-17', time: '10:00 AM', type: 'Personal Training', trainer: 'Sarah Johnson' },
    { date: '2024-01-19', time: '2:00 PM', type: 'Group Class', trainer: 'Mike Wilson' },
    { date: '2024-01-22', time: '6:00 PM', type: 'Cardio Session', trainer: 'Emma Davis' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back, Mike!</h1>
        <p className="text-gray-600">Here's your fitness journey overview</p>
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
        {/* Recent Workouts */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Workouts</h2>
          <div className="space-y-4">
            {recentWorkouts.map((workout, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{workout.type}</h3>
                  <p className="text-sm text-gray-600">{workout.date} • {workout.duration}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{workout.trainer}</p>
                  <p className="text-xs text-gray-500">Trainer</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Sessions */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Sessions</h2>
          <div className="space-y-4">
            {upcomingSessions.map((session, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div>
                  <h3 className="font-medium text-gray-900">{session.type}</h3>
                  <p className="text-sm text-gray-600">{session.date} at {session.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-blue-700">{session.trainer}</p>
                  <p className="text-xs text-blue-600">Trainer</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Membership Status */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Membership Status</h2>
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-sm text-gray-600">Current Plan</p>
                <p className="font-medium text-gray-900">Premium Monthly</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Expires On</p>
                <p className="font-medium text-gray-900">March 15, 2024</p>
              </div>
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">$79.99</p>
            <p className="text-sm text-gray-600">per month</p>
          </div>
        </div>
      </Card>
    </div>
  );
};