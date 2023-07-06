import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Grid } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NavLink, useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { BASE_URL } from '../services/Help';

const useStyles = makeStyles({
  userMainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    "&>div": {
      width: "50%",
      maxWidth: "none",
      "&>div": {
        "&>div:nth-child(2)": {
          "&>span:nth-child(1)": {
            fontWeight: "bold",
          }
        }
      }
    }
  },
  userViewData: {
    display: "flex",
    justifyContent: "space-between",
  },
  userViewHeader: {
    fontWeight: "bold",
    marginBottom: "2px",
  }
})

const View = () => {

  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl)
  const [selectUserId, setSelectUserId] = useState(null)

  const [userIndividualDetails, setUserIndividualDetails] = useState()

  const { id } = useParams("")

  const IndividualUser = async () => {

    try {
      const getIndividaulUser = await axios.get(`${BASE_URL}/getIndividualUser/${id}`)
      console.log("getIndividualUser is :- ", getIndividaulUser)
      setUserIndividualDetails(getIndividaulUser.data.IndividualUser)

    } catch (error) {
      console.log("Error in Individual user :- ", error)
    }
  }

  useEffect(() => {
    IndividualUser()
  }, [])

  const handleClick = (e, id) => {
    console.log("user id :- ", id)
    setSelectUserId(id)
    setAnchorEl(e.currentTarget)
    // setAnchorEl((prevAnchorEl) => ({
    //   ...prevAnchorEl,
    //   [id]: e.currentTarget
    // }))
  }

  const handleClose = () => {
    setAnchorEl(null)
    setSelectUserId(null)
  }

  const handleDeleteUser = async (id) => {
    console.log("user._id is :- ", id)

    try {
      const deleteUser = await axios.delete(`${BASE_URL}/deleteUser/${id}`)
      console.log("Delete user is :- ", deleteUser)
    } catch (error) {
      console.log("Error In Delete User is :- ", error)
    }
    // handleClose()
    setAnchorEl(null)
  }

  return (
    <Grid className={classes.userMainContainer}>
      {userIndividualDetails ?
        (<Card sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "red" }} aria-label="recipe" src={`${BASE_URL}/uploads/${userIndividualDetails.Profile}`}>
                {userIndividualDetails.FirstName.charAt(0).toUpperCase()}
              </Avatar>
            }
            action={
              <IconButton
                aria-label="settings"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={(e) => handleClick(e, userIndividualDetails._id)}
              >
                <MoreVertIcon />
              </IconButton>
            }
            title={userIndividualDetails.FirstName}
            subheader={userIndividualDetails.Status}
          />
          <Menu
            id="long-menu"
            className={classes.menuList}
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && selectUserId === userIndividualDetails._id}
            onClose={handleClose}
          >
            <NavLink to={`/edit/${userIndividualDetails._id}`}>
              <MenuItem key={userIndividualDetails._id}><EditIcon />Edit</MenuItem>
            </NavLink>
            <NavLink to={'/'}>
              <MenuItem onClick={() => handleDeleteUser(userIndividualDetails._id)}><DeleteIcon />Delete</MenuItem>
            </NavLink>
          </Menu>
          <CardMedia
            component="img"
            height="194"
            image={`${BASE_URL}/uploads/${userIndividualDetails.Profile}`}
            alt=""
          />
          <CardContent className={classes.userViewData}>
            <Grid>
              <Grid className={classes.userViewHeader}>
                Gender
              </Grid>
              <Grid>
                {userIndividualDetails.Gender}
              </Grid>
            </Grid>
            <Grid>
              <Grid className={classes.userViewHeader}>
                Location
              </Grid>
              <Grid>
                {userIndividualDetails.Location}
              </Grid>
            </Grid>
          </CardContent>
          <CardActions disableSpacing>
          </CardActions>
        </Card>
        )
        : (<>
          <p>Loading.....</p>
        </>)}
    </Grid>
  )
}

export default View