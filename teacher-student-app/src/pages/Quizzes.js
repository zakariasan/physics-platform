import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText } from '@mui/material';

function Courses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/courses')
            .then(response => setCourses(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <List>
            {courses.map(course => (
                <ListItem key={course.id}>
                    <ListItemText primary={course.title} secondary={course.description} />
                </ListItem>
            ))}
      Helllo M from QUIZZZZZZZZZZZZZZZZ
        </List>
    );
}

export default Courses;
