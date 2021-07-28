import { makeStyles } from "@material-ui/core";

export default (theme) => ({
  root: {},
  main: {
    height: "inherit",
  },
  panelControl: {
    color: theme.palette.primary.light,
    position: "absolute",
    cursor: "pointer",
    top: "6px",
    right: "6px",
  },
  panelWrapper: {
    //'background-color': 'red',
  },
  hiddenIcon: {
    visibility: "hidden",
  },
});

// const converted = {
//   ".react-grid-layout": {
//     position: "relative",
//     transition: "height 200ms ease",
//   },
//   ".react-grid-item": {
//     transition: "all 200ms ease",
//     transitionProperty: "left, top",
//     boxSizing: "border-box",
//     boxShadow: "0px 3px 5px #00000029",
//     borderRadius: "5px",
//   },
//   ".react-grid-item.cssTransforms": { transitionProperty: "transform" },
//   ".react-grid-item.resizing": {
//     zIndex: 1,
//     willChange: "width, height",
//     opacity: 0.9,
//   },
//   ".react-grid-item.react-draggable-dragging": {
//     transition: "none",
//     zIndex: 3,
//     willChange: "transform",
//   },
//   ".react-grid-item.react-grid-placeholder": {
//     background: "red",
//     opacity: 0.2,
//     transitionDuration: "100ms",
//     zIndex: 2,
//     WebkitUserSelect: "none",
//     MozUserSelect: "none",
//     msUserSelect: "none",
//     OUserSelect: "none",
//     userSelect: "none",
//   },
//   ".react-grid-item > .react-resizable-handle": {
//     position: "absolute",
//     width: "20px",
//     height: "20px",
//     bottom: "0",
//     right: "0",
//     background:
//       'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg08IS0tIEdlbmVyYXRvcjogQWRvYmUgRmlyZXdvcmtzIENTNiwgRXhwb3J0IFNWRyBFeHRlbnNpb24gYnkgQWFyb24gQmVhbGwgKGh0dHA6Ly9maXJld29ya3MuYWJlYWxsLmNvbSkgLiBWZXJzaW9uOiAwLjYuMSAgLS0+DTwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DTxzdmcgaWQ9IlVudGl0bGVkLVBhZ2UlMjAxIiB2aWV3Qm94PSIwIDAgNiA2IiBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmMDAiIHZlcnNpb249IjEuMSINCXhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiDQl4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjZweCIgaGVpZ2h0PSI2cHgiDT4NCTxnIG9wYWNpdHk9IjAuMzAyIj4NCQk8cGF0aCBkPSJNIDYgNiBMIDAgNiBMIDAgNC4yIEwgNCA0LjIgTCA0LjIgNC4yIEwgNC4yIDAgTCA2IDAgTCA2IDYgTCA2IDYgWiIgZmlsbD0iIzAwMDAwMCIvPg0JPC9nPg08L3N2Zz4=")',
//     backgroundPosition: "bottom right",
//     padding: "0 3px 3px 0",
//     backgroundRepeat: "no-repeat",
//     backgroundOrigin: "content-box",
//     boxSizing: "border-box",
//     cursor: "se-resize",
//   },
//   ".columns": { MozColumns: "120px", WebkitColumns: "120px", columns: "120px" },
//   ".react-grid-item:not(.react-grid-placeholder)": {},
//   ".react-grid-item.static": { background: "#cce" },
//   ".react-grid-item .minMax": { fontSize: "12px" },
//   ".react-grid-dragHandleExample": {
//     cursor: ["move", "grab", "-moz-grab", "-webkit-grab"],
//   },
//   "li b": { fontSize: "19px", lineHeight: "14px" },
// };
