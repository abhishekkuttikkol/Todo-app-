import {List, ListItem, ListItemAvatar, ListItemText, makeStyles, Modal, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import db from './firebase'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function Todo(props) {
    const classes = useStyles()
    const [open,setopen] = useState(false)
    const [input,setInput] = useState('')

    const handleOpen = ()=>{
        setopen(true)
    }
    const handleClose = ()=>{
        setopen(false)
    }

    const updateTodo = ()=>{
        console.log('working')
        db.collection('todos').doc(props.todo.id).set({
            todo : input
        }, {merge : true})
        setopen(false)
    }
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div className={classes.paper}>
                    <h1>Edit Todo</h1>
                    <TextField placeholder={props.todo.todo} value={input} onChange={event=>setInput(event.target.value)} id="standard-basic" label='Edit' />
                    <button onClick={updateTodo}>Update</button>
                </div>
            </Modal>
            <List>
            <ListItem>
                <ListItemAvatar>
                </ListItemAvatar>
                <ListItemText primary={props.todo.todo} secondary="Todo" />
            </ListItem>
                <DeleteForeverIcon onClick={event =>db.collection('todos').doc(props.todo.id).delete()}></DeleteForeverIcon>
                <EditIcon onClick={handleOpen}></EditIcon>
                {/* <Button >DELETE</Button> */}
            </List>
            {/* <li>{props.todo}</li> */}
        </div>
    )
}

export default Todo
