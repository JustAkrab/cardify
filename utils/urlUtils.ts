export function getURL(path: string = ''): string {
    // Base URL can be determined based on the environment
    const baseURL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

    // Ensure the path starts with a slash
    const formattedPath = path.startsWith('/') ? path : `/${path}`;

    // Construct the full URL
    return `${baseURL}${formattedPath}`;
}
