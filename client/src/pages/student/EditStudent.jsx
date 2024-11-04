import "../../config/style/form.scss";

import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useFetch from "../../config/service/useFetch";
import Navbar from "../../components/navbar/Navbar";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import { getClasses, getSingleData } from "../../config/endpoints/get";
import { putURLs } from "../../config/endpoints/put";
import { ClipLoader } from "react-spinners";
import { editElementWithPicture } from "../../config/service/usePut";

const EditUser = ({ title, type }) => {

  const location = useLocation();
  let id;
  if (type === "Admin")
    id = location.pathname.split("/")[4];
  else
    id = location.pathname.split("/")[3];
  console.log(id)
 
  const { data } = useFetch(getSingleData(id, "single-student"))
  const classes = useFetch(getClasses).data

  const [info, setInfo] = useState({});
  const [file, setFile] = useState("");
  const [sending, setSending] = useState(false)

  useEffect(() => {
    setInfo(data)
  }, [data])


  const navigate = useNavigate();
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  const handleClick = async (e) => {
    e.preventDefault();
    setSending(true)
    try {
      const res = await editElementWithPicture(file, info, "student", putURLs("students", id));
      if(res.data.status === 'success') {
        navigate(`/admin/students/single/${id}`);
      }
    } catch(err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="new">
      <div className="newContainer">
        {(type === "Admin") ? (<AdminNavbar />) : (<Navbar />)}
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
          <div className="left">
            <img
              src={
                (file)
                  ? URL.createObjectURL(file)
                  : (info?.profilePicture) ? info.profilePicture : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />

            <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
          </div>

            <form>

              {type === "Admin" && <div className="formInput">
                <label>Username</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter username"
                  id="username"
                  value={info.username}
                />
              </div>}

              {type === "Admin" && <div className="formInput">
                <label>Enrollment Number</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter enrollment number"
                  id="enroll"
                  value={info.enroll}
                />
              </div>}

              <div className="formInput">
                <label>Gender</label>
                <select
                  id="gender"
                  onChange={handleChange}
                  value={info.gender}
                >
                  <option value={"Female"}>Female</option>
                  <option value={"Male"}>Male</option>
                </select>
              </div>

              <div className="formInput">
                <label>Name</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter name"
                  id="name"
                  value={info.name}
                />
              </div>

              <div className="formInput">
                <label>Email</label>
                <input
                  onChange={handleChange}
                  type="email"
                  placeholder="Enter email"
                  id="email"
                  value={info.email}
                />
              </div>

              <div className="formInput">
                <label>Phone Number</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter student's phone number"
                  id="studentPhone"
                  value={info.studentPhone}
                />
              </div>

              <div className="formInput">
                <label>Address</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter student's address"
                  id="studentAddress"
                  value={info.studentAddress}
                />
              </div>

              <div className="formInput">
                <label>Date of Birth</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter student's date of birth"
                  id="dob"
                  value={info.dob}
                />
              </div>

              {type==="Admin" && <div className="formInput">
                <label>Class</label>
                <select
                  id="class"
                  onChange={handleChange}
                  value={info.class?.name}
                >
                  {
                    classes?.map((d, index) => (
                      <option value={d._id} key={index}>{d.name}</option>
                    ))
                  }
                </select>
              </div>}

            </form>

            <div className="submitButton">
              {sending && <div className="create-loader">
                <ClipLoader color="black" size={30} />
                updating student data...
              </div>}
              <button className="form-btn" disabled={sending} id="submit" onClick={handleClick}>Edit Student</button>
            </div>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
