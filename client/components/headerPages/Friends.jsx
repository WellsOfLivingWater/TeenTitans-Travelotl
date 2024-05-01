import { useEffect, useState } from 'react';

export default function Friends() {
  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const res = await fetch('/api/users/user', {
          method: 'get',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        setUser(res);
        console.log(user);
      } catch (err) {
        console.error(err);
      }
    }
    getUser();
  }, []);

  return (
    <div>
      <h2>Friends</h2>
      <p>Friends page content...</p>
    </div>
  );
}