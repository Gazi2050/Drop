export async function uploadFilesToServer(files: File[]): Promise<{
    success: boolean;
    urls?: string[];
    error?: string;
}> {
    const formData = new FormData();

    files.forEach((file) => {
        formData.append('file', file);
    });

    try {
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error: data?.error || 'Upload failed',
            };
        }

        return {
            success: true,
            urls: data.urls,
        };
    } catch (err) {
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Something went wrong',
        };
    }
}
