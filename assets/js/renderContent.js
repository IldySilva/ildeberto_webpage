document.addEventListener('DOMContentLoaded', () => {
    fetch('/content.yml')
        .then(r => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.text();
        })
        .then(text => {
            const data = jsyaml.load(text);
            renderHero(data.hero);
            renderProjects(data.projects);
            renderLinkList('article-list', 'articles-section', data.articles, 3);
            renderLinkList('video-list', 'videos-section', data.videos, 4);
            renderEducation(data.education, data.languages);
            renderSkills(data.skills);
        })
        .catch(err => console.error('Failed to load content.yml:', err));

    // Drawer toggle
    const btn     = document.getElementById('stack-btn');
    const overlay = document.getElementById('stack-overlay');
    const drawer  = document.getElementById('stack-drawer');
    const close   = document.getElementById('stack-close');

    const openDrawer  = () => { overlay.classList.add('open'); drawer.classList.add('open'); };
    const closeDrawer = () => { overlay.classList.remove('open'); drawer.classList.remove('open'); };

    btn.addEventListener('click', openDrawer);
    overlay.addEventListener('click', closeDrawer);
    close.addEventListener('click', closeDrawer);
});

function renderHero(hero) {
    const bio     = document.getElementById('hero-bio');
    const socials = document.getElementById('hero-socials');
    if (bio) bio.innerHTML = hero.bio;
    if (socials && hero.socials) {
        socials.innerHTML = hero.socials
            .map(s => `<a href="${s.url}" target="_blank" rel="noopener">${s.label}</a>`)
            .join('');
    }
}

function renderProjects(projects) {
    const list = document.getElementById('project-list');
    if (!list || !projects) return;
    list.innerHTML = projects
        .map(p => {
            const tags = p.tags ? `<span class="project-tags">${p.tags.join(', ')}</span>` : '';
            const name = p.url
                ? `<a href="${p.url}" target="_blank" rel="noopener">${p.name}</a>`
                : p.name;
            return `<li><strong>${name}</strong> &mdash; ${p.description}${tags ? ' ' + tags : ''}</li>`;
        })
        .join('');
}

function renderLinkList(listId, sectionId, data, max) {
    const list    = document.getElementById(listId);
    const section = document.getElementById(sectionId);
    if (!list || !data) return;

    const items  = (data.items || data).filter(i => i.title && i.url);
    if (items.length === 0) return;

    const shown = items.slice(0, max || items.length);

    list.innerHTML = shown
        .map(i => `<li><a href="${i.url}" target="_blank" rel="noopener">${i.title}</a></li>`)
        .join('');

    if (data.see_more) {
        list.insertAdjacentHTML('afterend',
            `<a href="${data.see_more}" target="_blank" rel="noopener" class="see-more-link">See more &rarr;</a>`
        );
    }

    if (section) section.style.display = '';
}

function renderEducation(education, languages) {
    const list = document.getElementById('education-list');
    if (!list) return;
    const eduItems = (education || [])
        .map(e => `<li><strong>${e.degree}</strong>, ${e.institution} &middot; ${e.period}</li>`)
        .join('');
    const langItem = languages && languages.length
        ? `<li><strong>Languages</strong> &mdash; ${languages.join(', ')}</li>`
        : '';
    list.innerHTML = eduItems + langItem;
}

function renderSkills(skills) {
    const list = document.getElementById('skills-list');
    if (!list || !skills) return;
    list.innerHTML = skills
        .map(s => `<li><strong>${s.label}</strong><span>${s.details}</span></li>`)
        .join('');
}
