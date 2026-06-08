document.addEventListener("DOMContentLoaded", function() {
    const continueBtn = document.getElementById("continue-btn");
    const welcomeScreen = document.getElementById("welcome-screen");
    const mainScreen = document.getElementById("main-screen");
    
    // Элементы админ-панели
    const adminBtn = document.getElementById("admin-panel-btn");
    const flightModal = document.getElementById("flight-modal");
    const codeModal = document.getElementById("code-modal");
    const closeModal = document.querySelector(".close-modal");
    const addFlightSubmit = document.getElementById("add-flight-submit");
    const tableBody = document.getElementById("flight-table-body");
    const outputCode = document.getElementById("output-code");
    const copyCodeBtn = document.getElementById("copy-code-btn");

    // СЕКРЕТНЫЙ ПАРОЛЬ
    const SECRET_PASSWORD = "769902ADDfjkUI";

    // Переход с приветственного экрана
    continueBtn.addEventListener("click", function() {
        welcomeScreen.classList.remove("active");
        setTimeout(() => {
            mainScreen.classList.add("active");
        }, 300);
    });

    // Нажатие на кнопку Create Flight
    adminBtn.addEventListener("click", function() {
        const passwordInput = prompt("Введите секретный пароль администратора:");
        if (passwordInput === SECRET_PASSWORD) {
            flightModal.style.display = "flex";
        } else if (passwordInput !== null) {
            alert("Неверный пароль! Доступ заблокирован.");
        }
    });

    // Закрытие модального окна создания
    closeModal.addEventListener("click", function() {
        flightModal.style.display = "none";
    });

    // Добавление рейса
    addFlightSubmit.addEventListener("click", function() {
        const num = document.getElementById("f-num").value.toUpperCase() || "AFL-000";
        const route = document.getElementById("f-route").value.toUpperCase() || "UNKNOWN";
        const date = document.getElementById("f-date").value.toUpperCase() || "TODAY";
        const time = document.getElementById("f-time").value || "00:00";
        const statusSelect = document.getElementById("f-status").value;

        let statusText = "NOT ARRIVED";
        let statusClass = "scheduled";

        if (statusSelect === "boarding") {
            statusText = "BOARDING";
            statusClass = "boarding";
        } else if (statusSelect === "delayed") {
            statusText = "DELAYED";
            statusClass = "delayed";
        }

        // Создаем новую строку
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${num}</td>
            <td>${route}</td>
            <td>${date}</td>
            <td>${time}</td>
            <td class="status ${statusClass}">${statusText}</td>
            <td><button class="delete-btn">&times;</button></td>
        `;
        tableBody.appendChild(newRow);

        flightModal.style.display = "none";

        // Показываем окно генерации кода
        showGitHubCode();

        // Очищаем форму
        document.getElementById("f-num").value = "";
        document.getElementById("f-route").value = "";
        document.getElementById("f-date").value = "";
        document.getElementById("f-time").value = "";
    });

    // Функция генерации кода
    function showGitHubCode() {
        const fullTableHTML = tableBody.innerHTML.trim();
        outputCode.value = fullTableHTML;
        codeModal.style.display = "flex";
    }

    // НАДЁЖНОЕ УДАЛЕНИЕ: Слушаем клики внутри всей таблицы
    tableBody.addEventListener("click", function(event) {
        // Проверяем, что кликнули именно по кнопке-крестику
        if (event.target.classList.contains("delete-btn")) {
            const passwordInput = prompt("Введите секретный пароль для удаления рейса:");
            
            if (passwordInput === SECRET_PASSWORD) {
                // Находим строку таблицы, в которой лежит этот крестик, и удаляем её
                const row = event.target.closest("tr");
                row.remove();
              // Сразу же открываем окно с новым кодом для GitHub
                showGitHubCode();
            } else if (passwordInput !== null) {
                alert("Неверный пароль! Рейс не удален.");
            }
        }
    });

    // Кнопка копирования кода
    copyCodeBtn.addEventListener("click", function() {
        outputCode.select();
        document.execCommand("copy");
        alert("Код успешно скопирован! Теперь вставь его на GitHub.");
        codeModal.style.display = "none";
    });

    // Клик мимо окон закрывает их
    window.addEventListener("click", function(event) {
        if (event.target === flightModal) flightModal.style.display = "none";
        if (event.target === codeModal) codeModal.style.display = "none";
    });
});

function switchTab(tabId) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));
    const activeTab = document.getElementById(`${tabId}-tab`);
    if(activeTab) activeTab.classList.add('active');
}
