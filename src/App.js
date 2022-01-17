import logo from './logo.svg';
import './App.css';
import './styles/theme.scss';

function App() {
    return ( 
        <div className = "App" >
            <header className = "App-header" >
                <img src = { logo } className = "App-logo" alt = "logo" / >
                
                <p>Edit <code> src / App.js </code> and save to reload. </p>
                
                <a className = "App-link" href = "https://reactjs.org">Learn React </a> 
            </header> 
        </div>
    );
}

export default App;