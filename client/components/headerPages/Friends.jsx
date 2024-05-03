import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

export default function Friends() {
  // const [user, setUser] = useState(null);
  const [friends, setFriends] = useState([]);
  const [users, setUsers] = useState(null);
  const [friendsList, setFriendsList] = useState(null);
  const [allUsers, setAllUsers] = useState(null);

  /**
   * Get user on render
   * 
   * Fetches user data from the server and sets the user state
   * to the user data.
   */
  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       const token = localStorage.getItem('userToken');
  //       const res = await fetch('/api/users/user', {
  //         method: 'get',
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //         },
  //       });
  //       const data = await res.json();
  //       setUser(data.user);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  //   getUser();
  // }, []);

  /**
   * Get friends on render
   * 
   * Fetches friends data from the server and sets the friends state
   * to the friends data.
   */
  useEffect(() => {
    const getFriends = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const res = await fetch('/api/users/user/friends', {
          method: 'get',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await res.json();
        console.log(data.friends);
        setFriends(data.friends);
      } catch (err) {
        console.error(err);
      }
    }
    getFriends();
  }, []);

  /**
   * Populate friends list component
   * 
   * Maps the friends state to a list of friend components.
   */
  useEffect(() => {
    if (friends) setFriendsList(friends.sort((a, b) => {
      return a.firstName.localeCompare(b.firstName);
    }).map((friend) => (
      <div key={friend._id}>
        <h3>{friend.firstName} {friend.lastName}</h3>
      </div>
    )));
  }, [friends]);

  /**
   * Get all users on render
   * 
   * Fetches all users from the server and sets the users state
   * to the users data.
   */
  useEffect(() => {
    const getUsers = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const res = await fetch('/api/users', {
          method: 'get',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setUsers(data.users);
      } catch (err) {
        console.error(err);
      }
    }
    getUsers();
  }, []);

  /**
   * Populate all users list component
   * 
   * Maps the users state to a list of user components.
   * Each user component has a button to add the user as a friend.
   * When the button is clicked, the addFriend function is called.
   */
  useEffect(() => {
    if (users) {
      console.log(users);
      setAllUsers(users.sort((a, b) => {
        return a.firstName.localeCompare(b.firstName);
      }).map((person) => {
        if (!friends.includes(person)) return (
          <div className='flex-container' key={person._id}>
            <div className='userlist-name'>{person.firstName} {person.lastName}</div>
            <Button onClick={() => addFriend(person._id)} size='sm'>Add Friend</Button>
          </div>
        );
      }));
    }
  }, [users, friends]);

  /**
   * Add friend
   * 
   * Sends a post request to the server to add a friend.
   * 
   * @param {string} friendID - the id of the friend to add
   */
  const addFriend = async (friendID) => {
    try {
      const token = localStorage.getItem('userToken');
      const res = await fetch('/api/users/user/friends', {
        method: 'post',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ friend: friendID }),
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='flex-container'>
      <div>
        <p id="itinerary-title">Friends</p>
        {friendsList}
      </div>
      <div>
        <p id="itinerary-title">All Users</p>
        {allUsers}
      </div>
    </div>
  );
}