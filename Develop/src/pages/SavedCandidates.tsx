import { useState, useEffect } from 'react';
import { GithubUser } from '../interfaces/Candidate.interface';


const SavedCandidates: React.FC = () => {
  const [potentialCandidates, setPotentialCandidates] = useState<GithubUser[]>([]);

  useEffect(() => {
    const storedCandidates = localStorage.getItem('potentialCandidates');
    const candidates: GithubUser[] = storedCandidates ? JSON.parse(storedCandidates) : [];
    setPotentialCandidates(candidates);
  }, []);

  const handleRemoveCandidate = (username: string) => {
    const updatedCandidates = potentialCandidates.filter(candidate => candidate.login !== username);
    setPotentialCandidates(updatedCandidates);
    localStorage.setItem('potentialCandidates', JSON.stringify(updatedCandidates));
  };

  return (
    <div>
      <h1>Saved Candidates</h1>
      {potentialCandidates.length > 0 ? (
        potentialCandidates.map(candidate => (
          <div key={candidate.id}>
            <h3>{candidate.login}</h3>
            <img src={candidate.avatar_url} alt={`${candidate.login}'s avatar`} width="100" />
            <p>{candidate.company || 'Company info not available'}</p>
            <p>{candidate.bio || 'Bio not available'}</p>
            <button onClick={() => handleRemoveCandidate(candidate.login)}>Remove</button>
          </div>
        ))
      ) : (
        <p>No saved candidates found</p>
      )}
    </div>
  );
};

export default SavedCandidates;
