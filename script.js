document.addEventListener('DOMContentLoaded', () => {
    
    // ===================================================
    // 1. تأثير الظهور التدريجي عند التمرير (Scroll Reveal)
    // ===================================================
    const revealElements = document.querySelectorAll('.reveal-fade');
    
    const revealOnScroll = () => {
        const triggerBottom = (window.innerHeight / 5) * 4;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if(elementTop < triggerBottom) {
                element.classList.add('active');
                
                // تشغيل العداد التصاعدي إذا كان العنصر يحتوي عليه
                const counters = element.querySelectorAll('.count-up');
                counters.forEach(counter => {
                    if(!counter.classList.contains('counted')) {
                        animateCounter(counter);
                    }
                });
            }
        });
    };

    // العداد التصاعدي الذكي للأرقام
    const animateCounter = (counter) => {
        counter.classList.add('counted');
        const target = +counter.getAttribute('data-target');
        const speed = target / 50; 
        
        const updateCount = () => {
            const current = +counter.innerText;
            if(current < target) {
                counter.innerText = Math.ceil(current + speed);
                setTimeout(updateCount, 25);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); 


    // ===================================================
    // 2. تأثير الـ 3D Tilt للماوس على الكروت والـ Widgets
    // ===================================================
    const tiltElements = document.querySelectorAll('.tilt-element');

    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((centerY - y) / centerY) * 10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });

    // ===================================================
    // 3. حركة تفاعلية ناعمة للـ Header عند التمرير
    // ===================================================
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            header.style.background = 'rgba(12, 24, 16, 0.85)';
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
            header.style.borderBottom = '1px solid rgba(230, 203, 158, 0.1)';
        } else {
            header.style.background = 'transparent';
            header.style.padding = '30px 0';
            header.style.boxShadow = 'none';
            header.style.borderBottom = 'none';
        }
    });
});