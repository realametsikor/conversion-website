const getToolsArray = () => Object.values(window.toolsConfig || {});

const normalize = (value) => (value || '').toLowerCase();

const renderTools = (tools, container) => {
    if (!container) return;
    if (!tools.length) {
        container.innerHTML = '<p class="highlight-box">No tools match that search yet. Try a different keyword.</p>';
        return;
    }

    container.innerHTML = tools
        .map((tool) => {
            const url = `${tool.categoryPath}/${tool.id}/`;
            return `
                <article class="card">
                    <div class="tool-icon">${tool.icon}</div>
                    <h3>${tool.name}</h3>
                    <p>${tool.seoDesc}</p>
                    <span class="card-meta">${tool.category}</span>
                    <a class="btn btn-primary" href="${url}">Open Tool</a>
                </article>
            `;
        })
        .join('');
};

const initToolsList = () => {
    const container = document.querySelector('[data-tools-grid]');
    if (!container) return;

    const allTools = getToolsArray();
    const category = container.getAttribute('data-category');

    const scopedTools = category
        ? allTools.filter((tool) => normalize(tool.category) === normalize(category))
        : allTools;

    renderTools(scopedTools, container);

    const searchInput = document.querySelector('[data-tools-search]');
    if (!searchInput) return;

    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');
    if (query) {
        searchInput.value = query;
    }

    const handleSearch = () => {
        const term = normalize(searchInput.value);
        const filtered = scopedTools.filter((tool) => {
            return normalize(tool.name).includes(term) || normalize(tool.seoDesc).includes(term);
        });
        renderTools(filtered, container);
    };

    searchInput.addEventListener('input', handleSearch);
    if (query) handleSearch();
};

document.addEventListener('DOMContentLoaded', initToolsList);
