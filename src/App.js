
import Navbar from './components/Navbar/Navbar.js';
import Marketplace from './Pages/Home/Marketplace';
import Profile from './Pages/Profile/Profile';


import {
    BrowserRouter as Router, Routes, Route,
} from "react-router-dom";



function App() {
    return (
        <div className="">
            <Router>
            <Navbar/>
            <Routes>
                    <Route exact path="/" element={<Marketplace />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;