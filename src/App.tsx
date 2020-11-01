import React from 'react';
import './App.css';
import '@south-paw/typeface-minecraft';
import { MenuBar } from './components/menubar/menubar.component';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { YerAWizardScreen } from './screens/yerawizard/yerawizard.screen';
import { HomeScreen } from './screens/home/home.screen';

function App() {
  return (
    <Router>
      <div>
        <div style={{ display: 'flex', paddingTop: 70 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', backgroundColor: '#111' }}>
            <div
              style={{
                maxWidth: 1200,
                width: '100%',
                backgroundColor: 'darkgray',
                borderWidth: 3,
                borderTopWidth: 0,
                borderRadius: 10,
                borderTopRightRadius: 0,
                borderTopLeftRadius: 0,
                borderStyle: 'solid',
                borderColor: 'black'
              }}
            >
              <div style={{ maxWidth: 1200, margin: 'auto' }}>
                <div style={{ position: 'relative' }}>
                  <div className="fade"></div>
                  <img src={require('./assets/panorama/panorama2.png')} alt={'PANORAMA NOT FOUND'} width={'100%'} />
                </div>
              </div>
              <Route exact={true} path="/">
                <HomeScreen />
              </Route>
              <Route exact={true} path="/yerawizard">
                <YerAWizardScreen />
              </Route>
            </div>
          </div>

        </div>
        <Route path="/" component={MenuBar} >
          {/* <MenuBar title={'CatLord MC'} /> */}
        </Route>
      </div>
    </Router>
  );
}

export default App;
