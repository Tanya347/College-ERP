import "./updateTable.scss";

// elements of the table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// to fetch data
import useFetch from "../../config/hooks/useFetch.js"
import { useContext } from "react";
import { AuthContext } from "../../config/context/AuthContext.js";
import { getTableURL } from "../../source/endpoints/get.js";

const List = () => {

  // fetch latest/upcoming events
  const {user} = useContext(AuthContext)
  const { data } = useFetch(getTableURL(user));
  // const newData= data.slice(0, 5);

  return (
    <TableContainer component={Paper} className="table" style={{overflowY: "scroll", height: "400px"}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{"backgroundColor": "#EEEEEE"}}>

          {/* Column Names */}
          <TableRow>
            <TableCell className="tableCell" style={{"fontWeight": "bold"}}>Update</TableCell>
            <TableCell className="tableCell" style={{"fontWeight": "bold"}}>Description</TableCell>
          </TableRow>
        </TableHead>


        <TableBody>
          {data?.map((row, index) => (

            // row.id is just a number
            <TableRow key={index}>

              <TableCell className="tableCell">{row.title}</TableCell>
              <TableCell className="tableCell">{row.desc}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;