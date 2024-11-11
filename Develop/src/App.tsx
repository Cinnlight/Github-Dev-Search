import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import "bootstrap/dist/js/bootstrap.bundle.min.js";


function App() {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
