import React from "react";
import { Link } from 'react-router-dom';


class Toc extends React.Component {
    constructor() {
        super();
        this.state = {
            chapters : []
        };
    }

    handleAddChapter () {
        const new_chapter = document.createRange().createContextualFragment(`<li class="new_chapter_li"><input id="new_chapter" placeholder="New Chapter" /></li>`);
        this.toc_el.appendChild(new_chapter);
        const new_chapter_input = document.querySelector(`#new_chapter`);
        new_chapter_input.addEventListener('keyup', event => event.keyCode === 13 ? this.addChapter() : null);
        new_chapter_input.select();
        return this;
    }

    addChapter () {
        const new_chapter_el = document.querySelector(`.new_chapter_li`);
        const chapter_title  = document.querySelector(`#new_chapter`).value;

        if (!new_chapter_el || !chapter_title) {
            alert('You must give the chapter a name');
            return;
        }

        return fetch('http://localhost:3005/', {
            method: 'POST',
            body: JSON.stringify({chapter: {title: chapter_title}}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            new_chapter_el.innerHTML = `<a class="toc_item" href="${response.chapter.cuid}">${chapter_title}</a>`;
            new_chapter_el.classList.remove('new_chapter_li');
            console.log('Success:', response);
        });
    }

    componentDidMount() {
        fetch('http://localhost:3005')
            .then(response => response.json())
            .then(json => this.setState({chapters: json.chapters}))

        this.toc_el = document.querySelector(`#toc`);
        document.querySelector(`#add_chapter`).addEventListener('click', () => this.handleAddChapter());
    }

    render() {
        return (
            <ol id="toc">
            {this.state.chapters.map(chapter => (
                <li key={chapter.cuid}>
                    <Link className="toc_item" to={`/chapter/${chapter.cuid}`}>{chapter.title}</Link>
                </li>
            ))}
            </ol>
        );
    }
}

export default Toc;
