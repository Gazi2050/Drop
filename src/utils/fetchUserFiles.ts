export async function fetchUserFiles() {
    try {
        const res = await fetch('/api/dashboard', {
            method: 'GET',
            credentials: 'include',
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch files: ${res.statusText}`);
        }

        const data = await res.json();
        return data.files || [];
    } catch (error) {
        console.error('Error fetching user files:', error);
        return [];
    }
}
