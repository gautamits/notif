import React from 'react';
import PushConfiguration from './components/PushConfiguration';
import useGist from './helpers/useGist'
import usePush from './helpers/usePushData'
import './App.css';

function App() {
  const [files, loading, error] = useGist<{'public-keys.json': {[key: string]: {applicationServerKey: string}}}>('https://api.github.com/gists/0dd4eefe5c806baa90d968a34aed9983')
  usePush()
  if(loading) return <div>fetching Json</div>
  if(error) return <div>{JSON.stringify(error)}</div>
  if(!files || typeof files !== 'object') return <div>files not populated</div>
  const applicationServerKey = files['public-keys.json']['notif']['applicationServerKey']
  return (
    <div className="App px-[8px] py-[8px] h-full">
      <PushConfiguration applicationServerKey={applicationServerKey}/>
    </div>
  );
}

export default App;
