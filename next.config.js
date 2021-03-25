module.exports = {
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: "secret",
    // secondSecret: process.env.SECOND_SECRET, // Pass through env variables
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    title: "Pheasant",
    defaultTheme: "EAAA",
    mapboxApiAccessToken: "pk.eyJ1IjoidG9ieWNhdGxpbiIsImEiOiJja2xtdDh6b3gwY2c5Mm9xeXo4MTg4NjEzIn0.6ayr26hPZGDJoD7_JzvKxw",
    what3wordsToken: "6IFMHOO1", //6IFMHOO1 ~Percy
  },
};
