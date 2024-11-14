# GitHub Dev Search

GitHub Dev Search is a web application that allows users to browse through GitHub users and save candidates to review later. It integrates with the GitHub API to retrieve user profiles and provides options to filter saved candidates based on profile details, such as whether they have a company or bio listed.

![image](https://github.com/user-attachments/assets/2c14eb5f-0405-4d6c-8c8e-382e945b966c)


## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies](#technologies)
- [Contact](#contact)

## Features
- **Browse GitHub Users**: Pulls a random list of GitHub users for you to explore.
- **Detailed Profile View**: Displays additional information about each user, including avatar, bio, and company (if available).
- **Save Candidates**: Mark users as potential candidates to review later.
- **Filter Options**: Filter saved candidates by profile details, such as those with a bio or a company listed.
- **Error Handling & Retry Logic**: Handles 404 errors, retries API requests when necessary, and provides fallback messages for broken images.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/github-dev-search.git
   cd github-dev-search
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables. Create a `.env` file in the root directory with the following:
   ```bash
   VITE_GITHUB_TOKEN=your_github_token_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage
1. Open the app in your browser at `http://localhost:3000` (or the port specified in your environment).
2. Use the navigation to view the "Saved Candidates" page and start browsing users to add to your list.
3. Filter saved candidates by selecting options like "Show only candidates with bio" and "Show only candidates with company."

### Deployed Application
Check out the deployed version of this project: [GitHub Dev Search on Render](https://github-dev-search.onrender.com)

## API Endpoints
This app uses the following GitHub API endpoints:
- **List Users**: `https://api.github.com/users?since={id}` - Retrieves a list of GitHub users.
- **User Profile**: `https://api.github.com/users/{username}` - Retrieves detailed information about a specific GitHub user.

## Technologies
- **Frontend**: React, TypeScript, Vite
- **UI**: Bootstrap, React Icons
- **Backend API**: GitHub REST API
- **Deployment**: Render

## Contact
For any questions or feedback, feel free to reach out!

**Email**: [cinnlight@gmail.com](mailto:cinnlight@gmail.com)

---

Feel free to customize this README further based on any additional details you’d like to include!
