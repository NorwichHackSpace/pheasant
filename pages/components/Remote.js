import React from "react";

import { useRemoteComponent } from "../../hooks/useRemoteComponent";

const url = "https://raw.githubusercontent.com/Paciolan/remote-component/master/examples/remote-components/Time.js"; // prettier-ignore

const HelloWorld = (props) => {
  const [loading, err, Component] = useRemoteComponent(url);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (err != null) {
    return <div>Unknown Error: {err.toString()}</div>;
  }

  return <Component {...props} />;
};

const Remote = () => {
  return (
    <>
      <style jsx>
        {`
          p {
            text-align: center;
            color: #888;
          }
          h3 {
            color: #555;
          }
        `}
      </style>
      <div style={{ marginBottom: "2rem" }}></div>

      <div>
        <HelloWorld />
      </div>
    </>
  );
};

export default Remote;
