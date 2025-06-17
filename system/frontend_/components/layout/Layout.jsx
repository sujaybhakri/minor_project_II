import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export const Layout = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex h-[calc(100vh-73px)]">
        <Sidebar activeTab={activeTab} onTabChange={onTabChange} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};