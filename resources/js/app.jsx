import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { ThemeProvider } from './Components/ThemeProvider';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const pages = import.meta.glob('./Pages/**/*.jsx');
        const page = await resolvePageComponent(`./Pages/${name}.jsx`, pages);

        page.default.layout = page.default.layout || ((page) => page);

        return page;
    },
    setup({ el, App, props }) {
        if (import.meta.env.SSR) {
            hydrateRoot(el, <App {...props} />);
            return;
        }

        const appELement = (
            <ThemeProvider defaultTheme="dark" storageKey="current-theme">
                <App {...props} />
            </ThemeProvider>
        );

        createRoot(el).render(appELement);
    },
    progress: {
        color: '#4B5563',
    },
});
