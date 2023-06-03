import React, { useState, useEffect } from 'react'
import './idx.css';
import Map from './Map';
import HospitalList from '../HospitalList';
import { useNavigate } from 'react-router-dom';



export default function Dashcontent() {
  const [data_state, setstate] = useState({});

  const [data_city, setcity] = useState({});
  const [data_blood, setbloodgroup] = useState({});
  const [data_hospital, sethospital] = useState({});
  const [final_data_hospital, setfinalhospital] = useState({});
  const [donor_list, setdonorlist] = useState({});

  // const [latitude, setLatitude] = useState();
  // const [longitude, setLongitude] = useState();

  const [userData, setUserData] = useState([]);
  const [users, setUsers] = useState([]);
 


  const calldashboardPage = async () => {
    try {
      const res = await fetch('/about', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();  
  
      const latitude=data.location.coordinates[1];
      const longitude=data.location.coordinates[0];

      const response = await fetch(`/nearbyusers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          latitude, longitude
        })
      });
     
       
      const nearby = await response.json();
      console.log("by");
      setUsers(nearby);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }


    } catch (err) {
      console.log(err);
      // history('/login');
    }
  }



  // const getNearbyUsers = async () => {

    
  //   console.log("hello");



  //   const response = await fetch(`/nearbyusers`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       latitude, longitude
  //     })
  //   });
   
     
  //   const data = await response.json();
  //   console.log("by");
  //   setUsers(data);
  // }

  // useEffect(() => {
  //   calldashboardPage();
    
  // }, []);

  // useEffect(()=>{
  //    getNearbyUsers();
  // },[]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
  
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = R * c; // Distance in kilometers
    return distance;
  };
  
  // Function to convert degrees to radians
  const toRadians = degrees => (degrees * Math.PI) / 180;
  
  
 

  const city = ['Bareilly', 'Gorakhpur', 'Jhansi', 'Prayagraj'];
  const Blood_Group = ['AB-', 'AB+', 'A-', 'A+', 'B-', 'B+', 'Oh-', 'Oh+', 'O-', 'O+'];
  const state = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra & Nagar Haveli and Daman & Diu', 'Delhi', 'Jammu and Kashmir', 'Lakshadweep', 'Puducherry', 'Ladakh'];
  const hospital = [];
  const filter_data = [];

  for (var j = 0; j < data_hospital.length; j++) {
    if (data_hospital[j].district === data_city)
      hospital.push(data_hospital[j].hospitals_name);
  }
  // console.log(data_hospital);
  // console.log(data_city);
  for (var j = 0; j < donor_list.length; j++) {
    if (donor_list[j].district === data_city) {
      filter_data.push(donor_list[j].hospitals_name);
    }
  }
  // 
  let a, b;
  const [user, setUser] = useState({ _state: "", _city: "", _Blood_Group: "", _hospital: "" });
  const handleChange = async (e) => {
    e.preventDefault();
    // const { _state, _city, _Blood_Group, _hospital } = user;
    const _state = data_state;
    const _city = data_city;
    const _Blood_Group = data_blood;
    const _hospital = final_data_hospital;


    const res = await fetch("/donor_list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        _state, _city, _Blood_Group, _hospital
      })

    });
    const data = await res.json();

  }

  const loginUser = async (e) => {
    let res = await fetch('/hospital_list', {
      method: "POST",
    });
    const data = await res.json();
    sethospital(data);

  }

  const handleChange3 = (e) => {
    setstate(e.target.value)
    a = e.target.name;
    b = e.target.value;
    setUser({ ...user, [a]: b });
    setcity(null);
  }
  const handleChange4 = (e) => {
    setcity(e.target.value)
    a = e.target.name;
    b = e.target.value;
    setUser({ ...user, [a]: b });
  }


  const handleChange6 = (e) => {
    setbloodgroup(e.target.value)
    a = e.target.name;
    b = e.target.value;
    setUser({ ...user, [a]: b });
  }

  const handleChange5 = (e) => {
    setfinalhospital(e.target.value)
    a = e.target.name;
    b = e.target.value;
    setUser({ ...user, [a]: b });
  }


  var final_city = [];
  if (data_state == 'Uttar Pradesh')
    final_city = city;

  useEffect(() => {
    loginUser();
  },
    [null]);

  // console.log(hospital);

  return (
    <div className="Dashcontent">



      <div className="panel panel-danger">
        <div className="panel-heading">Search Blood Availability</div>
        <div className="panel-body">

          <div className="row">
            <div className="col-md-3">
              <select className="form-control" name='stateCode' id='stateCode' onChange={handleChange3} >
                {state.map(optn => (
                  <option>{optn}</option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <select className="form-control" name='Blood_Group' onChange={handleChange6} >
                {Blood_Group.map(optn => (
                  <option>{optn}</option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <select className="form-control" name='city' onChange={handleChange4} >
                <option>Select City</option>
                {final_city.map(optn => (
                  <option>{optn}</option>
                ))}
              </select>
            </div>


            <div className="col-md-3">

              <select className="form-control" name='hospital' onChange={handleChange5} >
                <option>Hospital Name</option>
                {hospital.map(optn => (
                  <option>{optn}</option>
                ))}
              </select>


            </div>
          </div>


        </div>
      </div>
      <div class="row">
        <div class="col-md-12" align="center">

          {/* <button type="button" id="searchButton" onClick={<HospitalList />}className="btn-btn"><Link style={{textDecoration: 'none', color:'#ffff'} } to='/hospitalList'>search</Link></button> */}
        </div>
      </div>

      {/* <form onSubmit = {handleChange} method="POST">
             <div>
             <select class="selectpicker" name='state' onChange={handleChange3} >
                 {state.map(optn => (
                     <option>{optn}</option>
                 ))}
             </select>
             </div>

             <div>
             <select class="selectpicker" name='city' onChange={handleChange4} >
                 {final_city.map(optn => (
                     <option>{optn}</option>
                 ))}
             </select>
             </div>
             <div>
             <select class="selectpicker" name='Blood_Group' onChange={handleChange6} >
                 {Blood_Group.map(optn => (
                     <option>{optn}</option>
                 ))}
             </select>
             </div>
             <div>
             <select class="selectpicker" name='hospital' onChange={handleChange5} >
                 {hospital.map(optn => (
                     <option>{optn}</option>
                 ))}
             </select>
             </div>
             <center>
                   <button tabindex="4" type="submit">Submit</button></center>
             </form> */}
      <div className='cards'>

        <div className='dash-card'>
          <div className="cardheader">Total Blood request Receive</div>
          <div className="cardbody">25</div>
        </div>

        <div className='dash-card'>
          <div className="cardheader2">Registered Blood Groups</div>
          <div className="cardbody2">8</div>
        </div>

        <div className='dash-card'>
          <div className="cardheader3">Total Quries</div>
          <div className="cardbody3">177</div>

        </div>

      </div>
     
      <table className="nearby">
      <thead>
        <tr>
         
          <th>Name</th>
          <th>Address</th>
          <th>Blood Group</th>
          
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key="Name">
            <td>{user.name}</td>
            <td>{user.address}</td>
            <td>{user.blood_group}</td>
           
          </tr>
        ))}
      </tbody>
    </table>
      <div className="map">
        <Map users={users}/>
      </div>
     

    </div>

  );

}
