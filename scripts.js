const translations = {
    en: {
        about: "About Us",
        about_us: "About Us",
        about_text: "Times School is a learning centre located in Tashkent, Uzbekistan. Established in 2022, we have two branches and over 1000 students. We offer a variety of courses including English, Kids English, IELTS, CEFR, Maths, Kids Maths, Korean, IT, Russian, and Nursery (Почемучка).",
        courses: "Courses",
        course_english: "English",
        course_kids_english: "Kids English",
        course_ielts: "IELTS",
        course_cefr: "CEFR",
        course_maths: "Maths",
        course_kids_maths: "Kids Maths",
        course_korean: "Korean",
        course_it: "IT",
        course_russian: "Russian",
        course_nursery: "Nursery (Почемучка)",
        academic_support: "Academic Support",
        academic_support_text: "We offer Academic Support services which students can attend as extra lessons.",
        events: "Events",
        events_text: "We have Sunday events like movie days, IELTS mock exams, quests, competitions, debates, speaking clubs, and game clubs.",
        branches: "Branches",
        branch1_location: "1st Branch Location",
        branch2_location: "2nd Branch Location",
        contact: "Get First Demo Lesson for Free",
        get_demo: "Get First Demo Lesson for Free",
        name: "Name:",
        phone: "Phone Number:",
        course: "Course:",
        preferred_time: "Preferred Days and Time:",
        submit: "Submit"
    },
    ru: {
        about: "О нас",
        about_us: "О нас",
        about_text: "Times School - это учебный центр, расположенный в Ташкенте, Узбекистан. Основан в 2022 году, у нас есть два филиала и более 1000 студентов. Мы предлагаем различные курсы, включая английский, детский английский, IELTS, CEFR, математику, детскую математику, корейский, IT, русский и детский сад (Почемучка).",
        courses: "Курсы",
        course_english: "Английский",
        course_kids_english: "Детский английский",
        course_ielts: "IELTS",
        course_cefr: "CEFR",
        course_maths: "Математика",
        course_kids_maths: "Детская математика",
        course_korean: "Корейский",
        course_it: "IT",
        course_russian: "Русский",
        course_nursery: "Детский сад (Почемучка)",
        academic_support: "Академическая поддержка",
        academic_support_text: "Мы предлагаем услуги академической поддержки, которые студенты могут посещать как дополнительные уроки.",
        events: "Мероприятия",
        events_text: "Мы проводим воскресные мероприятия, такие как киносеансы, пробные экзамены IELTS, квесты, конкурсы, дебаты, разговорные клубы и игровые клубы.",
        branches: "Филиалы",
        branch1_location: "Местоположение первого филиала",
        branch2_location: "Местоположение второго филиала",
        contact: "Получите первый демонстрационный урок бесплатно",
        get_demo: "Получите первый демонстрационный урок бесплатно",
        name: "Имя:",
        phone: "Номер телефона:",
        course: "Курс:",
        preferred_time: "Предпочтительные дни и время:",
        submit: "Отправить"
    },
    uz: {
        about: "Biz haqimizda",
        about_us: "Biz haqimizda",
        about_text: "Times School - bu Toshkent, O'zbekiston shahrida joylashgan o'quv markazi. 2022 yilda tashkil etilgan, bizda ikkita filial va 1000 dan ortiq talabalar bor. Biz ingliz tili, bolalar ingliz tili, IELTS, CEFR, matematika, bolalar matematikasi, koreys tili, IT, rus tili va bolalar bog'chasi (Почемучка) kabi turli kurslarni taklif qilamiz.",
        courses: "Kurslar",
        course_english: "Ingliz tili",
        course_kids_english: "Bolalar ingliz tili",
        course_ielts: "IELTS",
        course_cefr: "CEFR",
        course_maths: "Matematika",
        course_kids_maths: "Bolalar matematikasi",
        course_korean: "Koreys tili",
        course_it: "IT",
        course_russian: "Rus tili",
        course_nursery: "Bolalar bog'chasi (Почемучка)",
        academic_support: "Akademik yordam",
        academic_support_text: "Biz akademik yordam xizmatlarini taklif qilamiz, bu qo'shimcha darslar sifatida qatnashishlari mumkin.",
        events: "Tadbirlar",
        events_text: "Biz yakshanba kunlari film kunlari, IELTS imtihonlari, kvestlar, musobaqalar, munozaralar, suhbat klublari va o'yin klublari kabi tadbirlarni o'tkazamiz.",
        branches: "Filiallar",
        branch1_location: "Birinchi filial joylashuvi",
        branch2_location: "Ikkinchi filial joylashuvi",
        contact: "Birinchi demo darsni bepul oling",
        get_demo: "Birinchi demo darsni bepul oling",
        name: "Ism:",
        phone: "Telefon raqami:",
        course: "Kurs:",
        preferred_time: "Ma'qul kunlar va vaqt:",
        submit: "Yuborish"
    }
};

function setLanguage(language) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(el => {
        const key = el.getAttribute('data-translate');
        el.textContent = translations[language][key];
    });
}

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 41.311158, lng: 69.279737}, // Coordinates of Tashkent
        zoom: 12
    });

    var marker1 = new google.maps.Marker({
        position: {lat: 41.326515, lng: 69.228244}, // Coordinates for 1st branch
        map: map,
        title: '1st Branch'
    });

    var marker2 = new google.maps.Marker({
        position: {lat: 41.311158, lng: 69.279737}, // Coordinates for 2nd branch
        map: map,
        title: '2nd Branch'
    });
}

document.getElementById('demoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const course = document.getElementById('course').value;
    const preferred_time = document.getElementById('preferred_time').value;

    const data = {
        name: name,
        phone: phone,
        course: course,
        preferred_time: preferred_time
    };

    fetch('YOUR_WEB_APP_URL', {
        method: 'POST',
        body: new URLSearchParams(data)
    })
    .then(response => response.text())
    .then(result => {
        document.getElementById('demoForm').reset();
        document.getElementById('thankYouMessage').classList.remove('hidden');
    })
    .catch(error => console.error('Error:', error));
});
