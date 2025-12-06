import React from "react";
import Plot from "react-plotly.js";

function Visualisation({ title, labels = [], values = [] }) {
  return (
    <div className="w-full flex justify-center items-center mt-4">
      <div className="w-full max-w-[500px]"> 
        <Plot
          data={[
            {
              labels,
              values,
              type: "pie",
              textinfo: "label+percent",
              hoverinfo: "label+value",
              hole: 0, // normal pie (no donut)
            },
          ]}
          layout={{
            title: {
              text: title,
              font: { size: 20 },
            },
            autosize: true,
            height: 350,
            margin: { l: 10, r: 10, t: 60, b: 10 },
            legend: {
              orientation: "h",
              y: -0.2,
            },
          }}
          config={{
            responsive: true,
            displayModeBar: false,
          }}
          style={{ width: "100%", height: "100%" }}
          useResizeHandler
        />
      </div>
    </div>
  );
}

export default Visualisation;
