import React from 'react';
import Header from './components/header';
import List from './components/list';
import Tabs from './components/tabs';
import Search from './components/search';

export default function App() {
  return (
    <div className="testApp">
          <Header/>
          <Tabs/>
          <main>
              <Search/>
              <List/>
          </main>
      </div>
  );
}
