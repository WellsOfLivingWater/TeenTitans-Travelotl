import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

export default function Friends() {
  const [user, setUser] = useState(null);
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
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch('/api/users/user');
        const data = await res.json();
        setUser(data.user._id);
      } catch (err) {
        console.error(err);
      }
    }
    getUser();
  }, []);

  /**
   * Get friends
   * 
   * Fetches friends data from the server and sets the friends state
   * to the friends data.
   */
  const getFriends = async () => {
    try {
      const res = await fetch('/api/users/user/friends');
      const data = await res.json();
      console.log(data.friends);
      setFriends(data.friends);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
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
      <div key={friend._id} className='userlist'>
        <p>{friend.firstName} {friend.lastName}</p>
        <Button onClick={() => deleteFriend(friend._id)} size='sm'>Delete Friend</Button>
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
        const res = await fetch('/api/users');
        const data = await res.json();
        setUsers(data.users);
      } catch (err) {
        console.error(err);
      }
    }
    getUsers();
  }, [user, friends]);

  /**
   * Populate all users list component
   * 
   * Maps the users state to a list of user components.
   * Each user component has a button to add the user as a friend.
   * When the button is clicked, the addFriend function is called.
   */
  useEffect(() => {
    if (users) {
      setAllUsers(users.sort((a, b) => {
        return a.firstName.localeCompare(b.firstName);
      }).map((person) => {
        if (!friends.some(friend => friend._id === person._id) && person._id !== user) return (
          <div key={person._id} className='userlist'>
            <p>{person.firstName} {person.lastName}</p>
            <Button onClick={() => addFriend(person._id)} size='sm'>Add Friend</Button>
          </div>
        );
      }));
    }
  }, [user, users, friends]);

  /**
   * Add friend
   * 
   * Sends a post request to the server to add a friend.
   * 
   * @param {string} friendID - the id of the friend to add
   */
  const addFriend = async (friendID) => {
    try {
      const res = await fetch('/api/users/user/friends', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ friend: friendID }),
      });
      const data = await res.json();
      console.log(data);
      getFriends();
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Delete friend
   * 
   * Sends a delete request to the server to delete a friend.
   * 
   * @param {string} friendID - the id of the friend to delete
   */
  const deleteFriend = async (friendID) => {
    try {
      const res = await fetch('/api/users/user/friends', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ friend: friendID }),
      });
      const data = await res.json();
      console.log(data);
      getFriends();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='flex-container'>
      <div className='userlist-container'>
        <p id="itinerary-title">Friends</p>
        {friendsList}
      </div>
      <div className='userlist-container'>
        <p id="itinerary-title">All Users</p>
        {allUsers}
      </div>
    </div>
  );
}