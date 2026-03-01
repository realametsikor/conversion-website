/**
 * tool-renderer.js
 * Injects tool layout with fully responsive Mobile Ad Swapping.
 */
document.addEventListener('DOMContentLoaded', () => {
    const toolId = document.body.getAttribute('data-tool-id');
    const tool = typeof toolsConfig !== 'undefined' ? toolsConfig[toolId] : null;

    if (!tool) {
        console.error("Tool configuration not found!");
        return;
    }

    document.title = tool.seoTitle;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
    }
    metaDesc.content = tool.seoDesc;

    const mainContainer = document.getElementById('tool-container');
    
    mainContainer.innerHTML = `
        <p style="margin-top: 1rem; font-size: 0.875rem;"><a href="/">Home</a> > <a href="${tool.categoryPath}">${tool.category}</a> > ${tool.name}</p>

        <div class="tool-layout">
            <div>
                <h1 style="text-align: center;">${tool.name}</h1>
                <p style="text-align: center; margin-bottom: 2rem;">${tool.seoDesc}</p>

                <div class="tool-workspace">
                    ${tool.workspaceHtml}
                </div>

                <div style="margin: 3rem 0; width: 100%; min-height: 280px; overflow: hidden; border-top: 1px solid var(--border); padding-top: 1.5rem;">
                    <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 1rem; text-transform: uppercase; font-weight: bold; letter-spacing: 0.05em;">Recommended</p>
                    <iframe src="/ad-native" width="100%" height="280" frameborder="0" scrolling="no" style="border:none; overflow:hidden;"></iframe>
                </div>

                <div class="desktop-ad" style="margin: 3rem 0; min-height: 90px; overflow: hidden;">
                    <iframe src="/ad-middle" width="728" height="90" frameborder="0" scrolling="no" style="border:none;"></iframe>
                </div>

                <div class="mobile-ad" style="overflow: hidden;">
                    <iframe src="/ad-mobile" width="300" height="250" frameborder="0" scrolling="no" style="border:none;"></iframe>
                </div>

                <h2>How to use ${tool.name}</h2>
                <ol style="margin-left: 1.5rem; margin-bottom: 2rem;">
                    ${tool.instructions.map(step => `<li>${step}</li>`).join('')}
                </ol>
            </div>

            <aside>
                <div style="text-align: center; display: flex; justify-content: center; position: sticky; top: 2rem; min-height: 600px; overflow: hidden;">
                    <iframe src="/ad-sidebar" width="160" height="600" frameborder="0" scrolling="no" style="border:none;"></iframe>
                </div>
            </aside>
        </div>
    `;

    if (tool.script) {
        const script = document.createElement('script');
        script.src = tool.script;
        document.body.appendChild(script);
    }
});
