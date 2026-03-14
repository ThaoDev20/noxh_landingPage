const bootstrapIconsLink = document.createElement('link');
bootstrapIconsLink.rel = 'stylesheet';
bootstrapIconsLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css';
document.head.appendChild(bootstrapIconsLink);


function loadComponent(id, path) {
    fetch(path)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        });
}

function initScrollLogic() {
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    window.addEventListener('scroll', () => {
        if (scrollTopBtn) {
            scrollTopBtn.classList.toggle('hidden', window.scrollY <= 200);
        }
    });
    scrollTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initMenuLogic() {
    const openMenuBtn = document.getElementById('open-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const sidebar = document.getElementById('mobile-menu');
    const overlay = document.getElementById('menu-overlay');
    const menuList = document.getElementById('menu-list');

const menuItems = [
    { name: "Trang chủ", link: "home.html" },
    { name: "Mặt bằng căn hộ", link: "mat-bang-can-ho.html" },
    { name: "Tiện ích nội khu", link:"tien-ich-noi-khu.html" },
    { name: "Ảnh 360 tổng thể", link: "anh-360-tong-the.html" }, 
    { name: "Tiến độ dự án", link: "tien-do-du-an.html" },
    { name: "Thông tin dự án", link: "thong-tin-du-an.html" },
    { name: "Tin tức", link: "tin-tuc.html" }, 
    { name: "Q&A về dự án", link: "qa-du-an.html" }
];

    if (menuList) {
        menuList.innerHTML = ''; // Reset list
        menuItems.forEach((item) => {
            const li = document.createElement('li');
            li.className = "menu-item -translate-x-4 opacity-0";
            li.innerHTML = `
                <a href="${item.link}" class="block border-b border-white/25 py-4 text-[18px] font-semibold leading-tight text-white transition-all duration-300 hover:pl-2 hover:text-white/90">
                    ${item.name}
                </a>`;
            menuList.appendChild(li);
        });
    }

    const toggleMenu = (isOpen) => {
        if (!sidebar || !overlay) return;
        sidebar.classList.toggle('-translate-x-full', !isOpen);
        overlay.classList.toggle('opacity-0', !isOpen);
        overlay.classList.toggle('pointer-events-none', !isOpen);
        openMenuBtn?.classList.toggle('hidden', isOpen);
        closeMenuBtn?.classList.toggle('hidden', !isOpen);

        if (isOpen) {
            document.querySelectorAll('.menu-item').forEach((el, i) => {
                setTimeout(() => el.classList.remove('-translate-x-4', 'opacity-0'), 120 + (i * 60));
            });
        } else {
            document.querySelectorAll('.menu-item').forEach(el => el.classList.add('-translate-x-4', 'opacity-0'));
        }
    };

    openMenuBtn?.addEventListener('click', () => toggleMenu(true));
    closeMenuBtn?.addEventListener('click', () => toggleMenu(false));
    overlay?.addEventListener('click', () => toggleMenu(false));
}

async function loadComponent(id, path) {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error('Không thể tải file: ' + path);
        const data = await response.text();
        
        const container = document.getElementById(id);
        if (container) {
            container.innerHTML = data;
            
            if (id === 'menu-container') {
                initMenuLogic(); 
            }
        }
    } catch (err) {
        console.error("Lỗi loadComponent:", err);
    }
}
loadComponent('menu-container', './components/menu.html');
loadComponent('footer-container', './components/footer.html');
loadComponent('scroll-top-btn', './components/sroll.html');
loadComponent('project-progress-container', './components/projectProgress.html');
initScrollLogic();
