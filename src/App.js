import './App.css';
import {useState} from "react";
import NavigationComponent from './components/NavigationComponent';
import {Route, Switch, BrowserRouter, Redirect, HashRouter} from 'react-router-dom'
import HomeComponent from './components/HomeComponent';
import MusicComponent from './components/music/MusicComponent';
import AcademicsComponent from './components/academics/AcademicsComponent';
import WritingComponent from './components/writing/WritingComponent'
import FooterComponent from './components/FooterComponent';
import SideNavComponent from './components/SideNavComponent'


function App() {
  const [wid, setWid] = useState(`0%`);
  const openSidenav = () => setWid(`50%`)
  const closeSideanv = () => setWid('0%')
  return (
    <div className="App" >
      <meta name="viewport" content="width=device-width"/>
      <h1>Lucas Brito</h1>
      <HashRouter>
        <div className="sideNavButton" onClick={openSidenav}>{'\u00a7'}</div>
        <NavigationComponent/>
        <SideNavComponent width={wid} closeNav={closeSideanv}/>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home"/>
          </Route>
          <Route path="/home" component={HomeComponent} exact></Route>
          <Route path="/academics" component={AcademicsComponent} exact></Route>
          <Route path="/music" component={MusicComponent} exact></Route>
          <Route path="/writing" component={WritingComponent} exact></Route>
        </Switch>
      </HashRouter>
      <FooterComponent/>
    </div>
  );
}

export default App;
