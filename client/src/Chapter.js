import React from 'react';
import ReactMarkdown from 'react-markdown';

class Chapter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chapter: {
                content: null,
                title: null,
            }
        };
    }

    deleteChapter () {
        return fetch(`http://localhost:3005/${this.state.chapter.cuid}`, {
            method: 'DELETE',
            body: JSON.stringify({chapter: {cuid: this.state.chapter.cuid}}),
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        })
        .catch(error => console.error('Error:', error));
    }

    componentDidMount() {
        const chapter_cuid = this.props.match.params.cuid;

        fetch(`http://localhost:3005/${chapter_cuid}`)
            .then(response => response.json())
            .then(json => this.setState({chapter: json.chapter}));

        document.querySelector(`#edit`).addEventListener('click', () => this.editChapter());
        document.querySelector(`#download`).addEventListener('click', () => console.log('need download'));
        document.querySelector(`#share`).addEventListener('click', () => console.log('need share'));
        document.querySelector(`#delete`).addEventListener('click', () => {
            this.deleteChapter()
                .then(() => window.location.assign(`http://${window.location.host}`));
        });
        document.querySelector(`#settings`).addEventListener('click', () => console.log('need settings'));

        //this.content_el.addEventListener('click', this.editChapter.bind(this));
        //this.title_el.addEventListener('keyup', event => event.keyCode === 13 ? this.editChapter() : null);
    }

    render() {
        return (
            <div>
                <h2 id="chapter_title">{this.state.chapter.title}</h2>
                <ReactMarkdown id="chapter_content" source={this.state.chapter.content} />
            </div>
        );
    }
}

export default Chapter;
