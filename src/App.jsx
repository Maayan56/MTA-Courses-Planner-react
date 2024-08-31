import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import AddCoursesPref from './pages/AddCoursesPref';
import AllSchedulesPage from "./pages/AllSchedulesPage.jsx";



const App = () => {

    const addPref = async (newPref) => {
        console.log('addPref function called');
        console.log('Sending preference:', newPref);
        try {
            const response = await fetch('https://mta-courses-planner.df.r.appspot.com/preferences-form/upload-preferences-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPref),
            });

            console.log('Response:', response);

            if (!response.ok) {
                console.error('HTTP error! Status: ' + response.status);

            }

            const data = await response.json();
            console.log('Success:', data);
        } catch (error) {
            console.error('Failed to fetch:', error);
        }
    }

    /*const addPref = async (newPref) => {
        console.log(newPref);
        const res = await fetch('/api/jobs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPref),
        });
        return;
    };*/

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path='/add-pref' element={<AddCoursesPref addPrefSubmit={addPref} />} />
                <Route path='/show-schedules' element={<AllSchedulesPage />} />
            </Route>
        )
    )

    return <RouterProvider router={router} />;
};
export default App
