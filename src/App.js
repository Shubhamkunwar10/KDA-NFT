
import Navbar from './components/Navbar/Navbar.js';
import Marketplace from './Pages/Home/Marketplace';
import Profile from './Pages/Profile/Profile';
import SellNFT from './Pages/SellNFT/SellNFT';
import NFTPage from './Pages/NFTPage/NFTPage';

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
                    <Route path='/nftpage/:id' element={<NFTPage />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/sellnft" element={<SellNFT />} />
                   
                </Routes>
            </Router>
        </div>
    );
}

export default App;