/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: 'var(--primary)',
                    hover: 'var(--primary-hover)',
                },
                secondary: 'var(--secondary)',
                accent: {
                    orange: 'var(--accent-orange)',
                    pink: 'var(--accent-pink)',
                    emerald: 'var(--accent-emerald)',
                    cyan: 'var(--secondary)',
                    purple: 'var(--primary)',
                },
                success: 'var(--success)',
                error: 'var(--error)',
                danger: 'var(--error)',
                warning: 'var(--warning)',
                background: 'var(--background)',
                surface: {
                    DEFAULT: 'var(--surface)',
                    light: 'var(--surface-light)',
                    highlight: 'rgba(99, 102, 241, 0.05)',
                },
                text: {
                    main: 'var(--text-main)',
                    muted: 'var(--text-muted)',
                },
                border: 'var(--border)',
            },
            borderRadius: {
                md: 'var(--radius-md)',
                lg: 'var(--radius-lg)',
                xl: '12px',
            },
            spacing: {
                xs: 'var(--spacing-xs)',
                sm: 'var(--spacing-sm)',
                md: 'var(--spacing-md)',
                lg: 'var(--spacing-lg)',
                xl: 'var(--spacing-xl)',
            }
        },
    },
    plugins: [],
}
