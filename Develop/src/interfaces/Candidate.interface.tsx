// TODO: Create an interface for the Candidate objects returned by the API
// types.ts or within the component file
export interface GithubUser {
    login: string;
    id: number;
    avatar_url: string;
    company?: string;
    bio?: string;
    html_url: string;
  }
  