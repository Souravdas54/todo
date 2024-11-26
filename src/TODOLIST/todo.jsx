// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from "yup";
// import React, { useEffect } from 'react';
// import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
// import { useForm } from 'react-hook-form';
// import { useDispatch, useSelector } from 'react-redux';
// import { addtodo, edittodo, deletetodo } from '../Redux/todoSlice';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
// import { initializeTodos } from '../Redux/todoSlice';

// // Validation schema using yup
// const fromvalidation = yup.object().shape({
//   title: yup.string().required('Title is required'),
//   description: yup.string().required('Description is required'),
//   // endDate: yup.date().required('End date is required').min(new Date(), 'End date cannot be in the past'),
//   endDate: yup.date().required('End date is required').min(new Date(), 'End date cannot be in the past'),
//   image: yup.mixed().required('Image is required'),
// });

// export default function Todo() {
//   const dispatch = useDispatch();
//   const todos = useSelector((state) => state.todoKey.todos);

//   // React Hook Form setup with validation schema
//   const { register, handleSubmit, formState: { errors }, reset } = useForm({
//     resolver: yupResolver(fromvalidation),
//   });
//   useEffect(() => {
//     dispatch(initializeTodos());
//   }, [])
//   useEffect(() => {

//     const storedTodos = localStorage.getItem('todos');
//     if (storedTodos) {
//       dispatch(addtodo(JSON.parse(storedTodos)));
//     }
//   }, [dispatch]);

//   // Submit handler for form data
//   const onSubmit = (data) => {
//     if (!data.title || !data.description || !data.endDate || !data.image[0]) {
//       console.error('Form submission blocked: Incomplete data');
//       return;
//     }


//     const fromData = {
//       id: Date.now(),
//       title: data.title,
//       description: data.description,
//       endDate: data.endDate,
//       isCompleted: false,
//       image: data.image[0] ? data.image[0].name : '',
//     };

//     // Dispatch action to add todo
//     dispatch(addtodo(fromData));
//     reset();
//   };

//   // Delete todo handler
//   const handleDelete = (id) => {
//     dispatch(deletetodo(id));
//   };

//   // Edit todo handler (toggle completion status)
//   const handleEdit = (todo) => {
//     const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
//     dispatch(edittodo(updatedTodo));
//   };

//   // AG Grid column definitions
//   const columns = [
//     { headerName: 'Title', field: 'title', sortable: true, filter: true },
//     { headerName: 'Description', field: 'description' },
//     { headerName: 'End Date', field: 'endDate' },
//     {
//       headerName: 'Complete',
//       field: 'isCompleted',
//       sortable: true,
//       filter: true,
//       cellRendererFramework: (params) => (
//         <Button onClick={() => handleEdit(params.data)}>
//           {params.value ? 'Yes' : 'No'}
//         </Button>
//       ),
//     },
//     {
//       headerName: 'Actions',
//       field: 'actions',
//       cellRendererFramework: (params) => (
//         <Button variant="contained" color="error" onClick={() => handleDelete(params.data.id)}>
//           Delete
//         </Button>
//       ),
//     },
//   ];



//   return (
//     <Box sx={{ width: '100%', height: 'auto' }}>
//       <Box sx={{
//         maxWidth: 600, margin: "50px auto", padding: 3, border: "1px solid #ddd", borderRadius: 2,
//         boxShadow: 3, backgroundColor: "#f9f9f9", height: 'auto'
//       }}>
//         <Typography variant='h4'>TODO LIST</Typography>

//         <Box component='form' onSubmit={handleSubmit(onSubmit)}>
//           <TextField
//             fullWidth
//             label="Title"
//             margin="normal"
//             error={!!errors.title}
//             helperText={errors.title?.message}
//             {...register('title')}
//           />
//           <TextField
//             fullWidth
//             label="Description"
//             margin="normal"
//             multiline
//             rows={2}
//             error={!!errors.description}
//             helperText={errors.description?.message}
//             {...register('description')}
//           />
//           <Typography sx={{ textAlign: 'justify', mt: 2, ml: 1 }}>End Date</Typography>
//           <TextField
//             fullWidth
//             type="date"
//             margin="normal"
//             error={!!errors.endDate}
//             helperText={errors.endDate?.message}
//             {...register('endDate')}

//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             type="file"
//             {...register('image')}
//           />
//           <FormControlLabel
//             control={<Checkbox {...register('isCompleted')} />}
//             label="Is Complete"
//           />
//           <Button variant="contained" color="primary" fullWidth type="submit" sx={{ mt: 2 }}>
//             Add Todo
//           </Button>
//         </Box>
//       </Box>

//       <Box className="ag-theme-alpine" sx={{ height: 400, width: '100%', marginTop: 4, p: 2 }}>
//         <AgGridReact rowData={todos} columnDefs={columns} pagination={true} />
//       </Box>
//     </Box>
//   );
// }

