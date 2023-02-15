import React from 'react';
import './App.css';
import Species from "./components/Species";
import {QueryClient, QueryClientProvider} from "react-query";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import InfiniteSpecies from './components/InfiniteSpecies';

const queryClient = new QueryClient();

function App() {
    return (
        <div className="App">
            <QueryClientProvider client={queryClient}>
                <div className="container">
                    <h1>Star Wars</h1>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Species/>}/>
                            <Route path='/infinite' element={<InfiniteSpecies />}/>
                            {/*<Route path="/about" element={<About/>}/>
                        <Route path="/contact" element={<Contact/>}/>*/}
                        </Routes>
                    </BrowserRouter>
                </div>
            </QueryClientProvider>
        </div>
    );
}

export default App;
