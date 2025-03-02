import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/users/${user}`);
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      {profile && (
        <div className="profile-content">
          <h2>{profile.username}</h2>
          <p>{profile.email}</p>
          {/* Add more profile information */}
        </div>
      )}
    </div>
  );
}

export default Profile;
