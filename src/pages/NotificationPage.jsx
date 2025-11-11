import React, { useState, useEffect } from 'react';
import { http } from '../lib/http';
import { useNavigate } from 'react-router-dom';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('fegoToken');
      if (!token) return;
      const res = await http.get('/api/users/notifications', { headers: { 'x-auth-token': token } });
      setNotifications(res.data || []);
    } catch (e) {
      console.error('Fetch notifications failed:', e);
    }
  };

  useEffect(() => { fetchNotifications(); }, []);

  const markAsRead = async (id, link) => {
    try {
      const token = localStorage.getItem('fegoToken');
      await http.post(`/api/users/notifications/read/${id}`, {}, { headers: { 'x-auth-token': token } });
      await fetchNotifications();
      if (link) navigate(link);
    } catch (e) {
      console.error('Mark as read failed:', e);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '30px auto' }}>
      <h2>My Notifications</h2>
      {notifications.length === 0 ? (
        <p>You have no notifications.</p>
      ) : (
        notifications.map(note => (
          <div
            key={note._id}
            onClick={() => markAsRead(note._id, note.link)}
            style={{
              padding: '10px',
              margin: '6px 0',
              cursor: 'pointer',
              backgroundColor: note.isRead ? '#f7f7f7' : '#fff',
              border: '1px solid #ccc',
              borderLeft: note.isRead ? '4px solid #9c9c9c' : '4px solid #0077ff'
            }}
          >
            <strong>{note.isRead ? '✅' : '🔔'} {note.message}</strong>
            <small style={{ display: 'block', color: '#555' }}>
              {new Date(note.createdAt).toLocaleString()}
            </small>
          </div>
        ))
      )}
      <button onClick={() => navigate('/dashboard')} style={{ marginTop: 20 }}>Go to Dashboard</button>
    </div>
  );
};

export default NotificationPage;