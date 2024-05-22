// src/routes/facultyRoutes.js
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { taskColumns } from '../datatablesource/taskColumns';
import { queryColumns } from '../datatablesource/queryColumns';
import { testColumns } from '../datatablesource/testColumns';

import { taskInputs } from '../formsource/taskInputs';

import NewTask from '../../pages/task/NewTask';
import List from '../../pages/list/List';
import Home from '../../pages/home/Home';
import SingleFaculty from "../../pages/singleFaculty/SingleFaculty";
import EditFaculty from '../../pages/faculty/EditFaculty';
import EditTask from '../../pages/task/EditTask';
import EditTest from '../../pages/test/EditTest';
import NewTest from '../../pages/test/NewTest';
import Events from '../../pages/event/Events';
import ViewStudents from '../../pages/viewStudents/ViewStudents';
import { AuthContext } from '../../context/AuthContext';



const FacultyRoutes = () => {

  const { user } = useContext(AuthContext);

  const RequireFaculty = ({ children }) => {
    if(user) {
      return user.isFaculty ? children : <Navigate to="/home" />;
    }
    else
      return <Navigate to="/home" />;
};

  return (
      <RequireFaculty>
        <Routes>

          {/* dashboard of main */}
          <Route
            path="/faculty"
            element={ <Home type="Main" />}
          />

          {/* profile page for faculty */}
          <Route
            path="/faculties/:id"
            element={<SingleFaculty type="Main" />}
          />

          {/* edit profile page for faculty */}
          <Route
            path="/faculties/:id/edit"
            element={<EditFaculty title="Edit Profile" type="Main" />}
          />


          {/* ROUTES FOR TASKS */}

          {/* list of tasks */}
          <Route
            path="/facTasks"
            element={<List column={taskColumns} name="Task" type="Creator" />}
          />

          <Route
            path="/facTasks/new"
            element={<NewTask title="Add New Task" inputs={taskInputs} />}
          >
          </Route>

          {/* edit page for tasks */}
          <Route
            path="/facTasks/:taskId/edit"
            element={<EditTask title="Update Task" />}
          />

          {/* ROUTES FOR TESTS */}

          {/* list of tests */}
          <Route 
            path="facTests" 
            element={ <List column={testColumns} name="Test" type="Creator" />} 
          />

          {/* edit page for tests */}
          <Route
            path="/facTests/:testId/edit"
            element={<EditTest title="Update Test" />}
          />

          {/* create test page */}
          <Route
            path="/facTests/new"
            element={<NewTest title="Add New Test" />}
          />

          {/* events */}
          <Route
            path="/faculty/events"
            element={ <Events />}
          />

          {/* Students on Faculty Side */}
          <Route
            path="/class/students"
            element={<ViewStudents />}
          />

          {/* query page faculty side*/}
          <Route
            path="/queries"
            element={<List column={queryColumns} type="Faculty" name="Query" />}
          />
        </Routes>
      </RequireFaculty>
  );
};

export default FacultyRoutes;