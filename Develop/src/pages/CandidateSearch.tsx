import { useState, useEffect } from 'react';
import { GithubUser } from '../interfaces/Candidate.interface';

const CandidateSearch: React.FC = () => {
  const [users, setUsers] = useState<GithubUser[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers) as GithubUser[]);
    }
  }, []);


  const handleRemoveUser = (username: string) => {
    const updatedUsers = users.filter(user => user.login !== username);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    if (currentIndex >= updatedUsers.length) {
      setCurrentIndex(updatedUsers.length - 1);
    }
  };

  const addToPotentialCandidates = (user: GithubUser) => {
    const storedCandidates = localStorage.getItem('potentialCandidates');
    const potentialCandidates: GithubUser[] = storedCandidates ? JSON.parse(storedCandidates) : [];
    potentialCandidates.push(user);

    handleRemoveUser(user.login);
  }

  const handleNextUser = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % users.length);
  };

  return (
    <div>
      {users.length > 0 ? (
        <div key={users[currentIndex].id}>
          <h3>{users[currentIndex].login}</h3>
          <img src={users[currentIndex].avatar_url} alt={`${users[currentIndex].login}'s avatar`} width="100" />
          <p>{users[currentIndex].company || 'Company info not available'}</p>
          <p>{users[currentIndex].bio || 'Bio not available'}</p>
          <button onClick={() => addToPotentialCandidates(users[currentIndex])}>Add to Potential Candidates</button>
          <button onClick={() => handleRemoveUser(users[currentIndex].login)}>Remove</button>
          <button onClick={handleNextUser}>Next</button>
        </div>
      ) : (
        <p>No users available.</p>
      )}
    </div>
  );
};

export default CandidateSearch;
