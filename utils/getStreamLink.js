import { StreamLinkFactory } from "sljs";

const liberatorProtocol = "rttp";
const liberatorHost = "localhost";
// const liberatorHost = "backend-mocks-v3.caplin.com";
const liberatorPort = "18080";

export default function getStreamLink() {
  const streamLink = StreamLinkFactory.create({
    application_id: "configadmin",
    username: "admin",
    password: "admin",
    liberator_urls: `${liberatorProtocol}://${liberatorHost}:${liberatorPort}`,
  });

  const connectionListener = {
    onConnectionStatusChange: function (connectionStatusEvent) {
      const connectionStatus = `StreamLink is now "${connectionStatusEvent.getConnectionState()}" to ${connectionStatusEvent.getLiberatorUrl()}`;

      console.log(connectionStatus);
    },

    onStatisticsChange: function (statisticsEvent) {},

    onServiceStatusChange: function (serviceStatusEvent) {},

    onSourceStatusChange: function (sourceStatusEvent) {},
  };

  streamLink.addConnectionListener(connectionListener);
  streamLink.connect();

  return streamLink;
}
