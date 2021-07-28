import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
    Card,
    Select,
    MenuItem,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    List,
    ListItem,
    ListItemText,
    Button,
    Grid,
    CardHeader,
    CardContent,
    Typography,
} from "@material-ui/core";
import useStyles from "./styles";
import { useTheme } from "@material-ui/core";
import useThemeManager from "../../utils/useThemeManager";
import { ColorPicker } from 'material-ui-color';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const ThemeTile = (props) => {
    const { className, title, value, differenceValue, caption, ...rest } = props;
    const { themes, theme: currentThemeName, setTheme, overrideTheme, clearOverrideTheme } = useThemeManager();
    const theme = useTheme();

    const [primaryColorLight, setPrimaryColorLight] = useState(theme.palette.primary.light);
    const [primaryColorMain, setPrimaryColorMain] = useState(theme.palette.primary.main);
    const [primaryColorDark, setPrimaryColorDark] = useState(theme.palette.primary.dark);
    const [primaryColorContrastText, setPrimaryColorContrastText] = useState(theme.palette.primary.contrastText);

    const [successColorLight, setSuccessColorLight] = useState(theme.palette.success.light);
    const [successColorMain, setSuccessColorMain] = useState(theme.palette.success.main);
    const [successColorDark, setSuccessColorDark] = useState(theme.palette.success.dark);

    const [secondaryColorLight, setsecondaryColorLight] = useState(theme.palette.secondary.light);
    const [secondaryColorMain, setsecondaryColorMain] = useState(theme.palette.secondary.main);
    const [secondaryColorDark, setsecondaryColorDark] = useState(theme.palette.secondary.dark);

    const [infoColorLight, setInfoColorLight] = useState(theme.palette.info.light);
    const [infoColorMain, setInfoColorMain] = useState(theme.palette.info.main);
    const [infoColorDark, setInfoColorDark] = useState(theme.palette.info.dark);

    const [customPrimaryColor, setCustomPrimaryColor] = useState(theme.palette.custom.primary);
    const [customSecondaryColor, setCustomSecondaryColor] = useState(theme.palette.custom.secondary);
    const [customContrastColor, setCustomContrastColor] = useState(theme.palette.custom.contrastText);


    const positiveDifference =
        differenceValue && differenceValue.charAt(0) === "+";
    const classes = useStyles({ positiveDifference, ...props });

    const handleOverrideTheme = (e, v) => {
        overrideTheme("primary.light", primaryColorLight);
        overrideTheme("primary.main", primaryColorMain);
        overrideTheme("primary.dark", primaryColorDark);
        overrideTheme("primary.contrastText", primaryColorContrastText);

        overrideTheme("success.light", successColorLight);
        overrideTheme("success.main", successColorMain);
        overrideTheme("success.dark", successColorDark);

        overrideTheme("info.light", infoColorLight);
        overrideTheme("info.main", infoColorMain);
        overrideTheme("info.dark", infoColorDark);

        overrideTheme("secondary.light", infoColorLight);
        overrideTheme("secondary.main", infoColorMain);
        overrideTheme("secondary.dark", infoColorDark);

        overrideTheme("custom.primary", customPrimaryColor);
        overrideTheme("custom.secondary", customSecondaryColor);
        overrideTheme("custom.contrastText", customContrastColor);
        location.reload();
    }
    const handleClearOverrideTheme = () => {
        clearOverrideTheme();
        location.reload();
    }

    return (
        <Card {...rest} className={clsx(classes.root, className)} style={{ overflow: "auto" }}>
            <CardHeader title={"Override theme"} />
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" onClick={handleOverrideTheme}>Add override </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" onClick={handleClearOverrideTheme} >Clear </Button>
                    </Grid>
                </Grid>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>Primary</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List dense>
                            <ListItem>
                                <ListItemText primary={<ColorPicker onChange={e => setPrimaryColorLight("#" + e.hex)} value={primaryColorLight} />} secondary="Primary color light" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={<ColorPicker onChange={e => setPrimaryColorMain("#" + e.hex)} value={primaryColorMain} />} secondary="Primary color main" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={<ColorPicker onChange={e => setPrimaryColorDark("#" + e.hex)} value={primaryColorDark} />} secondary="Primary color dark" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={<ColorPicker onChange={e => setPrimaryColorContrastText("#" + e.hex)} value={primaryColorContrastText} />} secondary="Custom contrast text" />
                            </ListItem>
                        </List>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>Secondary</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List dense>
                            <ListItem>
                                <ListItemText primary={<ColorPicker onChange={e => setsecondaryColorLight("#" + e.hex)} value={secondaryColorLight} />} secondary="secondary color light" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={<ColorPicker onChange={e => setsecondaryColorMain("#" + e.hex)} value={secondaryColorMain} />} secondary="secondary color main" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={<ColorPicker onChange={e => setsecondaryColorDark("#" + e.hex)} value={secondaryColorDark} />} secondary="secondary color dark" />
                            </ListItem>
                        </List>
                    </AccordionDetails>
                </Accordion>


                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>Success</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List dense>
                            <ListItem>
                                <ListItemText primary={<ColorPicker onChange={e => setSuccessColorLight("#" + e.hex)} value={successColorLight} />} secondary="success color light" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={<ColorPicker onChange={e => setSuccessColorMain("#" + e.hex)} value={successColorMain} />} secondary="success color main" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={<ColorPicker onChange={e => setSuccessColorDark("#" + e.hex)} value={successColorDark} />} secondary="success color dark" />
                            </ListItem>
                        </List>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>Info</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List dense>
                            <ListItem>
                                <ListItemText primary={<ColorPicker onChange={e => setInfoColorLight("#" + e.hex)} value={infoColorLight} />} secondary="info color light" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={<ColorPicker onChange={e => setInfoColorMain("#" + e.hex)} value={infoColorMain} />} secondary="info color main" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={<ColorPicker onChange={e => setInfoColorDark("#" + e.hex)} value={infoColorDark} />} secondary="info color dark" />
                            </ListItem>
                        </List>
                    </AccordionDetails>
                </Accordion>


                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>Custom</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List dense>
                            <ListItem>
                                <ListItemText primary={<ColorPicker onChange={e => setCustomPrimaryColor("#" + e.hex)} value={customPrimaryColor} />} secondary="Custom Primary color" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={<ColorPicker onChange={e => setCustomSecondaryColor("#" + e.hex)} value={customSecondaryColor} />} secondary="Custom secondary color" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={<ColorPicker onChange={e => setCustomContrastColor("#" + e.hex)} value={customContrastColor} />} secondary="Custom contrast text" />
                            </ListItem>
                        </List>
                    </AccordionDetails>
                </Accordion>
            </CardContent>

        </Card>
    );
};

ThemeTile.propTypes = {
    className: PropTypes.string,
};

export default ThemeTile;
