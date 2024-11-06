import { searchGithub } from '../api/API';
import { GithubUser } from '../interfaces/Candidate.interface';

const saveToLocalStorage = (key: string, value: GithubUser[] | any) => {
  localStorage.setItem(key, JSON.stringify(value));
}

const displayGithubUsers = async () => {
    const users = await searchGithub();
    if (users.length > 0) {
      saveToLocalStorage('users', users);
    }
};

export { displayGithubUsers, saveToLocalStorage };