import React, { useEffect, useState } from "react";
import { getResidualsSum, inRange } from "../scripts/lean";

const Graph = ({ data, x, y }) => {
  const [state, setState] = useState({
    intercept: 0,
    slope: 1,
    stepTaken: 0,
    run: true,
  });
  const LEARN_RATE = 0.0000001;
  const MIN_STEP_SIZE = 0.0000001;

  useEffect(() => {
    const interval = setInterval(() => {
      if (state.stepTaken < 10000 && state.run) {
        const residualsSum = getResidualsSum(data, state);
        const stepSize = {
          intercept: residualsSum.intercept * LEARN_RATE,
          slope: residualsSum.slope * LEARN_RATE,
        };
        const intercept = state.intercept - stepSize.intercept;
        const slope = state.slope - stepSize.slope;

        if (
          inRange(stepSize.intercept, MIN_STEP_SIZE * -1, MIN_STEP_SIZE) ||
          inRange(stepSize.slope, MIN_STEP_SIZE * -1, MIN_STEP_SIZE)
        ) {
          clearInterval(interval);
          setState({ ...state, run: false });
        } else {
          setState({
            ...state,
            intercept: intercept,
            slope: slope,
            stepTaken: state.stepTaken + 1,
          });
        }
      } else {
        clearInterval(interval);
      }
    }, 1);

    return () => interval && clearInterval(interval);
  }, [state, data]);

  return (
    <div>
      <svg
        width="300"
        height="300"
        style={{
          borderBottom: "3px solid black",
          borderLeft: "3px solid black",
          marginTop: 20,
        }}
      >
        <line
          x1="0"
          y1={300 - state.intercept}
          x2="300"
          y2={300 - state.slope * 300}
          style={{ stroke: "rgb(255,0,0)", strokeWidth: 2 }}
        />

        {data.map((person, key) => {
          return (
            <circle
              key={key}
              cx={person[x]}
              cy={300 - person[y]}
              r="2.5"
              fill="red"
            />
          );
        })}
      </svg>
      <p>Y-Axis: Height | X-Axis: Weight</p>
      <div
        style={{
          border: "1px solid black",
          width: "80%",
          margin: "20px auto 0 auto",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <p>
          <strong>Steps Taken: </strong>
          {state.stepTaken}
        </p>
        <p>
          <strong>Intercept: </strong>
          {state.intercept}
        </p>
        <p>
          <strong>Slope: </strong>
          {state.slope}
        </p>
      </div>
    </div>
  );
};

export default Graph;
