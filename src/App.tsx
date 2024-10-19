import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css';
import {Home} from "./components/Pages/Home";
import {Navbar} from "./components/General/Navbar";
import {Footer} from "./components/General/Footer";
import {Videography} from "./components/Pages/Videography";
import {Cinematography} from "./components/Pages/Cinematography";
import {Photography} from "./components/Pages/Photography";
import {About} from "./components/Pages/About";

function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/photography" element={<Photography/>}/>
                    <Route path="/videography" element={<Videography/>}></Route>
                    <Route path="/cinematography" element={<Cinematography/>}></Route>
                    <Route path="/about" element={<About/>}></Route>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </>);
}

export default App;
