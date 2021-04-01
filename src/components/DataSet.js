import React, { useState } from "react";

const DataSet = ({ data }) => {
  const [rawData, setRawData] = useState(true);
  return (
    <div>
      <h1>Stochastic Gradient Descent Data Set</h1>
      <div
        style={{
          border: "1px solid black",
          width: "80%",
          margin: "20px auto 0 auto",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {rawData ? (
          <p>{JSON.stringify(data)}</p>
        ) : (
          data.map((person, index) => (
            <div style={{ padding: 10 }}>
              <p style={{ margin: 0, textAlign: "justify" }}>
                <strong>index:</strong> {index}
              </p>
              <p style={{ margin: 0, textAlign: "justify" }}>
                <strong>height:</strong> {person.height}
              </p>
              <p style={{ margin: 0, textAlign: "justify" }}>
                <strong>weight:</strong> {person.weight}
              </p>
            </div>
          ))
        )}
      </div>
      <button onClick={() => setRawData(!rawData)}>Toggle Data View</button>
    </div>
  );
};

export default DataSet;
