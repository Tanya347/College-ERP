import React from 'react'
import "./viewStudents.scss"
import { useState, useEffect } from 'react';
import { useAuth } from '../../config/context/AuthContext';
import axios from 'axios';
import useFetch from '../../config/service/useFetch';
import Navbar from '../../components/navbar/Navbar';
import StudentClass from '../../components/table/StudentClass'
import { getFacultyData } from '../../config/endpoints/get';


const ViewStudents = () => {
  const { user } = useAuth()
  const classes = useFetch(getFacultyData(user._id, "classes")).data
  const [sclass, setSclass] = useState("");
  const [className, setClassName] = useState("");
  const [stuData, setStuData] = useState({});


  useEffect(() => {
    const fetchStudents = async () => {
      if (sclass) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/classes/details/${sclass}`);
          setStuData(response.data);
        } catch (error) {
          console.error("Error fetching student data:", error);
        }
      }
    };
    fetchStudents();
  }, [sclass])

  const handleClick = (cl) => {
    setSclass(cl._id);
    setClassName(cl.name);
  };

  return (
    <div className='view-students'>

      <Navbar />
      <div className="view-students-container">
        <div className="classes-button">
          {
            classes?.map((cl, index) => (
              <button key={index} onClick={() => handleClick(cl)}>{cl.name}</button>
            ))
          }
        </div>
        {sclass ? 
          (
            <>
              <h1>Students</h1>
              <h1>Class: {className}</h1>
            </>
          ) : (
            <>
              <h1>Please select a class</h1>
            </>
          )
        }
        {sclass && <StudentClass props={stuData.students} />}
      </div>
    </div>
  )
}

export default ViewStudents