import React, { useState } from "react";
import "./App.css";
import useGetData from "./components/useGetData";
import { List } from "react-virtualized";

function App() {
  const [input, setInput] = useState("");
  const { loading, data, error } = useGetData(input);

  const handleOnchange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="App">
      <input onChange={handleOnchange} value={input} />
      {loading && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}
      {data.length ? (
        <List
          width={600}
          height={600}
          rowHeight={50}
          rowCount={data.length}
          rowRenderer={({ key, index, style }) => {
            const item = data[index];
            return (
              <h3 key={key} style={style}>
                {item}
              </h3>
            );
          }}
        />
      ) : (
        <h3>No matching result</h3>
      )}
    </div>
  );
}

export default App;
