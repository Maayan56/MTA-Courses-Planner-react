import {useState } from 'react';
import CoursesDropdownList from "../components/CoursesDropdownList.jsx";


// eslint-disable-next-line react/prop-types
const AddCoursesPref = ({ addPrefSubmit }) => {

    const [selectedCoursesData, setSelectedCoursesData] = useState({
        reqCoursesAlist: [{ course_code_name: "", lesson_code: "", has_exercise: false, exercise_code: "" }],
        reqCoursesBlist: [{ course_code_name: "", lesson_code: "", has_exercise: false, exercise_code: "" }],
        choiceCoursesAlist: [{ course_code_name: "", lesson_code: "", has_exercise: false, exercise_code: "" }],
        choiceCoursesBlist: [{ course_code_name: "", lesson_code: "", has_exercise: false, exercise_code: "" }]
    });

    const handleCourseChange = (dropdown, updatedData) => {
        setSelectedCoursesData(prevState => ({
            ...prevState,
            [dropdown]: updatedData,
        }));
    };
    const submitForm = (e) => {
        e.preventDefault();
        const newJob = {
            selectedCoursesData
        };

        //console.log("the new job:", newJob);
        addPrefSubmit(newJob);

    };

    const queryA = (course) => course.semester === 'א' && course.lesson_or_exercise === 'שיעור';
    const queryB = (course) => course.semester === 'ב' && course.lesson_or_exercise === 'שיעור';


    return (
        <section className='bg-indigo-50'>
            <div className='container m-auto max-w-2xl py-24'>
                <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
                    <form onSubmit={submitForm}>
                        <h2 className='text-3xl text-center font-semibold mb-6'>Add Your Schedules Preferences</h2>
                        <div>
                            <div>
                                <h3 className='text-2xl text-left font-medium mb-4'>סמסטר א</h3>
                                <div>
                                    <label
                                        htmlFor='reqCourseName'
                                        className='block text-gray-700 font-bold mb-2'
                                    >
                                        קורסי חובה רצויים
                                    </label>
                                </div>
                                <div className='mb-4'>
                                    <CoursesDropdownList
                                        coursesTablePath={'src/cs_courses_required.csv'}
                                        query={queryA}
                                        coursesPrefArr={selectedCoursesData.reqCoursesAlist}
                                        onCourseChange={(updatedData) => handleCourseChange("reqCoursesAlist", updatedData)}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor='reqCourseName'
                                        className='block text-gray-700 font-bold mb-2'
                                    >
                                        קורסי בחירה רצויים
                                    </label>
                                </div>
                                <div className='mb-4'>
                                    <CoursesDropdownList
                                        coursesTablePath={'src/cs_courses_choice.csv'}
                                        query={queryA}
                                        coursesPrefArr={selectedCoursesData.choiceCoursesAlist}
                                        onCourseChange={(updatedData) => handleCourseChange("choiceCoursesAlist", updatedData)}
                                    />
                                </div>
                            </div>
                            <div>
                                <h3 className='text-2xl text-left font-medium mb-4'>סמסטר ב</h3>
                                <div>
                                    <label
                                        htmlFor='reqCourseName'
                                        className='block text-gray-700 font-bold mb-2'
                                    >
                                        קורסי חובה רצויים
                                    </label>
                                </div>
                                <div className='mb-4'>
                                    <CoursesDropdownList
                                        coursesTablePath={'src/cs_courses_required.csv'}
                                        query={queryB}
                                        coursesPrefArr={selectedCoursesData.reqCoursesBlist}
                                        onCourseChange={(updatedData) => handleCourseChange("reqCoursesBlist", updatedData)}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor='reqCourseName'
                                        className='block text-gray-700 font-bold mb-2'
                                    >
                                        קורסי בחירה רצויים
                                    </label>
                                </div>
                                <div className='mb-4'>
                                    <CoursesDropdownList
                                        coursesTablePath={'src/cs_courses_choice.csv'}
                                        query={queryB}
                                        coursesPrefArr={selectedCoursesData.choiceCoursesBlist}
                                        onCourseChange={(updatedData) => handleCourseChange("choiceCoursesBlist", updatedData)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                                type='submit'
                            >
                                בנה מערכת
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};
export default AddCoursesPref;