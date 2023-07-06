import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import { Input } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from '../services/Help';

const useStyles = makeStyles({
  mainPaper: {
    height: "623px",
    margin: "18px 41px",
    display: "flex",
    padding: "10px 16px",
    "&>div": {
      "&>div": {
        display: "flex"
      }
    }
  },
  userField: {
    display: "grid",
    margin: "9px 31px",
    "&>label": {
      cursor: "pointer",
      fontWeight: "500",
    },
    "&>div": {
      "&>div": {
        margin: "12px 0px !important",
        width: "30rem",
      }
    },
  },
  userGenderLabel: {
    fontWeight: "500 !important",
    color: "black !important",
  },
  userGenderControl: {
    width: "25%"
  },
  userProfilePicture: {
    width: "45%",
    height: "37px",
    margin: "24px 26px",
    "&:before": {
      borderBottom: "1px solid  white !important",
    },
    "&:after": {
      borderBottom: "1px solid  white !important",
    }
  },
  userSubmitBtn: {
    height: "43px",
    width: "1028px",
    position: "absolute !important",
    left: "83px",
    backgroundColor: "rgb(201, 18, 18) !important",
  }
})

const UserRegistrationForm = ({ fetchUserDeta }) => {

  const classes = useStyles()

  const navigate = useNavigate()

  const [userProfileImg, setUserProfileImg] = useState()

  const [userData, setUserData] = useState([])
  const [userForm, setUserForm] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Mobile: "",
    Gender: "",
    Status: "",
    Profile: null,
    Location: ""
  })

  console.log("userData is :- ", userData)
  console.log("userForm is :- ", userForm)

  const [userProfile, setUserProfile] = useState('')


  const handlUserDetails = (e) => {
    console.log("e.target.value is :- ", e.target.value)
    setUserForm({ ...userForm, [e.target.name]: e.target.value })

    if (e.target.files) {
      console.log("e.target.files is :- ", e.target.files)

      // setUserProfile(e.target.files[0])

      const file = e.target.files[0];

      // setUserForm({ ...userForm, [e.target.name]: e.target.files[0] })
      setUserForm({ ...userForm, Profile: e.target.files[0] })
      setUserProfileImg(URL.createObjectURL(file))
    }
  }

  const handlSubmitUserDetails = async (e) => {
    e.preventDefault()

    try {

      const formData = new FormData()
      formData.append('FirstName', userForm.FirstName);
      formData.append('LastName', userForm.LastName);
      formData.append('Email', userForm.Email);
      formData.append('Mobile', userForm.Mobile);
      formData.append('Gender', userForm.Gender);
      formData.append('Status', userForm.Status);
      formData.append('Profile', userForm.Profile);
      formData.append('Location', userForm.Location);

      const config = {
        headers: {
          // "Accept": "application/json, text/plain, */*",
          "Content-Type": "multipart/form-data"
        }
      }

      const res = await axios.post(`${BASE_URL}/registration`, formData, config)

      console.log("res is :- ", res)
      if (res.status === 201) {
        // setUserData([...userData, res.data])
        console.log("res.data is :- ", res.data)
        setUserForm({
          FirstName: "",
          LastName: "",
          Email: "",
          Mobile: "",
          Gender: "",
          Status: "",
          Profile: null,
          Location: ""
        })
        setUserProfileImg()
        document.getElementById("profile").value = ""
        navigate("/")
        alert("New User Add successFully")
      } else {
        alert("please, add user try again")
      }

      if (res.status === 404 || !res) {
        alert("please enter proper userdata")
        console.log("error")
      }

    } catch (error) {
      console.log("error is :- ", error)
      console.log("error.message is :- ", error.message)
    }
  }

  return (
    <Paper className={classes.mainPaper}>
      <Grid>
        {
          userProfileImg ?
            (<Avatar
              style={{ position: "sticky", left: "50%" }}
              alt=""
              src={userProfileImg}
              sx={{ width: 56, height: 56 }}
            />)
            :
            (<Avatar
              style={{ position: "sticky", left: "50%" }}
              alt=""
              sx={{ width: 56, height: 56 }}
            />)
        }
        <Grid>
          <Grid className={classes.userField}>
            <label>First name</label>
            <TextField
              name='FirstName'
              variant="outlined"
              placeholder='Enter FirstName'
              value={userForm.FirstName}
              onChange={(e) => handlUserDetails(e)} />
          </Grid>
          <Grid className={classes.userField}>
            <label>Last name</label>
            <TextField
              variant="outlined"
              name='LastName'
              placeholder='Enter LastName'
              value={userForm.LastName}
              onChange={(e) => handlUserDetails(e)} />
          </Grid>
        </Grid>
        <Grid>
          <Grid className={classes.userField}>
            <label>Email</label>
            <TextField
              variant="outlined"
              name='Email'
              placeholder='Enter Email Address'
              value={userForm.Email}
              onChange={(e) => handlUserDetails(e)} />
          </Grid>
          <Grid className={classes.userField}>
            <label>Mobile</label>
            <TextField
              variant="outlined"
              name='Mobile'
              placeholder='Enter Mobile Number'
              value={userForm.Mobile}
              onChange={(e) => handlUserDetails(e)} />
          </Grid>
        </Grid>

        <Grid>
          <Grid className={classes.userField}>
            <FormControl>
              <FormLabel className={classes.userGenderLabel}>Select Your Gender</FormLabel>
              <RadioGroup
                label="gender"
                value={userForm.Gender}
                onChange={(e) => handlUserDetails(e)}
                name='Gender'
              >
                <FormControlLabel className={classes.userGenderControl} value="female" control={<Radio />} label="Female" />
                <FormControlLabel className={classes.userGenderControl} value="male" control={<Radio />} label="Male" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid className={classes.userField}>
            <label>Select Your Status</label>

            <FormControl fullWidth placeholder="Select...">
              <Select
                value={userForm.Status}
                name="Status"
                placeholder="Select..."
                onChange={(e) => handlUserDetails(e)}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="InActive">InActive</MenuItem>
              </Select>
            </FormControl>

          </Grid>
        </Grid>
        <Grid>
          <Input
            id='profile'
            className={classes.userProfilePicture}
            name='Profile'
            accept="image/*"
            type='file'
            onChange={(e) => handlUserDetails(e)}
          />
          <Grid className={classes.userField}>
            <label>Enter Your Location</label>
            <TextField
              variant="outlined"
              name='Location'
              placeholder='Enter Your Location'
              value={userForm.Location}
              onChange={(e) => handlUserDetails(e)} />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          className={classes.userSubmitBtn}
          onClick={(e) => handlSubmitUserDetails(e)}
        >
          Submit
        </Button>
      </Grid>
    </Paper>
  )
}

export default UserRegistrationForm