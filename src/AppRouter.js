import React, { Suspense } from 'react'
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import { Header } from './components'

const NoteListPage = React.lazy(() => import("./pages/NoteListPage"))
const NoteItemPage = React.lazy(() => import("./pages/NoteItemPage"))
const Error404 = React.lazy(() => import("./pages/Error404"))

const AppRouter = () => {
    return (
        <Suspense fallback={<h3>Loading....</h3>}>
            <Router>
                <div className="container">
                    <div className="app">
                <Header />
                <Switch>
                    <Route path="/" exact component={NoteListPage} />
                    <Route path="/note/:id" component={NoteItemPage} />
                    <Route path="*" component={Error404} />
                </Switch>
                </div>
                </div>
            </Router>
        </Suspense>
        
    )
}

export default AppRouter
