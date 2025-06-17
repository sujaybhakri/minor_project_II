import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SessionStatus } from '../../../types';

export const SessionBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/api/session-bookings/member/current');
        setBookings(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch session bookings');
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case SessionStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      case SessionStatus.CONFIRMED:
        return 'bg-green-100 text-green-800';
      case SessionStatus.CANCELLED:
        return 'bg-red-100 text-red-800';
      case SessionStatus.COMPLETED:
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading session bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Sessions</h1>
        <p className="text-gray-600">View and manage your training sessions</p>
      </div>

      <div className="grid gap-6">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Session with {booking.trainer.name}
                </h3>
                <p className="text-gray-600">
                  {new Date(booking.sessionDate).toLocaleDateString()} at{' '}
                  {new Date(booking.startTime).toLocaleTimeString()}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                {booking.status}
              </span>
            </div>
            <div className="mt-4 flex justify-end space-x-4">
              {booking.status === SessionStatus.PENDING && (
                <>
                  <button
                    onClick={() => handleCancelBooking(booking.id)}
                    className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 