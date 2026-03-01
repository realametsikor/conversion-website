const buildFaq = (toolName) => {
    const items = [
        {
            q: `Is ${toolName} free to use?`,
            a: 'Yes. This tool runs in your browser and is free for personal and professional use.'
        },
        {
            q: 'Are my files or text uploaded?',
            a: 'Processing happens locally in your browser unless stated otherwise, so your data stays on your device.'
        },
        {
            q: 'What formats are supported?',
            a: 'Each tool lists its supported formats in the instructions above.'
        }
    ];

    return items
        .map((item) => {
            return `
                <details>
                    <summary>${item.q}</summary>
                    <p>${item.a}</p>
                </details>
            `;
        })
        .join('');
};

const buildRelatedTools = (tool, allTools) => {
    const related = allTools
        .filter((candidate) => candidate.category === tool.category && candidate.id !== tool.id)
        .slice(0, 3);

    if (!related.length) {
        return '<p class="highlight-box">More tools in this category are coming soon.</p>';
    }

    return related
        .map((item) => {
            const url = `${item.categoryPath}/${item.id}/`;
            return `
                <article class="card">
                    <div class="tool-icon">${item.icon}</div>
                    <h3>${item.name}</h3>
                    <p>${item.seoDesc}</p>
                    <a class="btn btn-ghost" href="${url}">View Tool</a>
                </article>
            `;
        })
        .join('');
};

document.addEventListener('DOMContentLoaded', () => {
    const toolId = document.body.getAttribute('data-tool-id');
    const tool = typeof toolsConfig !== 'undefined' ? toolsConfig[toolId] : null;

    if (!tool) {
        console.error('Tool configuration not found.');
        return;
    }

    document.title = tool.seoTitle;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
    }
    metaDesc.content = tool.seoDesc;

    const allTools = Object.values(toolsConfig);
    const mainContainer = document.getElementById('tool-container');

    mainContainer.innerHTML = `
        <p class="breadcrumb"><a href="/">Home</a> / <a href="${tool.categoryPath}/">${tool.category}</a> / ${tool.name}</p>

        <div class="tool-layout">
            <div>
                <div class="tool-meta">
                    <h1>${tool.name}</h1>
                    <p>${tool.seoDesc}</p>
                </div>

                <div class="ad-placeholder ad-banner-top">ad-banner-top</div>

                <div class="tool-workspace">
                    ${tool.workspaceHtml}
                </div>

                <div class="ad-placeholder ad-inline">ad-inline</div>

                <section class="section" style="padding: 2rem 0 0;">
                    <h2>How to use ${tool.name}</h2>
                    <ol style="margin-left: 1.2rem; margin-top: 1rem;">
                        ${tool.instructions.map((step) => `<li>${step}</li>`).join('')}
                    </ol>
                </section>

                <section class="section" style="padding: 2rem 0 0;">
                    <h2>FAQ</h2>
                    <div class="faq" style="margin-top: 1rem;">
                        ${buildFaq(tool.name)}
                    </div>
                </section>

                <section class="section" style="padding: 2rem 0;">
                    <h2>Related tools</h2>
                    <div class="grid grid-3" style="margin-top: 1.5rem;">
                        ${buildRelatedTools(tool, allTools)}
                    </div>
                </section>
            </div>

            <aside>
                <div class="ad-placeholder ad-sidebar">ad-sidebar</div>
            </aside>
        </div>
    `;

    if (tool.script) {
        const script = document.createElement('script');
        script.src = tool.script;
        document.body.appendChild(script);
    }
});
