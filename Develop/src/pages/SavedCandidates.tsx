import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTrash } from 'react-icons/fa';
import { GithubUser } from '../interfaces/Candidate.interface';
import { searchGithubUser } from '../api/API';


// Page to display saved candidates that are stored in local storage
const SavedCandidates: React.FC = () => {
  const [potentialCandidates, setPotentialCandidates] = useState<GithubUser[]>([]);

  useEffect(() => {
    const storedCandidates = localStorage.getItem('potentialCandidates');
    const candidates: GithubUser[] = storedCandidates ? JSON.parse(storedCandidates) : [];
    setPotentialCandidates(candidates);
  }, []);

  // Fetch detailed info for a candidate if bio/company info is missing
  const fetchDetailedInfoIfNeeded = async (candidate: GithubUser) => {
    if (!candidate.company && !candidate.bio) {
      const detailedCandidate = await searchGithubUser(candidate.login);
      setPotentialCandidates(prevCandidates =>
        prevCandidates.map(c =>
          c.login === candidate.login ? { ...c, ...detailedCandidate } : c
        )
      );
    }
  };

  // Remove candidate from list and update localStorage
  const handleRemoveCandidate = (username: string) => {
    const updatedCandidates = potentialCandidates.filter(candidate => candidate.login !== username);
    setPotentialCandidates(updatedCandidates);
    localStorage.setItem('potentialCandidates', JSON.stringify(updatedCandidates));
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Saved Candidates</h1>
      {potentialCandidates.length > 0 ? (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title text-center">Candidate List</h5>
            <div className="list-group">
              {potentialCandidates.map(candidate => {
                // Fetch detailed info if needed for each candidate
                fetchDetailedInfoIfNeeded(candidate);

                return (
                  <div key={candidate.id} className="list-group-item d-flex align-items-center">
                    <img
                      src={candidate.avatar_url}
                      alt={`${candidate.login}'s avatar`}
                      className="rounded-circle me-3"
                      style={{ width: '50px', height: '50px' }}
                    />
                    <div className="flex-grow-1">
                      <h6 className="mb-0">{candidate.login}</h6>
                      <small className="text-muted">
                        {candidate.company || 'Company info not available'}
                      </small>
                      <p className="mb-1">{candidate.bio || 'Bio not available'}</p>
                    </div>
                    <button
                      className="btn btn-sm btn-danger ms-3"
                      onClick={() => handleRemoveCandidate(candidate.login)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center">No saved candidates found</p>
      )}
    </div>
  );
};

export default SavedCandidates;
