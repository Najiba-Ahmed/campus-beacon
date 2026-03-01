import React, { useEffect, useState } from 'react';
import API from '../services/api';

const categories = ['', 'Electronics','ID Cards','Keys','Clothing','Bags','Documents','Others'];
const statuses = ['', 'Lost','Found','Claimed','Resolved'];

export default function Feed(){
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState({ q:'', category:'', status:'' });

  async function load() {
    const params = {};
    if (filter.q) params.q = filter.q;
    if (filter.category) params.category = filter.category;
    if (filter.status) params.status = filter.status;
    const res = await API.get('/items', { params });
    setItems(res.data);
  }

  useEffect(()=> {
    load();
    const handler = () => load();
    window.addEventListener('refreshFeed', handler);
    return () => window.removeEventListener('refreshFeed', handler);
  }, [filter.q, filter.category, filter.status]);

  const updateStatus = async (id, newStatus) => {
    try {
      await API.put(`/items/${id}/status`, { status: newStatus });
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <section className="card">
      <h2>Feed</h2>
      <div className="filters">
        <input placeholder="Search" value={filter.q} onChange={e=>setFilter({...filter,q:e.target.value})} />
        <select value={filter.category} onChange={e=>setFilter({...filter,category:e.target.value})}>
          {categories.map(c => <option key={c} value={c}>{c || 'All Categories'}</option>)}
        </select>
        <select value={filter.status} onChange={e=>setFilter({...filter,status:e.target.value})}>
          {statuses.map(s => <option key={s} value={s}>{s || 'All Statuses'}</option>)}
        </select>
      </div>

      <ul className="list">
        {items.map(item => (
          <li key={item._id}>
            <div>
              <strong>{item.title}</strong> <em>({item.category})</em>
              <div>{item.description}</div>
              <div>Zone: {item.zone} | Status: {item.status} | Posted by: {item.postedByEmail}</div>
            </div>
            <div className="actions">
              {item.status !== 'Claimed' && item.status !== 'Resolved' && (
                <button onClick={()=>updateStatus(item._id, item.status === 'Found' ? 'Claimed' : 'Found')}>
                  Toggle Found/Claimed
                </button>
              )}
              <button onClick={()=>updateStatus(item._id, 'Resolved')}>Mark Resolved</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}