import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import { Button } from '../../ui/Button';

const EditTrainerModal = ({ trainer, open, onClose, onSave, isNew }) => {
  const [form, setForm] = useState({ name: '', email: '', roleId: '' });
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!open) return;
    if (trainer) {
      setForm({ name: trainer.name, email: trainer.email, roleId: trainer.role?.id });
    } else {
      setForm({ name: '', email: '', roleId: '' });
    }
    setLoading(true);
    setError(null);
    api.get('/roles')
      .then((res) => setRoles(res.data))
      .catch(() => setError('Failed to load roles'))
      .finally(() => setLoading(false));
  }, [open, trainer]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      if (isNew) {
        await api.post('/users', {
          name: form.name,
          email: form.email,
          password: 'changeme123',
          roleId: Number(form.roleId)
        });
      } else {
        await api.put(`/user-management/users/${trainer.id}`, {
          name: form.name,
          email: form.email,
          role: { id: form.roleId }
        });
      }
      onSave();
    } catch (err) {
      setError('Failed to save trainer');
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4">{isNew ? 'Add Trainer' : 'Edit Trainer'}</h2>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500 mb-2">{error}</div>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Role</label>
              <select name="roleId" value={form.roleId} onChange={handleChange} className="w-full border rounded px-3 py-2" required>
                <option value="">Select role</option>
                {roles.filter(r => r.name.toLowerCase() === 'trainer').map((role) => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : (isNew ? 'Add' : 'Save')}</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const TrainerManagement = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editTrainer, setEditTrainer] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const fetchTrainers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/user-management/users?role=trainer');
      setTrainers(res.data);
    } catch (err) {
      setError('Failed to load trainers');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this trainer?')) return;
    try {
      await api.delete(`/user-management/users/${id}`);
      fetchTrainers();
    } catch (err) {
      setError('Failed to delete trainer');
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Trainer Management</h1>
      <Button className="mb-4" onClick={() => setAddModalOpen(true)}>Add Trainer</Button>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map(trainer => (
              <tr key={trainer.id}>
                <td className="py-2 px-4 border-b">{trainer.name}</td>
                <td className="py-2 px-4 border-b">{trainer.email}</td>
                <td className="py-2 px-4 border-b">{trainer.role?.name}</td>
                <td className="py-2 px-4 border-b">
                  <Button size="sm" onClick={() => setEditTrainer(trainer)}>Edit</Button>
                  <Button size="sm" variant="outline" className="ml-2" onClick={() => handleDelete(trainer.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <EditTrainerModal
        trainer={editTrainer}
        open={!!editTrainer}
        onClose={() => setEditTrainer(null)}
        onSave={() => { setEditTrainer(null); fetchTrainers(); }}
      />
      <EditTrainerModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={() => { setAddModalOpen(false); fetchTrainers(); }}
        isNew
      />
    </div>
  );
};

export default TrainerManagement; 