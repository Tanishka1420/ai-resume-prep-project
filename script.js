const fileInput = document.querySelector('input[type="file"]');
const outputDiv = document.querySelector("#output");

document.querySelector(".generate-btn").addEventListener("click", function () {

    if (fileInput.files.length === 0) {
        outputDiv.innerHTML = "⚠️ Please upload a resume first!";
        outputDiv.style.color = "red";
    } else {

        const fileName = fileInput.files[0].name;

        outputDiv.innerHTML = `
            <h3>AI Analysis Complete</h3>
            <p><b>Resume:</b> ${fileName}</p>

            <h4>Top Skills Detected:</h4>
            <ul>
                <li>Java</li>
                <li>Problem Solving</li>
                <li>Basic Web Development</li>
            </ul>

            <h4>Interview Questions:</h4>
            <ol>
                <li>Tell me about yourself</li>
                <li>Explain your project</li>
                <li>What is Java?</li>
                <li>What is OOP?</li>
            </ol>

            <h4>Tips:</h4>
            <p>- Improve DSA</p>
            <p>- Build more projects</p>
            <p>- Practice communication</p>
        `;

        outputDiv.style.color = "black";
    }

});