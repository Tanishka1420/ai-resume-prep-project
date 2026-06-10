document.addEventListener("DOMContentLoaded", () => {

    const fileInput = document.querySelector('input[type="file"]');
    const outputDiv = document.querySelector("#output");
    const button = document.querySelector(".generate-btn");

    button.addEventListener("click", async () => {

        if (!fileInput || fileInput.files.length === 0) {
            outputDiv.innerHTML = "⚠️ Please upload a resume first!";
            return;
        }

        const fileName = fileInput.files[0].name;

        outputDiv.innerHTML = "🤖 AI is analyzing your resume...";

        try {

            const response = await fetch("http://localhost:3000/analyze", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fileName: fileName
                })
            });

            const data = await response.json();

            if (data.error) {
                outputDiv.innerHTML = `
                    <h3>❌ Error</h3>
                    <p>${data.details}</p>
                `;
                return;
            }

            outputDiv.innerHTML = `
                <h3>🧠 AI Analysis</h3>
                <pre>${data.result}</pre>
            `;

        } catch (error) {

            outputDiv.innerHTML = `
                <h3>❌ Connection Error</h3>
                <p>${error.message}</p>
            `;
        }

    });

});