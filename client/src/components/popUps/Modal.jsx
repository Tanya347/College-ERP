import "./modal.css"

import CancelIcon from '@mui/icons-material/Cancel';
import useFetch from "../../config/service/useFetch"
import { useState } from "react";
import axios from "axios";
import { getModalURL } from "../../config/endpoints/get";
import { putURLs } from "../../config/endpoints/put";
import { formatDate } from "../../config/endpoints/transform";
import { toast } from "react-toastify"

// setOpen prop, id is the id of the data we need to display and type will tell whether it's task or update

const Modal = ({ setOpen, id, type }) => {

    // fetch the required data
    const { data } = useFetch(getModalURL(type, id));

    const [info, setInfo] = useState({});

    // set the usestate to the data user passed 
    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }


    // post the usestate to database
    const handleClick = async (e) => {
        e.preventDefault();
        
        try {
            const res = await axios.put(putURLs("queries", id), info, {
                withCredentials: true
            })
            if(res.data.status === 'success') {
                toast.success("Query updated successfully!");
            }
            setOpen(false)
        }
        catch (err) {
            const errorMessage = err.response?.data?.message || "Failed to create user. Please try again.";
            toast.error(errorMessage);
            console.error(err);
            return err;
        }
    }

    return (
        <div className="modal">
            <div className="mContainer">

                {/* setOpen set to false so that pop up closes */}
                <CancelIcon
                    className="mClose"
                    onClick={() => setOpen(false)}
                />
                
                {/* if type is updates */}
                {
                    type === "updates" &&
                    <div className="mTasks">
                        <div className="mTitle">{data.title}</div>
                        <div className="mDesc">{data.desc}</div>
                        {data.updateType === "specific" && <p><span>For</span>: Class {data?.class?.name}</p>}
                    </div>
                }

                {/* If type is tasks */}
                {
                    (type === "facTasks" || type==="stuTasks" || type === 'tasks') &&
                    <div className="mTasks">
                        <div className="mTitle">{data.title}</div>
                        <div className="mDesc">{data.desc}</div>
                        <p><span>Deadline</span> : {formatDate(data.deadline)}</p>
                        <p><span>Assigned To</span> : {data?.sclass?.name}</p>
                        <p><span>Assigned By</span>: {data?.author?.teachername}</p>
                    </div>
                }

                {/* If type is tasks */}
                {
                    (type === "facTests" || type==="stuTests" || type === 'tests') &&
                    <div className="mTasks">
                        <div className="mTitle">{data?.name}</div>
                        <p><span>Syllabus</span> : {data?.syllabus}</p>
                        <p><span>Duration</span> : {data?.duration} min</p>
                        <p><span>Date</span> : {formatDate(data.date)}</p>
                        <p><span>Assigned To</span> : {data?.sclass?.name}</p>
                        <p><span>Subject</span>: {data?.subject?.name}</p>
                        <p><span>Assigned By</span>: {data?.author?.teachername}</p>
                    </div>
                }

                {/* If type is query */}
                {
                    type === "queries" &&
                    <div className="mTasks">
                        <div className="mTitle">{data.title}</div>
                        <div className="mDesc">{data.description}</div>
                        <textarea
                            name="response"
                            id="response"
                            cols="30"
                            rows="10"
                            value={data.response}
                            onChange={handleChange}
                            placeholder='Respond to the query'>
                        </textarea>
                        <button className="mButton" onClick={handleClick}>
                            Done
                        </button>
                    </div>
                }

                {/* If type is tasks */}
                {
                    type === "courses" &&
                    <div className="mTasks">
                        <div className="mTitle">{data?.subjectCode} {data?.name}</div>
                        {data.syllabusPicture && <img className="syll" src={data.syllabusPicture} alt="syllabus"/>}
                        {data.teacher && <p><span>Taught by</span> : {data?.teacher?.teachername}</p>}
                        <p><span>Class</span> : {data?.class?.name}</p>
                        
                    </div>
                }
                
            </div>
        </div>
    )
}

export default Modal