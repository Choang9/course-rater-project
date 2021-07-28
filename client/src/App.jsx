import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './routes/Home';
import CourseUpdate from './routes/CourseUpdate';
import CourseDetail from './routes/CourseDetail';
import { CoursesContextProvider } from './context/CoursesContext';

const App = () => {
    return (
        <CoursesContextProvider>
            <div>
                <Router>
                    <Switch>
                        <Route exact path = "/" component = {Home}/>
                        <Route exact path = "/courses/:id/update" component = {CourseUpdate}/>
                        <Route exact path = "/courses/:id" component = {CourseDetail}/>
                    </Switch>
                </Router>
            </div>
        </CoursesContextProvider>
    )
};

export default App;