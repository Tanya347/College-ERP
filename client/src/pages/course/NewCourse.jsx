import "../../config/style/form.scss";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../config/service/useFetch";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import { getClasses } from "../../config/endpoints/get";
import { postURLs } from "../../config/endpoints/post";
import { createElementWithPicture } from "../../config/service/usePost";
import { ClipLoader } from "react-spinners";

const NewCourse = ({ inputs, title }) => {

  const [info, setInfo] = useState({});
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const classes = useFetch(getClasses).data
  classes.sort((a, b) => a.classNumber - b.classNumber)

  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  const handleClick = async (e) => {
    const button = document.getElementsByClassName("form-btn")
    button.disabled = "true"
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createElementWithPicture(file, info, "course", postURLs("courses", "normal"));
      if(res.data.status === 'success') {
        navigate('/admin/courses');
      }
    } catch(err) {
      console.log(err)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="new">

      <div className="newContainer">
        <AdminNavbar />
        
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
                : (info.profilePicture) ? info.profilePicture : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
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
              {inputs?.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}

            <div className="formInput">
                <label>Choose Class</label>
                <select id="class" onChange={handleChange}>
                    <option value={"-"}> </option>
                    {
                        classes?.map((c, index) => (
                        <option value={c._id} key={index}>
                          {c.name}
                        </option>
                        ))
                    }
                </select>
            </div>  

            </form>
            <div className="submitButton">
              {loading && <div className="create-loader">
                <ClipLoader color="black" size={30} />
                creating course...
              </div>}
              <button onClick={handleClick} className="form-btn">Create Course</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCourse;
