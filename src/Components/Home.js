import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles';
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Input } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import View from './View';
import UserRegistrationForm from './UserRegistrationForm'
import { BASE_URL } from '../services/Help';

const useStyles = makeStyles({
  userTableContainer: {
    margin: "13px 96px 21px !important",
    width: "89% !important",
    boxShadow: "4px 4px 19px 13px rgba(0,0,0,0.2) !important",
  },

  userSearch: {
    backgroundColor: "darkred !important",
  },
  userBtnContainer: {
    display: "flex",
    margin: "19px 65px",
    "&>div": {
      width: "40%",
      margin: "0px 31px",
    },
    "&>button:nth-child(3)": {
      margin: "0px 0px 0px 28%",
    },
    "&>button:nth-child(4)": {
      margin: "0px 0px 0px 16px",
    }
  },
  addUserBtn: {
    backgroundColor: "darkred !important",
  },
  userCsv: {
    backgroundColor: "darkred !important",
  },
  menuList: {
    "&>div": {
      boxShadow: "-8px 10px 12px -3px rgba(0,0,0,0.2)",
      "&>ul": {
        "&>li": {
          "&>svg": {
            padding: "0px 5px"
          }
        }
      }
    }
  }
})

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


const Home = () => {

  const classes = useStyles()

  const navigate = useNavigate()
  const { id } = useParams("")
  console.log("id is :- ", id)

  const [userSearchName, setuserSearchName] = useState('')
  const [userData, setUserData] = useState([])
  const [selectUserId, setSelectUserId] = useState(null)

  const [userStatusDropDown, setUserStatusDropDown] = useState('')


  const [userIndividualDetails, setUserIndividualDetails] = useState()
  console.log("userIndividualDetails is :- ", userIndividualDetails)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl)

  const fetchUserDetails = async (e) => {

    try {
      // const userResponse = await axios.get("http://localhost:8000/getUserData")
      const userResponse = await axios.get(`${BASE_URL}/getUserData`)
      // console.log("usersDataRes  is :- ", userResponse)
      // setUserData(userResponse.data)
      setUserData(userResponse.data.userData)

    } catch (error) {
      console.log("usersDataRes Error is :- ", error)
    }
  }

  useEffect(() => {
    fetchUserDetails()
  }, [])

  const addUser = () => {
    navigate("/registration")
  }

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
      setUserData(userData.filter((user) => user._id !== id))
      // fetchUserDetails()
    } catch (error) {
      console.log("Error In Delete User is :- ", error)
    }
    // handleClose()
    fetchUserDetails()
    setAnchorEl(null)
  }

  const handleChangeUserDropDown = (e) => {
    setUserStatusDropDown(e.target.value)
  }

  const handleUserSearch = async () => {

    try {
      const userSearch = await axios.get(`${BASE_URL}/search?searchQuery=${userSearchName}`)
      // console.log("userSearch value is :- ", userSearch)
      console.log("userSearch.data.userSearch value is :- ", userSearch.data.userSearch)
      setUserData(userSearch.data.userSearch)

    } catch (error) {
      console.log("User Search Error is :- ", error)
    }
  }


  const exportUser = async () => {

    try {
      const userExportCsv = await axios.get(`${BASE_URL}/userExport`, "")
      console.log("userExportCsv is  :- ", userExportCsv)

      if (userExportCsv.status === 201) {
        window.open(userExportCsv.data.downloadUrl)
      } else {
        alert("Sorry,userExportCsv not Download")
      }
    } catch (error) {
      console.log("Error in ", error)
    }
  }

  return (
    <>
      <Grid>
        <Grid className={classes.userBtnContainer}>
          <TextField
            variant="outlined"
            placeholder='Search'
            value={userSearchName}
            onChange={(e) => setuserSearchName(e.target.value)} />
          <Button
            className={classes.userSearch}
            variant="contained"
            onClick={handleUserSearch}
          >
            Search
          </Button>
          <Button className={classes.addUserBtn} variant="contained" onClick={(e) => addUser(e)}><AddIcon />AddUser</Button>
          <Button className={classes.userCsv} variant="contained" onClick={() => exportUser()}>Export To Csv</Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper} className={classes.userTableContainer}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>FullName</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Gender</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Profile</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData?.map((user, id) => {
              {/* console.log("user is :- ", user) */ }
              {/* console.log("id is :- ", id) */ }
              return (
                <TableRow key={id}>
                  <StyledTableCell scope="row">{id + 1}</StyledTableCell>
                  <StyledTableCell>{user.FirstName + " " + user.LastName}</StyledTableCell>
                  <StyledTableCell>{user.Email}</StyledTableCell>
                  <StyledTableCell>{user.Gender === "male" ? "M" : "F"}</StyledTableCell>
                  <StyledTableCell>{user.Status}</StyledTableCell>
                  {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <Select
                      value={userStatusDropDown}
                      onChange={(e) => handleChangeUserDropDown(e)}
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="InActive">InActive</MenuItem>
                    </Select>
                  </FormControl> */}


                  <StyledTableCell>
                    <Avatar
                      style={{ position: "sticky", left: "50%" }}
                      alt=""
                      src={`${BASE_URL}/uploads/${user.Profile}`}
                      // src={`/uploads/${user.Profile}`}
                      sx={{ width: 56, height: 56 }}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <IconButton
                      id="long-button"
                      aria-controls={open ? "long-menu" : undefined}
                      aria-expanded={open ? 'true' : undefined}
                      aria-haspopup="true"
                      onClick={(e) => handleClick(e, user._id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="long-menu"
                      className={classes.menuList}
                      anchorEl={anchorEl}
                      // open={open}
                      open={Boolean(anchorEl) && selectUserId === user._id}
                      onClose={handleClose}
                    >
                      <NavLink to={`/view/${user._id}`}>
                        <MenuItem key={user._id} ><VisibilityIcon />View</MenuItem>
                      </NavLink>
                      <NavLink to={`/edit/${user._id}`}>
                        <MenuItem key={user._id}><EditIcon />Edit</MenuItem>
                      </NavLink>
                      <NavLink to={'/'}>
                        <MenuItem onClick={() => handleDeleteUser(user._id)}><DeleteIcon />Delete</MenuItem>
                      </NavLink>
                    </Menu>
                  </StyledTableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Home