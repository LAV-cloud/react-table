import React, { useState, useEffect } from 'react';
import Table from './components/Table';
import Item from './interfaces/Item';

function App() {
  const [data, setData] = useState<Item[]>([]);

  async function getData(url: string) {
    await fetch(url).then(res => res.json()).then(result => setData(result));
  }

  useEffect(() => {
    getData("http://localhost:4200/items");
  }, [null])

  return (
    <div className="content">
      <Table data={data} />
    </div>
  );
}

export default App;
