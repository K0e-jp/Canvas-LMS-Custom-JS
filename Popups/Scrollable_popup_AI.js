document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.match(/\/courses\/\d+$/)) {
        let courseId = window.location.pathname.match(/\/courses\/(\d+)$/);
        if (courseId) {
            let visitedCourses = JSON.parse(localStorage.getItem("visitedCourses")) || {};
            if (!visitedCourses[courseId[1]]) {
                showPopup();
                visitedCourses[courseId[1]] = true;
                localStorage.setItem("visitedCourses", JSON.stringify(visitedCourses));
            }
        }
    }
});

function showPopup() {
    let popup = document.createElement("div");
    popup.id = "custom-popup";
    popup.innerHTML = `
        <div class="popup-content">
            <div class="popup-text">
                <h2>TITLE</h2>
                <div class="popup-scrollable" id="popup-scrollable">
                    <p>Main text:</p>
                    <p>• point 1</p>
                    <p>• point 2</p>
                    <p>• point 3</p>
                    <p>• point 4</p>
                    <p>• point 5</p>
                    <p>• point 6</p>
                    <p>• point 7</p>
                </div>
            </div>
            <button id="close-popup" disabled>I Accept</button>
        </div>
    `;
    document.body.appendChild(popup);
    
    let scrollable = document.getElementById("popup-scrollable");
    let acceptButton = document.getElementById("close-popup");

    scrollable.addEventListener("scroll", function () {
        if (scrollable.scrollHeight - scrollable.scrollTop <= scrollable.clientHeight + 5) {
            acceptButton.disabled = false;
        }
    });

    acceptButton.addEventListener("click", function () {
        popup.style.display = "none";
    });
    
    let style = document.createElement("style");
    style.innerHTML = `
        #custom-popup {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            border-radius: 8px;
            text-align: left;
            z-index: 1000;
            width: 500px;
            max-height: 500px;
            display: flex;
            flex-direction: column;
        }
        .popup-content {
            display: flex;
            flex-direction: column;
            height: 100%;
        }
        .popup-text {
            flex-grow: 1;
            padding: 10px;
            font-family: 'Arial', sans-serif;
            font-size: 14px;
            line-height: 1.5;
            max-height: 400px;
        }
        .popup-scrollable {
            overflow-y: auto;
            max-height: 350px;
            padding-right: 10px;
        }
        .popup-content button {
            align-self: center;
            margin-top: 10px;
            padding: 8px 12px;
            cursor: pointer;
            font-size: 14px;
            border: none;
            background-color: #0073e6;
            color: white;
            border-radius: 4px;
        }
        .popup-content button:disabled {
            background-color: gray;
            cursor: not-allowed;
        }
        .popup-content button:hover:enabled {
            background-color: #005bb5;
        }
    `;
    document.head.appendChild(style);
}
