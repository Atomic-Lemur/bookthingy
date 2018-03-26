import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Toc from './Toc';
import Chapter from './Chapter';

const Content = (props) => {
    return (
        <main>
            <Switch>
                <Route exact path='/' component={Toc}/>
                <Route path='/chapter/:cuid' component={Chapter}/>
            </Switch>
        </main>
    );
}

export default Content;
