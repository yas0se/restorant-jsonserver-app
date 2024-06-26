import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './components/home';
import Articles from './components/article';
import NewArticle from './components/newArticle';
import EditArticle from './components/editArticle';
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <BrowserRouter>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <ul className="nav nav-pills">
                <li>
                  <Link className="btn btn-outline-info ms-1" to={"/Home"}>Home</Link>
                </li>
                <li>
                  <Link className="btn btn-outline-info ms-1" to={"/Articles"}>Articles</Link>
                </li>
                <li>
                  <Link className="btn btn-outline-info ms-1" to={"/newArticle"}>New Articles</Link>
                </li>
            </ul>
          </div>
        </nav>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Articles" element={<Articles />} />
        <Route path="/newArticle" element={<NewArticle />} />
        <Route path="/editArticle/:id" element={<EditArticle />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
