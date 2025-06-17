import React, { useState, useEffect } from 'react';
import { Users, CreditCard, TrendingUp, AlertCircle, UserCheck, Calendar } from 'lucide-react';
import { Card } from '../../ui/Card';
import api from '../../../services/api';

export const AdminDashboard = () => {
  const [stats, setStats] = useState([]);
  const [recentMembers, setRecentMembers] = useState([]);
  const [systemAlerts, setSystemAlerts] = useState([]);
  const [membershipStats, setMembershipStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, membersRes, membershipRes, alertsRes] = await Promise.all([
          api.get('/admin/dashboard/stats'),
          api.get('/admin/dashboard/recent-members'),
          api.get('/admin/dashboard/membership-stats'),
          api.get('/admin/dashboard/alerts')
        ]);

        // Transform stats data
        const statsData = [
          { 
            label: 'Total Members', 
            value: statsRes.data.totalMembers.toLocaleString(), 
            icon: Users, 
            color: 'text-blue-600',
            change: '+12%' // This could be calculated from historical data
          },
          { 
            label: 'Active Trainers', 
            value: statsRes.data.totalTrainers.toString(), 
            icon: UserCheck, 
            color: 'text-green-600',
            change: '+3%'
          },
          { 
            label: 'Monthly Revenue', 
            value: `₹${statsRes.data.monthlyRevenue.toLocaleString()}`, 
            icon: CreditCard, 
            color: 'text-purple-600',
            change: '+8%'
          },
          { 
            label: 'Today Attendance', 
            value: statsRes.data.todayAttendance.toString(), 
            icon: Calendar, 
            color: 'text-yellow-600',
            change: '+15%'
          }
        ];

        setStats(statsData);
        setRecentMembers(membersRes.data);
        setMembershipStats(membershipRes.data);
        setSystemAlerts(alertsRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('Request:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error message:', error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Comprehensive gym management overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="text-center" hover>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Members */}
        <Card className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Members</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Join Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentMembers.map((member, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{member.name}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{member.email}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(member.joinDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {member.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* System Alerts */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">System Alerts</h2>
          <div className="space-y-4">
            {systemAlerts.map((alert, index) => (
              <div key={index} className={`p-3 rounded-lg border ${
                alert.type === 'error' ? 'bg-red-50 border-red-200' :
                alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                alert.type === 'success' ? 'bg-green-50 border-green-200' :
                'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex items-start space-x-3">
                  <AlertCircle className={`w-4 h-4 mt-0.5 ${
                    alert.type === 'error' ? 'text-red-600' :
                    alert.type === 'warning' ? 'text-yellow-600' :
                    alert.type === 'success' ? 'text-green-600' :
                    'text-blue-600'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                    <p className="text-xs text-gray-500">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Membership Distribution */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Membership Distribution</h2>
        <div className="space-y-4">
          {membershipStats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${
                  index === 0 ? 'bg-blue-500' :
                  index === 1 ? 'bg-green-500' :
                  'bg-purple-500'
                }`}></div>
                <span className="font-medium text-gray-900">{stat.plan}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      index === 0 ? 'bg-blue-500' :
                      index === 1 ? 'bg-green-500' :
                      'bg-purple-500'
                    }`}
                    style={{ width: `${stat.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 w-12">{stat.count}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};