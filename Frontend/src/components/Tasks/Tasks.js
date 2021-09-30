import React, { useState, useEffect } from "react"; 
import { makeStyles } from "@material-ui/core/styles";
import { Tooltip, IconButton, Table, TableRow, TableBody, TableCell, TextField } from "@material-ui/core";
import SaveTwoToneIcon from '@material-ui/icons/SaveTwoTone';
import { Close, Edit } from '@material-ui/icons';
import { FcPlus } from "react-icons/fc";
import styles from "./tasksStyle.js";
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux'
import { actions } from '../../redux/actions'
import * as taskAPI from './../../api/task'
function mapStateToProps(state) {
  return {
    client: state.clientReducer.client,
    employee: state.employeeReducer.employee
  };
}

const mapDispatchToProps = (dispatch) => ({

  setFirstName: (employee_name) => dispatch(actions.setFirstName(employee_name)),
  setLastName: (employee_last_name) => dispatch(actions.setLastName(employee_last_name)),
  setEmail: (employee_email) => dispatch(actions.setEmail(employee_email)),
  setPhone: (employee_phone) => dispatch(actions.setPhone(employee_phone))

})

export default connect(mapStateToProps, mapDispatchToProps)(function Tasks(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [taskToEdit, setTaskToEdit] = useState();
  const [contentTaskToUpdate, setContentTaskToUpdate] = useState();
  const [newTask, setNewTask] = useState({ content: '', employee_id: 0 });//!!!!!!!!!!!!!!
  const [tasks, setTasks] = useState([]);
  const [showAddTaskRow, setShowAddTaskRow] = useState(false);

  useEffect(() => {
    getAllTasks();
  }, []);

  useEffect(() => { }, [tasks]);


  const getAllTasks = async () => {
    const response = await taskAPI.getAllTasks();
    if (response != null) {
      var arr = [];
      Object.values(response).map(task => arr.push({ 'content': task.content, 'id': task._id }))
      setTasks(arr);
    }
    else {
      console.log("error in getAllTasks")
    }

  }
  const updateTask = async () => {
    const response = await taskAPI.updateTask(taskToEdit, { content: contentTaskToUpdate });
    if (response != null) {
      setTaskToEdit(-1);
      setContentTaskToUpdate('');
      getAllTasks();
    } else {
      console.log("error in updateTask")
    }
  }
  const addTask = async () => {
    const response = await taskAPI.addTask(newTask);
    if (response != null) {
      getAllTasks();
      setNewTask({ content: '', employee_id: 0 });
      setShowAddTaskRow(false);
    } else {
      console.log("error in addTask ")
    }
  }
  const removeTask = async (taskId) => {
    const response = await taskAPI.removeTask(taskId);
    if (response != null) {
      getAllTasks();
    }
    else {
      console.log("error in removeTask ")
    }

  }

  return (
    <Table className={classes.table}>
      <TableBody >

        <Button variant="outline-info" className="mt-2 mb-2" onClick={() => { setShowAddTaskRow(true) }}>
          <FcPlus className=" mb-1 mr-2" /> Add new Task
        </Button>
        {showAddTaskRow === true ?
          <TableRow key="addTaskRow" className={classes.tableRow}>
            <TableCell style={{ width: '90%' }} >
              < TextField style={{ width: '90%' }} onChange={(e) => setNewTask({ ...newTask, content: e.target.value })}  ></TextField>
            </TableCell>
            <TableCell className={classes.tableActions}>
              <Tooltip
                id="tooltip-top"
                title="Save Task"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
                onClick={() => addTask()}
              >
                <SaveTwoToneIcon />
              </Tooltip>

            </TableCell>
          </TableRow>
          : ''
        }
        {tasks.map(task => (
          <TableRow key={task.id} className={classes.tableRow}>

            <TableCell style={{ width: '90%' }} >
              {(taskToEdit === task.id) ?
                < TextField style={{ width: '90%' }} onChange={(e) => setContentTaskToUpdate(e.target.value)} defaultValue={task.content}></TextField>
                : task.content}

            </TableCell>
            <TableCell className={classes.tableActions}>
              {(taskToEdit === task.id) ?
                <Tooltip
                  id="tooltip-top"
                  title="Save Task"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                  onClick={() => updateTask(task.id)}
                >
                  <SaveTwoToneIcon />
                </Tooltip>
                :
                <>
                  <Tooltip
                    id="tooltip-top"
                    title="Edit Task"
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                    onClick={() => setTaskToEdit(task.id)}
                  >
                    <IconButton
                      aria-label="Edit"
                      className={classes.tableActionButton}
                    >
                      <Edit
                        className={
                          classes.tableActionButtonIcon + " " + classes.edit
                        }
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    id="tooltip-top-start"
                    title="Remove"
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                    onClick={() => removeTask(task.id)}
                  >
                    <IconButton
                      aria-label="Close"
                      className={classes.tableActionButton}
                    >
                      <Close
                        className={
                          classes.tableActionButtonIcon + " " + classes.close
                        }
                      />
                    </IconButton>
                  </Tooltip>
                </>}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );



});