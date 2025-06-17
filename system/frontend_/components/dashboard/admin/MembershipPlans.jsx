import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import { Button } from '../../ui/Button';

const emptyForm = { name: '', price: '', durationDays: '', description: '' };

const MembershipPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchPlans = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/membership-plans');
      setPlans(res.data);
    } catch (err) {
      setError('Failed to load plans');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (plan) => {
    setEditingId(plan.id);
    setForm({
      name: plan.name,
      price: plan.price,
      durationDays: plan.durationDays,
      description: plan.description || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this plan?')) return;
    try {
      await api.delete(`/membership-plans/${id}`);
      fetchPlans();
    } catch (err) {
      setError('Failed to delete plan');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = {
        name: form.name,
        price: form.price.toString(),
        durationDays: parseInt(form.durationDays),
        description: form.description,
      };
      if (editingId) {
        await api.put(`/membership-plans/${editingId}`, payload);
      } else {
        await api.post('/membership-plans', payload);
      }
      setShowForm(false);
      setForm(emptyForm);
      setEditingId(null);
      fetchPlans();
    } catch (err) {
      setError('Failed to save plan');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Membership Plans</h1>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="mb-4 flex justify-between items-center">
        <Button onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyForm); }}>
          Add Plan
        </Button>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 max-w-lg">
          <div className="mb-2">
            <label className="block text-sm font-medium">Name</label>
            <input name="name" value={form.name} onChange={handleChange} required className="border rounded px-2 py-1 w-full" />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium">Price</label>
            <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} required className="border rounded px-2 py-1 w-full" />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium">Duration (days)</label>
            <input name="durationDays" type="number" value={form.durationDays} onChange={handleChange} required className="border rounded px-2 py-1 w-full" />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
          </div>
          <div className="flex gap-2 mt-2">
            <Button type="submit" disabled={saving}>{saving ? 'Saving...' : (editingId ? 'Update' : 'Create')}</Button>
            <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditingId(null); setForm(emptyForm); }}>Cancel</Button>
          </div>
        </form>
      )}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Duration</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr key={plan.id}>
                <td className="py-2 px-4 border-b">{plan.name}</td>
                <td className="py-2 px-4 border-b">₹{plan.price}</td>
                <td className="py-2 px-4 border-b">{plan.durationDays} days</td>
                <td className="py-2 px-4 border-b">{plan.description}</td>
                <td className="py-2 px-4 border-b">
                  <Button size="sm" onClick={() => handleEdit(plan)}>Edit</Button>
                  <Button size="sm" variant="outline" className="ml-2" onClick={() => handleDelete(plan.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MembershipPlans; 