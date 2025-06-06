export async function deleteFile(fileId: string) {
    const response = await fetch(`/api/delete?id=${fileId}`, {
        method: 'DELETE',
        credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Failed to delete file');
    }

    return data;
}

