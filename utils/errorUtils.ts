export function getErrorRedirect(redirectPath: string, errorMessage: string, fallbackMessage: string): string {
    const params = new URLSearchParams();
    params.append('error', errorMessage || fallbackMessage);
    return `${redirectPath}?${params.toString()}`;
}
