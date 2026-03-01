import React, { useState } from 'react';
import API from '../services/api';

const categories = ['Electronics','ID Cards','Keys','Clothing','Bags','Documents','Others'];
const statuses = ['Lost','Found'];

export default function CreatePost() {
  const [form, setForm] = useState({ title:'', description:'', category:'Electronics', status:'Lost', zone:'', sensitivity:'Low' });
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/items', form);
      setMsg('Created: ' + res.data.title);
      setForm({ title:'', description:'', category:'Electronics', status:'Lost', zone:'', sensitivity:'Low' });
      window.dispatchEvent(new Event('refreshFeed'));
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error');
    }
  };

  return (
    <section className="card">
      <h2>Create Post</h2>
      <form onSubmit={submit}>
        <input required placeholder="Title" value={form.title} onChange={e=>setForm({...form, title: e.target.value})} />
        <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form, description: e.target.value})} />
        <select value={form.category} onChange={e=>setForm({...form, category: e.target.value})}>
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={form.status} onChange={e=>setForm({...form, status: e.target.value})}>
          {statuses.map(s => <option key={s}>{s}</option>)}
        </select>
        <input placeholder="Zone (e.g., Library)" value={form.zone} onChange={e=>setForm({...form, zone: e.target.value})} />
        <select value={form.sensitivity} onChange={e=>setForm({...form, sensitivity: e.target.value})}>
          <option>Low</option><option>Medium</option><option>High</option>
        </select>
        <button type="submit">Create</button>
      </form>
      {msg && <p>{msg}</p>}
    </section>
  );
}

