export async function loginUser(email: string, password: string) {
    const res = await fetch(`/api/users?email=${email}&password=${password}`);

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Login failed");
    }

    return await res.json();
}

export async function signupUser(email: string, password: string) {
    const res = await fetch(`/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Signup failed");
    }

    return await res.json();
}
