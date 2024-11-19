// Находим все кнопки "Читать дальше"
const readMoreButtons = document.querySelectorAll('.read-more-btn');

readMoreButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Ищем связанный блок с информацией
        const info = this.previousElementSibling;

        // Переключаем класс hidden (если есть, удаляем, если нет — добавляем)
        info.classList.toggle('hidden');

        // Меняем текст кнопки в зависимости от состояния
        if (info.classList.contains('hidden')) {
            button.textContent = 'Читать дальше';
        }
        else {
            button.textContent = 'Скрыть';
        }
    });
});

// Отображение текущей даты и времени
function showDateTime() {
    const now = new Date();
    document.getElementById('currentDateTime').textContent = now.toLocaleString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

setInterval(showDateTime, 1000);

// Темы
const themeToggleButton = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme') || 'light-theme';

// Применяем сохраненную тему при загрузке страницы
document.body.classList.add(savedTheme);
themeToggleButton.textContent = savedTheme === 'dark-theme' ? '☀️' : '🌙';

// Применяем тему ко всем элементам страницы
document.querySelectorAll('*').forEach(el => {
    el.classList.add(savedTheme);
});

// Переключатель темы
themeToggleButton.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme', !isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark-theme' : 'light-theme');
    themeToggleButton.textContent = isDarkMode ? '☀️' : '🌙';

    // Применяем изменения темы ко всем элементам
    document.querySelectorAll('*').forEach(el => {
        el.classList.toggle('dark-theme', isDarkMode);
        el.classList.toggle('light-theme', !isDarkMode);
    });
});


// Элементы интерфейса
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const welcomeMessage = document.getElementById('welcome-message');
const userNameDisplay = document.getElementById('user-name-display');
const logoutButton = document.getElementById('logout-button');

// Регулярные выражения для проверки
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Для email

// Обработчик отправки формы входа
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    // Проверка заполнения всех полей
    if (!username || !password) {
        alert('Все поля должны быть заполнены.');
        return;
    }

    // Проверка email формата
    if (!emailRegex.test(username)) {
        alert('Введите корректный email.');
        return;
    }

    // Проверка длины и сложности пароля
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
        alert('Пароль должен быть не менее 8 символов, содержать заглавные и строчные буквы, а также цифры.');
        return;
    }

    // Если всё прошло, обрабатываем вход
    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[username]) {
        // Проверяем пароль для существующего пользователя
        if (users[username] === password) {
            localStorage.setItem('currentUser', username); // Сохраняем текущего пользователя
            showWelcomeMessage(username);
        } else {
            alert('Неверный пароль!');
        }
    } else {
        // Создаём нового пользователя
        users[username] = password;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', username); // Сохраняем текущего пользователя
        showWelcomeMessage(username);
    }
});

// Обработчик выхода из аккаунта
logoutButton.addEventListener('click', () => {
    localStorage.removeItem('currentUser'); // Удаляем данные текущего пользователя
    showLoginForm();
});

// Функции для показа/скрытия элементов интерфейса
function showLoginForm() {
    loginForm.classList.remove('hidden');
    welcomeMessage.classList.add('hidden');
}

function showWelcomeMessage(username) {
    userNameDisplay.textContent = username;
    loginForm.classList.add('hidden');
    welcomeMessage.classList.remove('hidden');
}

// Автологин, если пользователь уже вошёл
document.addEventListener('DOMContentLoaded', () => {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const currentUser = localStorage.getItem('currentUser');

    if (currentUser && users[currentUser]) {
        showWelcomeMessage(currentUser);
    } else {
        showLoginForm();
    }
});

// Функция для применения языка
const languageSelector = document.getElementById('languageSelector');

function applyLanguage(language) {
    const quote = document.getElementById('quote');
    const authorsCite = document.getElementById('authorsCite');

    switch (language) {
        case 'en':
            quote.textContent = '"To build something truly new, you need to skillfully combine tradition with modern technology."';
            authorsCite.textContent = 'Baimurzyn Bakhtiyar, Kuralay Telgarina';
            break;
        case 'ru':
            quote.textContent = '"Чтобы построить что-то по-настоящему новое, нужно умело сочетать традиции с современными технологиями."';
            authorsCite.textContent = 'Баймурзин Бахтияр, Куралай Тельгарина';
            break;
        case 'kz':
            quote.textContent = '"Жаңа нәрсені құру үшін дәстүрді заманауи технологиялармен шебер үйлестіру қажет."';
            authorsCite.textContent = 'Баймурзин Бахтияр, Куралай Тельгарина';
            break;
        default:
            quote.textContent = '"To build something truly new, you need to skillfully combine tradition with modern technology."';
            authorsCite.textContent = 'Baimurzyn Bakhtiyar, Kuralay Telgarina';
            break;
    }
}

// Сохранение выбранного языка в localStorage при изменении
languageSelector.addEventListener('change', () => {
    const selectedLanguage = languageSelector.value;
    localStorage.setItem('language', selectedLanguage); // Сохранение выбранного языка
    applyLanguage(selectedLanguage);
});

// Применение языка при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const currentUser = localStorage.getItem('currentUser');

    if (currentUser && users[currentUser]) {
        showWelcomeMessage(currentUser);
    } else {
        showLoginForm();
    }

    document.body.classList.add(savedTheme);
    themeToggleButton.textContent = savedTheme === 'dark-theme' ? '☀️' : '🌙';

    const savedLanguage = localStorage.getItem('language') || 'en'; // По умолчанию английский язык
    languageSelector.value = savedLanguage;
    applyLanguage(savedLanguage);
});