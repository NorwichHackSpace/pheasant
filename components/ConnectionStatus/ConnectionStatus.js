import React from "react";

class Connection {
  constructor(onStatus) {
    sl.addConnectionListener({
      onConnectionStatusChange: function (event) {
        var status;

        console.log(event.getConnectionState());

        switch (event.getConnectionState()) {
          case "CONNECTED":
          case "RECONNECTED":
          case "RETRIEVINGCREDENTIALS":
          case "CREDENTIALSRETRIEVED":
            status = "connecting";
            break;

          case "CONNECTING":
          case "LOGINFAILED":
          case "LOST":
          case "PAUSED":
          case "CREDENTIALSRETRIEVALFAILED":
          case "DISCONNECTED":
          case "EJECTED":
          case "FAILED":
          case "UNREACHABLE":
            status = "disconnected";
            break;

          case "LOGGEDIN":
            status = "connected";
            break;
        }

        onStatus(status);
      },
    });

    sl.connect();
  }
}

class ConnectedTile extends Component {
  constructor() {
    super();

    this.state = {
      status: "disconnected", // connected connecting disconnected
      pairs: {},
    };

    new Connection((status) => {
      this.state.status = status;
      this.setState(this.state);
    });
  }

  render(props, state) {
    return <div></div>;
  }
}

export default function (holder) {
  render(<ConnectedTile />, holder);
}
