const API_URL = "https://jsonplaceholder.typicode.com/users";

// 1. GET - Read all users
async function getData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        console.log("GET - All Users:", data);
    } catch (error) {
        console.log("GET Error:", error.message);
    }
}

// 2. POST - Create a new user
async function postData() {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: "Sarthak",
                email: "sarthak@example.com"
            })
        });

        const data = await response.json();
        console.log("POST - Created User:", data);
    } catch (error) {
        console.log("POST Error:", error.message);
    }
}

// 3. PUT - Update user data
async function putData() {
    try {
        const response = await fetch(API_URL + "/1", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: "Sarthak Updated",
                email: "updated@example.com"
            })
        });

        const data = await response.json();
        console.log("PUT - Updated User:", data);
    } catch (error) {
        console.log("PUT Error:", error.message);
    }
}

// 4. PATCH - Update one field
async function patchData() {
    try {
        const response = await fetch(API_URL + "/1", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: "New Name"
            })
        });

        const data = await response.json();
        console.log("PATCH - Updated User:", data);
    } catch (error) {
        console.log("PATCH Error:", error.message);
    }
}

// 5. DELETE - Delete a user
async function deleteData() {
    try {
        const response = await fetch(API_URL + "/1", {
            method: "DELETE"
        });

        console.log("DELETE - Status:", response.status);
    } catch (error) {
        console.log("DELETE Error:", error.message);
    }
}

// Run all operations one by one
async function runAllOperations() {
    console.log("API Operations Started");

    await getData();
    await postData();
    await putData();
    await patchData();
    await deleteData();

    console.log("All Operations Completed");
}

runAllOperations();