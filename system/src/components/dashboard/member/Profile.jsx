import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit } from 'lucide-react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Mike Member',
    email: 'member@gym.com',
    phone: '+1 (555) 123-4567',
    address: '123 Fitness Street, Gym City, GC 12345',
    birthDate: '1990-05-15',
    emergencyContact: 'Jane Doe - +1 (555) 987-6543',
    fitnessGoals: 'Weight loss and muscle building',
    medicalNotes: 'No known allergies or medical conditions'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // In a real app, this would save to the backend
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your personal information</p>
        </div>
        <Button
          icon={Edit}
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? 'outline' : 'primary'}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Picture */}
          <Card className="text-center">
            <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-16 h-16 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{formData.name}</h3>
            <p className="text-gray-600 mb-4">Member since January 2024</p>
            {isEditing && (
              <Button variant="outline" size="sm">
                Change Photo
              </Button>
            )}
          </Card>

          {/* Personal Information */}
          <Card className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Birth Date
                </label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Additional Information */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Additional Information</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emergency Contact
              </label>
              <input
                type="text"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fitness Goals
              </label>
              <textarea
                name="fitnessGoals"
                value={formData.fitnessGoals}
                onChange={handleInputChange}
                disabled={!isEditing}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Medical Notes
              </label>
              <textarea
                name="medicalNotes"
                value={formData.medicalNotes}
                onChange={handleInputChange}
                disabled={!isEditing}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex space-x-4 mt-6">
              <Button type="submit" variant="primary">
                Save Changes
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          )}
        </Card>
      </form>
    </div>
  );
};