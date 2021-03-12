import React from "react";
import { Link } from "next/link";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Avatar, Typography } from "@material-ui/core";
import useStyles from "./styles";

const Profile = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const user = {
    name: "Simos",
    avatar: "/images/simos.jpeg",
    bio: "Lead Developer",
    link: "http://wootwoot.com",
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Link href={user.link}>
        <Avatar
          alt="Person"
          className={classes.avatar}
          src={user.avatar}
          to="/"
        />
        <Typography className={classes.name} variant="h4">
          {user.name}
        </Typography>
        <Typography variant="body2">{user.bio}</Typography>
      </Link>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
