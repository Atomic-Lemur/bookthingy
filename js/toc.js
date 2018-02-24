const toc = {
    toc_el : null,

    init () {
        this.toc_el = document.querySelector(`#toc`);
        document.querySelector(`#add_chapter`).addEventListener('click', () => this.handleAddChapter());
    },

    handleAddChapter () {
        const new_chapter = document.createRange().createContextualFragment(`<li class="new_chapter_li"><input id="new_chapter" value="New Chapter" /></li>`);
        this.toc_el.appendChild(new_chapter);
        const new_chapter_input = document.querySelector(`#new_chapter`);
        new_chapter_input.addEventListener('keyup', event => event.keyCode === 13 ? this.addChapter() : null);
        new_chapter_input.select();
        return this;
    },

    addChapter () {
        const new_chapter_el = document.querySelector(`.new_chapter_li`);
        const chapter_title  = document.querySelector(`#new_chapter`).value;

        return fetch('/', {
            method: 'POST',
            body: JSON.stringify({chapter: {title: chapter_title}}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => {
                console.log('resp', res);
                return res.json();
            }).catch(
                error => console.error('Error:', error)
            ).then(response => {
                new_chapter_el.innerHTML = `<a class="toc_item" href="${response.chapter.cuid}">${chapter_title}</a>`;
                new_chapter_el.classList.remove('new_chapter_li');
                console.log('Success:', response);
            });
    },
}
