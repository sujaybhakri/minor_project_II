import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { MemberDashboard } from '../components/dashboard/member/MemberDashboard';
import { TrainerDashboard } from '../components/dashboard/trainer/TrainerDashboard';
import { AdminDashboard } from '../components/dashboard/admin/AdminDashboard';
import { Profile } from '../components/dashboard/member/Profile';
import { useAuth } from '../context/AuthContext';
import Members from '../components/dashboard/admin/Users';
import MembershipPlans from '../components/dashboard/admin/MembershipPlans';
import TrainerManagement from '../components/dashboard/admin/TrainerManagement';

export const DashboardPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    if (activeTab === 'profile') {
      return <Profile />;
    }

    if (activeTab === 'dashboard') {
      switch (user?.role) {
        case 'admin':
          return <AdminDashboard />;
        case 'trainer':
          return <TrainerDashboard />;
        case 'member':
          return <MemberDashboard />;
        default:
          return <div>Role not recognized</div>;
      }
    }

    if (activeTab === 'members' && user?.role === 'admin') {
      return <Members />;
    }

    if (activeTab === 'trainers' && user?.role === 'admin') {
      return <TrainerManagement />;
    }

    if (activeTab === 'plans' && user?.role === 'admin') {
      return <MembershipPlans />;
    }

    // Placeholder for other tabs
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Page
        </h2>
        <p className="text-gray-600">This page is under development.</p>
      </div>
    );
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};