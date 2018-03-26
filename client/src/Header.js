import React from 'react';
import { Link, Switch, Route } from 'react-router-dom'


const Header = () => {
    return (
        <header>
            <Switch>
                <Route exact path='/' render= {() =>
                    <nav>
                        <Link key="nav1" to="" id="add_chapter" className="nav_controls"><i className="fas fa-plus"></i></Link>
                        <Link key="nav2" to="" id="share" className="nav_controls"><i className="fas fa-share-square"></i></Link>
                        <Link key="nav3" to="" id="download" className="nav_controls"><i className="fas fa-download"></i></Link>
                        <Link key="nav4" to="" id="settings" className="nav_controls"><i className="fas fa-cog"></i></Link>
                    </nav>
                } />

                <Route path='/chapter/:cuid' render= {() =>
                    <nav>
                        <Link key="nav5" to="/" id="toc" className="nav_controls" href="/"><i className="fas fa-book"></i></Link>
                        <a key="nav6" id="edit" className="nav_controls"><i className="fas fa-edit"></i></a>
                        <Link key="nav7" to="" id="download" className="nav_controls"><i className="fas fa-download"></i></Link>
                        <Link key="nav8" to="" id="share" className="nav_controls"><i className="fas fa-share-square"></i></Link>
                        <a key="nav9" to="" id="delete" className="nav_controls"><i className="fas fa-trash"></i></a>
                        <Link key="nav10" to="settings" id="settings" className="nav_controls"><i className="fas fa-cog"></i></Link>
                    </nav>
                } />
            </Switch>
            <h1>Bookthingy</h1>
        </header>
    )
}

export default Header;
