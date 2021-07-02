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
import Coursework from './components/academics/Coursework'
import Research from './components/academics/Research';
import articleDisplay from './components/writing/ArticleDisplay';
import ScrollToTop from './components/ScrollToTop'
import albumDisplay from './components/music/AlbumDisplay';
import { articles } from './components/writing/Articles';
import NotFound from './components/NotFound';


function generateArticleRouter(a) {
  return <Route path={`/writing/${a.id}`} 
  component={() => articleDisplay({id: `${a.id}`})}></Route>
}

const articleRouters = articles.map(generateArticleRouter)
console.log(articleRouters)

function App() {
  const [wid, setWid] = useState(`0%`);
  const openSidenav = () => setWid(`50%`)
  const closeSidenav = () => setWid('0%')
  return (
    <div className="App" >
      <h1>Lucas Brito</h1>
      <HashRouter>
        <ScrollToTop/> 
        <div className="sideNavButton" onClick={openSidenav}>{'\u00a7'}</div>
        <div className="sideNavButtonBG"/>
        <NavigationComponent/>
        <hr/>
        <SideNavComponent width={wid} closeNav={closeSidenav}/>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home"/>
          </Route>
          <Route path="/home" component={HomeComponent} exact></Route>
          <Route path="/academics" component={AcademicsComponent} exact></Route>
            <Route path="/academics/coursework" component={Coursework}exact></Route>
            <Route path="/academics/research" component={Research}exact></Route>
          <Route path="/music" component={MusicComponent} exact></Route>
            <Route path="/music/laplacian-demon"
            component={() => albumDisplay({id: "laplacian-demon"})}></Route>
          <Route path="/writing" component={WritingComponent} exact></Route>
            {articleRouters}
            {/* <Route path="/writing/chico-review" 
            component={() => articleDisplay({id: "chico-review"})}></Route>
            <Route path="/writing/visions-of-guajiru" 
            component={() => articleDisplay({id: "visions-of-guajiru"})}></Route>
            <Route path="/writing/locke-property-rights" 
            component={() => articleDisplay({id: "locke-property-rights"})}></Route> */}
          <Route component={NotFound}></Route>
        </Switch>
      </HashRouter>
      <FooterComponent/>
    </div>
  );
}

export default App;
