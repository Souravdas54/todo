import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import React, { useEffect, useState } from 'react';
import {
    Box, Button, TextField, FormControlLabel, Checkbox,
    Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { addtodo, listtodo, updatetodo, deletetodo } from '../Redux/todoSlice'

// YUP FORM VALIDATION //  
const yupformdata = yup.object().shape({
    title: yup.string().required('title is required'),
    description: yup.string().required('description is required'),
    enddate: yup.date().required('end data is required'),
    image: yup.mixed().required('image is required')
})

export default function Todo() {

    const dispatch = useDispatch();

    const { Todostorage, } = useSelector((state) => state.todoKey)

    const { register, handleSubmit, formState: { errors }, reset, } = useForm({ resolver: yupResolver(yupformdata) })

    // Edit data state
    const [editdata, seteditData] = useState(null);

    // get todo from localstorage
    useEffect(() => {
        const saveTodo = JSON.parse(localStorage.getItem('Todostorage')) || [];

        if (saveTodo) {

            dispatch(listtodo(saveTodo));
        }
    }, [dispatch,])

    // set todo from localstorage
    useEffect(() => {

        localStorage.setItem('Todostorage', JSON.stringify(Todostorage));

    }, [Todostorage])



    // submit todo
    const onSubmit = (data) => {
        const newTodoFormData = {
            id: editdata || Date.now(),
            title: data.title,
            description: data.description,
            enddate: data.enddate,
            isCompleted: !!data.isCompleted,
            image: data.image && data.image[0] ? URL.createObjectURL(data.image[0]) :
                (editdata ? Todostorage.find(todo => todo.id === editdata).image : null),
        }
        if (editdata) {

            dispatch(updatetodo(newTodoFormData));
            seteditData(null)
            window.location.reload();

        } else {
            dispatch(addtodo(newTodoFormData));

            reset({
                title: "",
                description: "",
                enddate: "",
                isCompleted: false,
                image: null,
            });

        }

    }

    // Handle edit button click
    const handleEdit = (id) => {
        const todoToEdit = Todostorage.find(todo => todo.id === id);
        if (todoToEdit) {
            reset({
                title: todoToEdit.title,
                description: todoToEdit.description,
                enddate: todoToEdit.enddate,
                isCompleted: todoToEdit.isCompleted,
                image: null
            });
            seteditData(id);
        }
    };
    // delete todo
    const handleDelete = (id) => {
        dispatch(deletetodo(id));
    };

    // Refresh Data from localStorage
    const handlerefresh = () => {
       
        const saveTodo = JSON.parse(localStorage.getItem('Todostorage')) || [];
        dispatch(listtodo(saveTodo));

    };
    return (
        <Box width='100%' height='100vh'>
            <Box
                sx={{
                    p: 3,
                    boxShadow: 3,
                    borderRadius: 2,
                    maxWidth: 600,
                    mx: 'auto',
                    position: 'relative',
                    mt: 2
                }}
            >
                <Typography variant='h4'>TODO LIST</Typography>
                {/* Refresh Button */}
                <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={handlerefresh}
                    sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1, }} > Refresh
                </Button>

                {/* Form Fields */}
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                    <TextField
                        label="Title"
                        type="text"
                        variant="outlined"
                        {...register('title')}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                    />
                    <TextField
                        label="Description"
                        type="text"
                        variant="outlined"
                        multiline
                        rows={2}
                        {...register('description')}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                    />
                    <TextField
                        label="End Date"
                        type="date"
                        variant="outlined"
                        {...register('enddate')}
                        error={!!errors.enddate}
                        helperText={errors.enddate?.message}
                        InputLabelProps={{ shrink: true }}
                    />
                    <FormControlLabel
                        control={<Checkbox {...register('isCompleted')} />}
                        label="Is Completed"
                    />
                    <Button variant="contained" component="label">
                        Upload Image
                        <input type="file" hidden {...register('image')} />
                    </Button>
                    <Button type="submit" variant="contained">
                        {editdata ? 'Update Todo' : 'Add Todo'}
                    </Button>
                </Box>

            </Box>
            <Box sx={{ justifyContent: 'center', alignItems: 'center', mt: 5, ml: 9 }}>


                <TableContainer component={Paper} sx={{ height: 'auto', width: '95%', border: '1px solid black' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>End Data</TableCell>
                                <TableCell>Completed</TableCell>
                                <TableCell>Profile image</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {Todostorage.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>{new Date(item.enddate).toLocaleDateString()}</TableCell>
                                    <TableCell>{item.isCompleted ? "Yes" : "No"}</TableCell>
                                    <TableCell><img src={item.image} alt="Todo"
                                        style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '5px' }}
                                    />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button variant="outlined" color="primary" onClick={() => handleEdit(item.id)} sx={{ marginRight: 1 }}>
                                            Edit
                                        </Button>
                                        <Button variant="outlined" color="secondary" onClick={() => handleDelete(item.id)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};
