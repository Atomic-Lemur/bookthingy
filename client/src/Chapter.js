import React from 'react';
import ReactMarkdown from 'react-markdown';

class Chapter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chapter: {
                cuid: '',
                title: '',
                content: '',
            },
            is_editing: false,
        };

        this.handleChange = this.handleChange.bind(this);
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

    saveEditToggle () {
        this.updateChapter();
    }

    toggleEditState () {
        this.setState(prevState => {
            return { is_editing: prevState.is_editing ? false : true };
        });
        return this;
    }

    toggleSaveEditBtn() {
        if (this.state.is_editing) {
            document.querySelector(`#save`).classList.remove('hidden');
            document.querySelector(`#edit`).classList.add('hidden');
        } else {
            document.querySelector(`#edit`).classList.remove('hidden');
            document.querySelector(`#save`).classList.add('hidden');
        }
        return this;
    }

    toggleEditMode () {
        if (this.state.is_editing) {
            document.querySelector('#chapter_title').classList.add('hidden');
            document.querySelector('#edit_title').classList.remove('hidden');
            document.querySelector('.markdown_content').classList.add('hidden');
            document.querySelector('#edit_content').classList.remove('hidden');
        } else {
            document.querySelector('#chapter_title').classList.remove('hidden');
            document.querySelector('#edit_title').classList.add('hidden');
            document.querySelector('.markdown_content').classList.remove('hidden');
            document.querySelector('#edit_content').classList.add('hidden');
        }
        return this;
    }

    handleChange(event) {
        let chapter = this.state.chapter;
        chapter[event.target.dataset.parameter] = event.target.value;
        this.setState(chapter);
    }

    updateChapter () {
        if (!this.state.is_editing) {
            return this.toggleEditState()
                .toggleSaveEditBtn()
                .toggleEditMode();
        }

        this.setState({ chapter: {
            cuid:    this.state.chapter.cuid,
            content: document.querySelector(`#edit_content`).value,
            title:   document.querySelector(`#edit_title`).value,
        }});

        if (!this.state.chapter.title || !this.state.chapter.content) {
            alert(`There must be a title and content to save.`);
            return;
        }

        return fetch(`http://localhost:3005/${this.state.chapter.cuid}`, {
            method: 'PUT',
            body: JSON.stringify({ chapter: this.state.chapter }),
            headers: new Headers({ 'Content-Type': 'application/json' })
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                this.toggleEditState()
                    .toggleSaveEditBtn()
                    .toggleEditMode()
                    .setState(response);
            });
    }

    componentDidMount() {
        const chapter_cuid = this.props.match.params.cuid;

        fetch(`http://localhost:3005/${chapter_cuid}`)
            .then(response => response.json())
            .then(json => this.setState({ chapter: json.chapter }));

        document.querySelector(`#edit`).addEventListener('click', () => this.saveEditToggle());
        document.querySelector(`#save`).addEventListener('click', () => this.saveEditToggle());
        document.querySelector(`#share`).addEventListener('click', () => console.log('need share'));
        document.querySelector(`#delete`).addEventListener('click', () => {
            this.deleteChapter()
                .then(() => window.location.assign(`http://${window.location.host}`));
        });
        document.querySelector(`#settings`).addEventListener('click', () => console.log('need settings'));

        //this.content_el.addEventListener('click', this.editChapter.bind(this));
        document.querySelector(`#edit_title`).addEventListener('keyup', event => event.keyCode === 13 ? this.saveEditToggle() : null);
    }

    render() {
        return (
            <div>
                <h2 id="chapter_title">{this.state.chapter.title}</h2>
                <input id="edit_title" className="hidden" value={this.state.chapter.title} onChange={this.handleChange} data-parameter="title" />

                <ReactMarkdown className="markdown_content" source={this.state.chapter.content} />
                <textarea id="edit_content" className="hidden" value={this.state.chapter.content} onChange={this.handleChange} data-parameter="content"  />
            </div>
        );
    }
}

export default Chapter;
