import { useState, useEffect } from 'react';
import { GithubUser } from '../interfaces/Candidate.interface';
import { searchGithub } from '../api/API';

const CandidateSearch: React.FC = () => {
  const [users, setUsers] = useState<GithubUser[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
    try {
      const fetchedUsers = await searchGithub();
      if (fetchedUsers.length > 0) {
        setUsers(fetchedUsers);
        localStorage.setItem('users', JSON.stringify(fetchedUsers));
      } 
    } catch (err) {
        console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
    };
    fetchUsers();
  }, []);


  const handleRemoveUser = (username: string) => {
    const updatedUsers = users.filter(user => user.login !== username);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    if (currentIndex >= updatedUsers.length) {
      setCurrentIndex(updatedUsers.length - 1);
    }
  };

  const addToPotentialCandidates = (user: GithubUser) => {
    const storedCandidates = localStorage.getItem('potentialCandidates');
    const potentialCandidates: GithubUser[] = storedCandidates ? JSON.parse(storedCandidates) : [];
    potentialCandidates.push(user);
    localStorage.setItem('potentialCandidates', JSON.stringify(potentialCandidates));

    handleRemoveUser(user.login);
  }

  const handleNextUser = () => {
    if (users.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % users.length);
    }
  };

  const handlePrevUser = () => {
    if (users.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + users.length) % users.length);
    }
  };

  return (
    <div>
      {loading ? ( 
        <p>Loading...</p>
       ) : users.length > 0 && users[currentIndex] ? (
        <div key={users[currentIndex].id}>
          <h3>{users[currentIndex].login}</h3>
          <img src={users[currentIndex].avatar_url} alt={`${users[currentIndex].login}'s avatar`} width="100" />
          <p>{users[currentIndex].company || 'Company info not available'}</p>
          <p>{users[currentIndex].bio || 'Bio not available'}</p>
            <button onClick={() => { addToPotentialCandidates(users[currentIndex]); handleNextUser(); }}>Add to Potential Candidates</button>
          <button onClick={() => {handleRemoveUser(users[currentIndex].login); handleNextUser();}}>Remove</button>
          <button onClick={handlePrevUser}>Previous</button>
          <button onClick={handleNextUser}>Next</button>
        </div>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};

export default CandidateSearch;
