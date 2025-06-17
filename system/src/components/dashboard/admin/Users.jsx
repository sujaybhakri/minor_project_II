import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';

const EditMemberModal = ({ user, open, onClose, onSave, isNew }) => {
  const [form, setForm] = useState({ name: '', email: '', roleId: '', password: '' });
  const [roles, setRoles] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [addMembership, setAddMembership] = useState({ planId: '', startDate: '', endDate: '' });
  const [adding, setAdding] = useState(false);
  const [editingMembership, setEditingMembership] = useState(null);
  const [editMembershipForm, setEditMembershipForm] = useState({ planId: '', startDate: '', endDate: '', isActive: true });

  useEffect(() => {
    if (!open) return;
    if (user) {
      setForm({ name: user.name, email: user.email, roleId: user.roleId || user.role?.id, password: '' });
    } else {
      setForm({ name: '', email: '', roleId: '', password: '' });
    }
    setLoading(true);
    setError(null);
    Promise.all([
      api.get('/roles'),
      user ? api.get(`/memberships/user/${user.id}`) : Promise.resolve({ data: [] }),
      api.get('/membership-plans')
    ]).then(([rolesRes, membershipsRes, plansRes]) => {
      setRoles(rolesRes.data.filter(r => r.name.toLowerCase() === 'member'));
      setMemberships(membershipsRes.data);
      setPlans(plansRes.data);
    }).catch(() => setError('Failed to load member data'))
      .finally(() => setLoading(false));
  }, [open, user]);

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
          password: form.password || 'changeme123',
          roleId: Number(form.roleId)
        });
      } else {
        await api.put(`/user-management/users/${user.id}`, {
          name: form.name,
          email: form.email,
          role: { id: form.roleId }
        });
      }
      onSave();
    } catch (err) {
      setError('Failed to save member');
    } finally {
      setSaving(false);
    }
  };

  const handleAddMembership = async () => {
    setAdding(true);
    setError(null);
    try {
      await api.post('/memberships', {
        userId: user.id,
        planId: Number(addMembership.planId),
        startDate: addMembership.startDate
      });
      // Refresh memberships
      const membershipsRes = await api.get(`/memberships/user/${user.id}`);
      setMemberships(membershipsRes.data);
      setAddMembership({ planId: '', startDate: '', endDate: '' });
    } catch (err) {
      setError('Failed to add membership');
    } finally {
      setAdding(false);
    }
  };

  const handleEditMembership = (membership) => {
    setEditingMembership(membership);
    setEditMembershipForm({
      planId: membership.planId,
      startDate: membership.startDate,
      endDate: membership.endDate,
      isActive: membership.isActive,
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4">{isNew ? 'Add Member' : 'Edit Member'}</h2>
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
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
            </div>
            {isNew && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Password</label>
                <input type="password" name="password" value={form.password} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
                <div className="text-xs text-gray-500 mt-1">Password must be at least 6 characters.</div>
              </div>
            )}
            {!isNew && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Memberships</label>
                {memberships.length === 0 ? (
                  <div className="text-gray-500">No memberships</div>
                ) : (
                  <ul className="divide-y divide-gray-100 mb-2">
                    {memberships.map((m) => (
                      <li key={m.id} className="py-2 flex justify-between items-center">
                        <span>{m.planName || 'N/A'}</span>
                        <span className="text-xs text-gray-500">{m.startDate} - {m.endDate}</span>
                        <span className={`text-xs px-2 py-1 rounded ${m.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{m.isActive ? 'Active' : 'Inactive'}</span>
                        <button
                          className="ml-2 text-blue-600 underline"
                          onClick={() => handleEditMembership(m)}
                        >
                          Edit
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                {editingMembership && (
                  <div className="border p-3 mt-2 rounded bg-gray-50">
                    <div className="mb-2 font-semibold">Edit Membership</div>
                    <select
                      className="border rounded px-2 py-1 mb-2"
                      value={editMembershipForm.planId}
                      onChange={e => setEditMembershipForm({ ...editMembershipForm, planId: e.target.value })}
                    >
                      <option value="">Select plan</option>
                      {plans.map(plan => (
                        <option key={plan.id} value={plan.id}>{plan.name}</option>
                      ))}
                    </select>
                    <input
                      type="date"
                      className="border rounded px-2 py-1 mb-2"
                      value={editMembershipForm.startDate}
                      onChange={e => setEditMembershipForm({ ...editMembershipForm, startDate: e.target.value })}
                    />
                    <input
                      type="date"
                      className="border rounded px-2 py-1 mb-2"
                      value={editMembershipForm.endDate}
                      onChange={e => setEditMembershipForm({ ...editMembershipForm, endDate: e.target.value })}
                    />
                    <label className="block mb-2">
                      <input
                        type="checkbox"
                        checked={editMembershipForm.isActive}
                        onChange={e => setEditMembershipForm({ ...editMembershipForm, isActive: e.target.checked })}
                      />
                      <span className="ml-2">Active</span>
                    </label>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={async () => {
                          setSaving(true);
                          setError(null);
                          try {
                            await api.put(`/memberships/${editingMembership.id}`, {
                              planId: Number(editMembershipForm.planId),
                              startDate: editMembershipForm.startDate,
                              endDate: editMembershipForm.endDate,
                              isActive: editMembershipForm.isActive,
                            });
                            // Refresh memberships
                            const membershipsRes = await api.get(`/memberships/user/${user.id}`);
                            setMemberships(membershipsRes.data);
                            setEditingMembership(null);
                          } catch (err) {
                            setError('Failed to update membership');
                          } finally {
                            setSaving(false);
                          }
                        }}
                      >
                        Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingMembership(null)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
                <div className="border-t pt-2 mt-2">
                  <div className="font-semibold mb-1">Add Membership</div>
                  <div className="flex flex-col gap-2">
                    <select
                      className="border rounded px-2 py-1"
                      value={addMembership.planId}
                      onChange={e => setAddMembership({ ...addMembership, planId: e.target.value })}
                    >
                      <option value="">Select plan</option>
                      {plans.map(plan => (
                        <option key={plan.id} value={plan.id}>{plan.name}</option>
                      ))}
                    </select>
                    <input
                      type="date"
                      className="border rounded px-2 py-1"
                      value={addMembership.startDate}
                      onChange={e => setAddMembership({ ...addMembership, startDate: e.target.value })}
                    />
                    <Button size="sm" onClick={handleAddMembership} disabled={adding || !addMembership.planId || !addMembership.startDate}>
                      {adding ? 'Adding...' : 'Add Membership'}
                    </Button>
                  </div>
                </div>
              </div>
            )}
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

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMember, setEditMember] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  const fetchMembers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/user-management/users?role=member');
      setMembers(res.data);
    } catch (err) {
      setError('Failed to fetch members');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this member?')) return;
    try {
      await api.delete(`/user-management/users/${id}`);
      fetchMembers();
    } catch (err) {
      setError('Failed to delete member');
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // Filter members by search
  const filteredMembers = members.filter(
    m =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Member Management</h1>
      <div className="flex items-center mb-4 gap-4">
        <Button onClick={() => setAddModalOpen(true)}>Add Member</Button>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-64"
        />
      </div>
      <Card>
        {loading ? (
          <div className="p-4 text-center">Loading members...</div>
        ) : error ? (
          <div className="p-4 text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredMembers.map((member) => (
                  <tr key={member.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{member.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{member.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{member.roleName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Button size="sm" variant="outline" onClick={() => setEditMember(member)}>Edit</Button>
                      <Button size="sm" variant="outline" className="ml-2" onClick={() => handleDelete(member.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
      <EditMemberModal
        user={editMember}
        open={!!editMember}
        onClose={() => setEditMember(null)}
        onSave={() => { setEditMember(null); fetchMembers(); }}
      />
      <EditMemberModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={() => { setAddModalOpen(false); fetchMembers(); }}
        isNew
      />
    </div>
  );
};

export default Members; 