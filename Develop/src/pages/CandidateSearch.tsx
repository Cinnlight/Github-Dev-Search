import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaArrowLeft, FaArrowRight, FaTrash, FaUserPlus } from 'react-icons/fa';
import { GithubUser } from '../interfaces/Candidate.interface';
import { searchGithub, searchGithubUser } from '../api/API';

const CandidateSearch: React.FC = () => {
  const [users, setUsers] = useState<GithubUser[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [detailedUser, setDetailedUser] = useState<GithubUser | null>(null);

  // Fetch the list of users on initial mount
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

  // Fetch detailed information for the current user whenever `currentIndex` changes
  useEffect(() => {
    if (users[currentIndex]) {
      const fetchDetailedUser = async () => {
        const userDetail = await searchGithubUser(users[currentIndex].login);
        setDetailedUser(userDetail);
        console.log(userDetail);
      };
      fetchDetailedUser();
    }
  }, [currentIndex, users]);

  const handleRemoveUser = (username: string) => {
    const updatedUsers = users.filter(user => user.login !== username);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Update currentIndex if needed
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
  };

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
    <div className="d-flex justify-content-center">
      {loading ? (
        <p>Loading...</p>
      ) : detailedUser ? (
        <div key={detailedUser.id} className="card" style={{ width: '18rem' }}>
          <img
            src={detailedUser.avatar_url}
            className="card-img-top"
            alt={`${detailedUser.login}'s avatar`}
          />
          <div className="card-body text-center">
            <h5 className="card-title">{detailedUser.login}</h5>
            <p className="card-text">
              {detailedUser.company || 'Company info not available'}
            </p>
            <p className="card-text">
              {detailedUser.bio || 'Bio not available'}
            </p>
            <div className="d-flex justify-content-around mt-3">
              <button
                className="btn btn-success"
                onClick={() => {
                  addToPotentialCandidates(detailedUser);
                  handleNextUser();
                }}
              >
                <FaUserPlus />
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  handleRemoveUser(detailedUser.login);
                  handleNextUser();
                }}
              >
                <FaTrash />
              </button>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <button className="btn btn-secondary" onClick={handlePrevUser}>
                <FaArrowLeft />
              </button>
              <button className="btn btn-secondary" onClick={handleNextUser}>
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};

export default CandidateSearch;
