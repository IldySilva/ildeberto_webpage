$(function() {
    // Function to render journey items
    function renderJourney(items) {
        const $container = $('.timelineContainer');
        $container.empty();

        items.forEach(item => {
            const html = `
                <div class="timeline__item">
                    <h3 class="timeline__title">
                        <div class="circle__dot"></div>${item.title}
                    </h3>
                    <span class="timeline__text">
                        ${item.role}
                    </span>
                    <span class="timeline__date">
                        <i class="fa-solid fa-calendar-days"></i>
                        ${item.date}
                    </span>
                </div>
            `;
            $container.append(html);
        });
    }

    // Fetch and parse YAML
    fetch('content.yaml')
        .then(response => response.text())
        .then(yamlText => {
            const data = jsyaml.load(yamlText);
            if (data && data.journey) {
                renderJourney(data.journey);
            }
        })
        .catch(error => {
            console.error('Error loading content.yaml:', error);
        });
});
