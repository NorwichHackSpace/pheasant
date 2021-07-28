import React from "react";
import PropTypes from "prop-types";
import { WidthProvider, Responsive } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import { getFromLS, saveToLS } from "../LocalStorage/LocalStorage";
import { withStyles } from "@material-ui/core/styles";
import _ from "lodash";
//Settings
import styles from "./styles";
import defaults from "./defaults";
//Icons
import LayersClearIcon from "@material-ui/icons/LayersClear";
import CloseIcon from "@material-ui/icons/Close";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
//import AddButton from "./AddButton";
//import ResetButton from "./ResetButton";
class ResponsiveLocalStorageLayout extends React.Component {
  constructor(props) {
    super(props);
    this.defaultLayouts = defaults.Layouts;
    this.defaultCards = defaults.Cards;
    /*
     * TODO:
     * Here we automaticly generate an index for each of the cards, so that we can save the layout and cards display.
     * This generally works great for lazy adding of new cards at the end of the list.
     * But wait! If a card is removed (or a card is inserted in the middle of the list,) the indexes change!
     * So then a users saved layout index for a certain card now points to a different card.
     * We can choose to fix this by either
     *   a) Forcfully resetting all users to the default layout when the card list changes. This makes sure they notice the card changes.
     *   b) Changing the code so we have to manually assign an index, while making sure users storage of layouts remove now invalid indexes.
     */
    // getFromLS("displayedCards") ||
    // #
    let cards =
      getFromLS("displayedCards") ||
      this.defaultCards.map((obj, index) => ({
        i: index + 1,
        ...obj,
      }));
    let layouts = getFromLS("displayedLayouts") || this.defaultLayouts;

    this.state = {
      displayedLayouts: layouts,
      displayedCards: cards, //Add Index on first state
    };

    this.isCurrentlyMounted = false;
    this.onAddItem = this.onAddItem.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
  }

  componentDidMount() {
    //Don't populate the grid on first load. This ensures the layout generates currently and without stale server-side arrangements.
    this.isCurrentlyMounted = true;
    this.setState({}); //Regen
  }

  componentWillUnmount() {
    //When we change page
    this.isCurrentlyMounted = false;
  }

  resetLayout() {
    let displayedCards = this.defaultCards.map((obj, index) => ({
      i: index + 1,
      ...obj,
    }));
    this.onLayoutChange("", this.defaultLayouts);
    this.onCardsChange(displayedCards);
  }
  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols,
    });
  }
  onLayoutChange(layout, layouts) {
    // const gen = this._generateLayout();

    saveToLS("displayedLayouts", layouts);
    this.setState({ displayedLayouts: layouts });

    /*
     * BEHOLD THE MAGIC!
     * If you add cards or want to rearange the default layout, the easyiest way to edit the layout about is to uncomment
     * below. Then you can edit the layout in Chrome and copy + paste the layout code in defaults.js once you have done your last edit.
     */
    console.log(layouts);
  }

  onCardsChange(displayedCards) {
    saveToLS("displayedCards", displayedCards);
    this.setState({ displayedCards: displayedCards });
  }

  onAddItem() {
    /*eslint no-console: 0*/
    // console.log("adding", "n" + this.state.newCounter);

    this.state.displayedCards.concat({
      i: this.state.displayedCards + 1,
      x: (this.state.displayedCards.length * 2) % (this.state.cols || 12),
      y: Infinity, // puts it at the bottom
      w: 2,
      h: 2,
    });
  }

  onRemoveItem(key) {
    let displayedCards = _.reject(this.state.displayedCards, { i: key });
    this.onCardsChange(displayedCards);
  }

  createDraggable = (key, options) => (WrappedComponent, WrappedProps) => {
    if (typeof WrappedComponent == "undefined") {
      //We can't store the function in JSON-based storage, so recall it by ref
      if (typeof this.defaultCards[key - 1] !== "undefined") {
        //This *shouldn't* be undefined unless we messed with defaultCards
        WrappedComponent = this.defaultCards[key - 1].card;
      } else {
        this.resetLayout();
        return;
      } //Fall over and regenerate the layout. The site looks a bit clunky while it resets.
    }
    const { classes } = this.props;
    const defaultOptions = {
      isDragable: true,
      isCloseable: true,
    };
    options = { ...defaultOptions, ...options };
    /*
     * TODO:
     * In terms of MUI, having a hidden or disabled icon <CloseIcon className={???} />
     * instead of 'null' might make sense. Or not. Delete or change when/if decided.
     * //
     * For some reason if you don't at least try and generated WrappedComponents while not mounted
     * the layout doesn't get set correctly. Almost like the Cols or Breakpoints don't get calc'ed?
     */

    if (!this.isCurrentlyMounted) {
      return <div key={key} className={classes.panelWrapper}></div>;
    }

    return (
      <div key={key} className={classes.panelWrapper}>
        <div className={classes.panelControl}>
          {options.isDragable ? (
            <DragIndicatorIcon className="grid-drag-handle" />
          ) : null}
          {options.isCloseable ? (
            <CloseIcon onClick={this.onRemoveItem.bind(this, key)} />
          ) : null}
        </div>
        {/* Removed passing in {...this.props}  which fixes a prop conflict */}
        <WrappedComponent {...this.state} {...WrappedProps} />
      </div>
    );
  };

  render() {
    const { classes, breakpoints, cols } = this.props;
    return (
      <div className={classes.root}>
        <button onClick={() => this.resetLayout()}>
          <LayersClearIcon />
        </button>

        <ResponsiveReactGridLayout
          breakpoints={breakpoints}
          cols={cols}
          rowHeight={260}
          draggableHandle=".grid-drag-handle"
          {...this.props}
          layouts={this.state.displayedLayouts}
          onBreakpointChange={this.onBreakpointChange}
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)
          }
        >
          {this.state.displayedCards.map((obj, index) =>
            this.createDraggable(obj.i, obj.options)(obj.card, obj.props)
          )}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

ResponsiveLocalStorageLayout.defaultProps = {
  breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
  cols: { lg: 3, md: 3, sm: 1, xs: 1, xxs: 1 },
};

ResponsiveLocalStorageLayout.propTypes = {
  classes: PropTypes.array,
  breakpoints: PropTypes.shape({ lg: PropTypes.number, md: PropTypes.number, sm: PropTypes.number, xs: PropTypes.number, xxs: PropTypes.number }),
  cols: PropTypes.shape({ lg: PropTypes.number, md: PropTypes.number, sm: PropTypes.number, xs: PropTypes.number, xxs: PropTypes.number })
}


export default withStyles(styles)(ResponsiveLocalStorageLayout); //'Higher-order component' method of injecting MaterialUI themeing.
