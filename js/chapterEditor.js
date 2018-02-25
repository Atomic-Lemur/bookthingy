const chapterEditor = {
    cuid            : null,
    title_el        : null,
    content_el      : null,
    title           : '',
    content_html    : '',
    content: '',
    is_editing      : false,

    init () {
        this.cuid             = window.location.pathname.slice(1);
        this.title_el         = document.querySelector(`#chapter_title`);
        this.content_el       = document.querySelector(`#chapter_content`);
        this.title            = this.title_el.innerHTML || '';
        this.content_html     = this.content_el.innerHTML || '';
        this.content = this.content_el.innerHTML || '';

        document.querySelector(`#edit`).addEventListener('click', () => this.editChapter());
        document.querySelector(`#download`).addEventListener('click', () => console.log('need download'));
        document.querySelector(`#share`).addEventListener('click', () => console.log('need share'));
        document.querySelector(`#delete`).addEventListener('click', () => {
            this.deleteChapter().then(() => {
                window.location.assign(`http://${window.location.host}`);
            });
        });
        document.querySelector(`#settings`).addEventListener('click', () => console.log('need settings'));

        //this.content_el.addEventListener('click', this.editChapter.bind(this));
        this.title_el.addEventListener('keyup', event => event.keyCode === 13 ? this.editChapter() : null);
        this.getChapterMarkdown();
    },

    editChapter () {
        if(this.is_editing) {
            this.is_editing = false;
            this.doneChapterTitle().doneChapterContent().toggleSaveEditBtn().updateChapter();
            //this.content_el.addEventListener('click', this.editChapter.bind(this));
        } else {
            this.is_editing = true;
            this.editChapterTitle().editChapterContent().toggleSaveEditBtn();
            //this.content_el.removeEventListener('click', this.editChapter);
        }
        return this;
    },

    editChapterTitle () {
        this.title_el.innerHTML = `<input type="text" id="edit_title" value="${this.title}" />`;
        this.title_el.removeEventListener('click', () => this.editChapterTitle());
        return this;
    },

    editChapterContent () {
        this.content_el.innerHTML = `<textarea id="edit_content">${this.content}</textarea>`;
        this.content_el.removeEventListener('click', () => this.editChapterContent());
        return this;
    },

    doneChapterTitle () {
        this.title = document.querySelector(`#edit_title`).value;
        this.title_el.innerHTML = this.title;
        return this;
    },

    doneChapterContent () {
        this.content_html         = document.querySelector(`#edit_content`).value;
        this.content     = this.content_html;
        this.content_el.innerHTML = this.content_html;
        return this;
    },

    toggleSaveEditBtn () {
        const icon = document.querySelector(`#edit`).children[0];
        if(!this.is_editing) {
            icon.classList.remove("fa-save");
            icon.classList.add("fa-edit");
        } else {
            icon.classList.add("fa-save");
            icon.classList.remove("fa-edit");
        }
        return this;
    },

    updateChapter () {
        if (!this.title || !this.content) {
            alert(`There must be a title and content to save.`);
            return;
        }

        return fetch(`/${this.cuid}`, {
            method: 'PUT',
            body: JSON.stringify({chapter: {cuid: this.cuid, title: this.title, content: this.content}}),
            headers: new Headers({'Content-Type': 'application/json'})
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                console.log('success', response);
                this.content_html = response.chapter.content_html;
                this.content      = response.chapter.content;
            });
    },

    getChapterMarkdown () {
        return fetch(`/api/${this.cuid}`)
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => this.content = response.chapter.content);
    },

    deleteChapter () {
        return fetch(`/${this.cuid}`, {
            method: 'DELETE',
            body: JSON.stringify({chapter: {cuid: this.cuid}}),
            headers: new Headers({'Content-Type': 'application/json'})
        }).catch(error => console.error('Error:', error));
    },
}
