import React from 'react';
import { Box} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
const TodayDate = () => {
  //const [currentDate, setCurrentDate] = useState('');

//  useEffect(() => {
//    const today = dayjs().format('MMM D, YYYY'); // Format: September 14, 2024
//    setCurrentDate(today);
//  }, []);

  return (
    <Box sx={{bgcolor:'#FFB167', borderRadius:'5px'}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar />
    </LocalizationProvider>
    </Box>
  );
};

export default TodayDate;
