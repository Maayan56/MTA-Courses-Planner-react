import { useState, useRef } from 'react';
import CoursesScheduler from "../components/CoursesScheduler.jsx";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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

    const printRef = useRef();
    const generatePDF = () => {
        const input = printRef.current;

        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4',true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX= (pdfWidth - imgWidth * ratio) / 2;
            const imgY= 30;
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth*ratio, imgHeight*ratio);

            pdf.save('your_scheduler.pdf');
        });
    };

    return (
        <div>
            <div ref={printRef} id="content-to-print">
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
            {coursesProps && (<button className='block mx-auto bg-indigo-500 hover:bg-indigo-600 text-white mt-2 font-bold py-2 px-4 rounded-full w-1/6 focus:outline-none focus:shadow-outline'
                    onClick={generatePDF}>
                Download as PDF
            </button>)}
        </div>
    );
};
export default AllSchedulesPage;
