import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, FormControlLabel, Checkbox, Typography, } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { addtodo, listtodo, deletetodo } from '../Redux/todoSlice'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// YUP FORM VALIDATION //
const yupformdata = yup.object().shape({
    title: yup.string().required('title is required'),
    description: yup.string().required('description is required'),
    enddate: yup.date().required('end data is required'),
    image: yup.mixed().required('image is required')
})


export default function Todolists() {

    const dispatch = useDispatch();

    const { Todostorage, } = useSelector((state) => state.todoKey)

    const { register, handleSubmit, formState: { errors }, reset, } = useForm({ resolver: yupResolver(yupformdata) })

    // Edit data state
    const [editdata, seteditData] = useState(null);

    // get todo from localstorage
    useEffect(() => {
        const saveTodo = JSON.parse(localStorage.getItem('tododata')) || [];
        // dispatch(listtodo(saveTodo));

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
            //update state
            dispatch(addtodo(newTodoFormData));
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
    const handleRefresh = () => {

        const savedTodos = JSON.parse(localStorage.getItem('tododata')) || [];
            dispatch(listtodo(savedTodos));

       
    };

    const columnDefs = [
        { headerName: 'Title', field: 'title', sortable: true, filter: true },
        { headerName: 'Description', field: 'description' },
        { headerName: 'End Date', field: 'enddate' },
        {
            headerName: 'Complete', field: 'isCompleted', sortable: true, filter: true,
            cellRendererFramework: (params) => (
                <Button onClick={() => handleEdit(params.data)}>
                    {params.value ? 'Yes' : 'No'}
                </Button>
            ),
        },
        {
            headerName: 'Image',
            field: 'image',
            cellRenderer: (params) => (
                <img
                    src={params.value}
                    alt="Item"
                    style={{ width: 50, height: 50, borderRadius: 1 }}
                />
            ),
        },
        {
            headerName: 'Actions',
            field: 'actions',
            cellRendererFramework: (params) => (
                <Box display="flex" gap={1}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleEdit(params.data.id)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(params.data.id)}
                    >
                        Delete
                    </Button>
                </Box>
            ),
        },
    ];

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
                    onClick={handleRefresh}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        zIndex: 1,
                    }}
                >
                    Refresh
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
            <Box className="ag-theme-alpine" sx={{ height: 400, width: '100%', marginTop: 4, p: 2 }}>
                <AgGridReact rowData={Todostorage} columnDefs={columnDefs} pagination={true} />
            </Box>

            

        </Box>
    );
};
