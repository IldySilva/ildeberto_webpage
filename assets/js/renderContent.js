document.addEventListener('DOMContentLoaded', () => {
    const timelineContainer = document.querySelector('.timelineContainer');

    if (timelineContainer) {
        fetch('/content.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.journey && data.journey.length > 0) {
                    timelineContainer.innerHTML = ''; // Clear existing content
                    data.journey.forEach(item => {
                        const timelineItem = document.createElement('div');
                        timelineItem.classList.add('timeline__item');

                        timelineItem.innerHTML = `
                            <h3 class="timeline__title">
								<div class="circle__dot"></div>${item.company}
							</h3>
							<span class="timeline__text">
								${item.role}
							</span>
							<span class="timeline__date"><i class="fa-solid fa-calendar-days"></i>
								${item.period}</span>
                        `;
                        timelineContainer.appendChild(timelineItem);
                    });
                }
            })
            .catch(error => console.error('Error fetching or parsing content:', error));
    }
});
