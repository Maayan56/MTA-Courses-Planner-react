import { useState } from 'react';
import CoursesScheduler from "../components/CoursesScheduler.jsx";
const AllSchedulesPage = () => {
    const [selectedSemester, setSelectedSemester] = useState('');

    const handleChange = (event) => {
        setSelectedSemester(event.target.value);
    };

    const getCoursesProps = () => {
        switch (selectedSemester) {
            case 'B':
                return {
                    reqCoursesArrayName: 'reqCoursesBlist',
                    choiceCoursesArrayName: 'choiceCoursesBlist'
                };
            case 'A':
                return {
                    reqCoursesArrayName: 'reqCoursesAlist',
                    choiceCoursesArrayName: 'choiceCoursesAlist'
                };
            default:
                return null;
        }
    };

    const coursesProps = getCoursesProps();

    return (
        <div>
            <select className='border rounded w-1/8 py-2 px-3 mb-2' value={selectedSemester} onChange={handleChange}>
                <option value="">Select a semester</option>
                <option value="A">Semester A</option>
                <option value="B">Semester B</option>
            </select>

            {coursesProps && (
                <CoursesScheduler
                    reqCoursesArrayName={coursesProps.reqCoursesArrayName}
                    choiceCoursesArrayName={coursesProps.choiceCoursesArrayName}
                />
            )}
        </div>
    );
};
export default AllSchedulesPage;
