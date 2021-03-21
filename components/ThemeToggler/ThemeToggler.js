import React, { useState } from "react";
import PropTypes from "prop-types";
import TuneOutlinedIcon from "@material-ui/icons/TuneOutlined";
import VisibilityIcon from '@material-ui/icons/Visibility';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PaletteIcon from "@material-ui/icons/Palette";
import ThemeContext from "../../theme/ThemeContext";
import { Tooltip, Badge, Toolbar, IconButton, AppBar } from "@material-ui/core";
import { themePalette } from "../../theme/palette";
import { saveToLS } from "../LocalStorage/LocalStorage"

//Load selection
const themes = Object.keys(themePalette);

export default function ThemeToggler({ className }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { theme, setTheme } = React.useContext(ThemeContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onChangeTheme = (theme) => {
    setTheme(theme);
    console.log("Set theme to");
    console.log(theme);
    saveToLS("theme", theme );
    setAnchorEl(null);
  };

  return (
    <div className={className}>
      <IconButton title="Change Theme"
          aria-label="theme-palette"
          aria-controls="theme-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
        <TuneOutlinedIcon />
      </IconButton>
      <Menu
        id="theme-toggler"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => onChangeTheme(theme)}
      >
        {themes.map((option) => (
          <MenuItem
            key={option}
            selected={option === theme}
            onClick={() => onChangeTheme(option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

ThemeToggler.propTypes = {
  className: PropTypes.string,
};
