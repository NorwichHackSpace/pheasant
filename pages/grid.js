import React from "react";
import ReactDOM from "react-dom";
import ShowcaseLayout from "../components/DashLayout/AddRemoveLayout";

export default class ExampleLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { layout: [] };
    this.onLayoutChange = this.onLayoutChange.bind(this);
  }

  onLayoutChange(layout) {
    this.setState({ layout: layout });
  }

  stringifyLayout() {
    return this.state.layout.map(function (l) {
      return (
        <div className="layoutItem" key={l.i}>
          <b>{l.i}</b>: [{l.x}, {l.y}, {l.w}, {l.h}]
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <ShowcaseLayout onLayoutChange={this.onLayoutChange} />
      </div>
    );
  }
}
