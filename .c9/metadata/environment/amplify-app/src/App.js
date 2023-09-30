{"filter":false,"title":"App.js","tooltip":"/amplify-app/src/App.js","undoManager":{"mark":0,"position":0,"stack":[[{"start":{"row":0,"column":0},"end":{"row":25,"column":0},"action":"remove","lines":["import logo from './logo.svg';","import './App.css';","","function App() {","  return (","    <div className=\"App\">","      <header className=\"App-header\">","        <img src={logo} className=\"App-logo\" alt=\"logo\" />","        <p>","          Edit <code>src/App.js</code> and save to reload.","        </p>","        <a","          className=\"App-link\"","          href=\"https://reactjs.org\"","          target=\"_blank\"","          rel=\"noopener noreferrer\"","        >","          Learn React","        </a>","      </header>","    </div>","  );","}","","export default App;",""],"id":2},{"start":{"row":0,"column":0},"end":{"row":23,"column":0},"action":"insert","lines":["","import { Amplify } from 'aws-amplify';","","import { Authenticator } from '@aws-amplify/ui-react';","import '@aws-amplify/ui-react/styles.css';","","import awsExports from './aws-exports';","Amplify.configure(awsExports);","","export default function App() {","  return (","    <Authenticator>","      {({ signOut, user }) => (","        <main>","          <h1>Hello {user.username}</h1>","          <img src=\"https://d1.awsstatic.com/serverless/Lambda%20Resources%20images/Serverless_Web_App_LP_assets-15.eefe7a0621f766eda9b31fe857a5b4344090e8e8.eefe7a0621f766eda9b31fe857a5b4344090e8e8.png\" />","          <button onClick={signOut}>Sign out</button>","        </main>","      )}","    </Authenticator>","  );","}","",""]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":23,"column":0},"end":{"row":23,"column":0},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1696061699297,"hash":"95c4e808612b65fc226b43754582198b0740f6b5"}