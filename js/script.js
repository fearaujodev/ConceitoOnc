$(document).ready(function () {
    const $header = $('header');
    const $sections = $('section');
    const $navItems = $('#nav_list .nav-item');
    const $mobileNavItems = $('#mobile_menu .nav-item a');
    const headerHeight = $header.outerHeight();

    /* ==========================================================
       HEADER – sombra + cor ao rolar
    ========================================================== */
    function updateHeaderShadow(scrollPosition) {
        $header.css('box-shadow', scrollPosition <= 0 ? 'none' : '5px 1px 5px rgba(0, 0, 0, 0.1)');
    }

    function updateHeaderBackground(scrollPosition) {
        if (scrollPosition > 10) {
            $header.addClass('scrolled');
        } else {
            $header.removeClass('scrolled');
        }
    }

    /* ==========================================================
       DESTACAR MENU ATUAL (somente se houver seções)
    ========================================================== */
    function highlightActiveSection() {
        if ($sections.length === 0) return; // páginas sem seções

        const scrollPosition = $(window).scrollTop() + headerHeight + 1;

        $sections.each(function (i) {
            const sectionTop = $(this).offset().top;
            const sectionBottom = sectionTop + $(this).outerHeight();

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                $navItems.removeClass('active').eq(i).addClass('active');
            }
        });
    }

    /* ==========================================================
       PARALLAX NO BANNER (somente se existir #inicio)
    ========================================================== */
    $(window).on('scroll', function () {
        let scroll = $(this).scrollTop();

        if ($('#inicio').length) {
            $('#inicio').css('background-position', 'center calc(100% + ' + scroll * 0.2 + 'px)');
        }
    });

    /* ==========================================================
       MENU HOVER SUAVE
    ========================================================== */
    $navItems.on('mouseenter', function () {
        $(this).css({
            transform: 'translateY(-3px)',
            transition: '0.2s ease'
        });
    }).on('mouseleave', function () {
        $(this).css({
            transform: 'translateY(0)',
        });
    });

    /* ==========================================================
       MENU MOBILE – abrir/fechar
    ========================================================== */
    $('#mobile_btn').on('click', function () {
        $('#mobile_menu').toggleClass('active');
        $(this).find('i').toggleClass('fa-x');

        $('#mobile_menu').css({
            transition: 'all .3s ease',
        });
    });

    /* ==========================================================
       MENU MOBILE — LINKS FUNCIONANDO EM TODAS AS PÁGINAS
    ========================================================== */
    $mobileNavItems.on('click', function (e) {
        const href = $(this).attr('href');

        // Fecha o menu
        $('#mobile_menu').removeClass('active');
        $('#mobile_btn i').removeClass('fa-x');

        // Se for âncora (#), faz scroll suave
        if (href.startsWith('#')) {
            e.preventDefault();

            const target = $(href);

            if (target.length) {
                $('html, body').stop().animate({
                    scrollTop: target.offset().top - headerHeight
                }, 800, 'easeOutExpo');
            }
        } 
        // Se não for âncora, deixa redirecionar normalmente (ex: produtos.php)
        else {
            return;
        }
    });

    /* ==========================================================
       CLIQUE DESKTOP — scroll suave só se for âncora
    ========================================================== */
    $('a[href^="#"]').on('click', function (e) {
        const target = $(this).attr('href');

        if ($(target).length === 0) return; // Previna erros em páginas sem essas seções

        e.preventDefault();

        const offset = $(target).offset().top - headerHeight;

        $('html, body').stop().animate({
            scrollTop: offset
        }, 800, 'easeOutExpo');
    });

    /* ==========================================================
       EVENTO DE ROLAGEM
    ========================================================== */
    $(window).on('scroll', function () {
        const scrollPosition = $(window).scrollTop();
        updateHeaderShadow(scrollPosition);
        updateHeaderBackground(scrollPosition);
        highlightActiveSection();
    });

    /* ==========================================================
       ScrollReveal
    ========================================================== */
    const sr = ScrollReveal({
        duration: 700,
        distance: '40px',
        easing: 'ease-out',
        reset: false,
    });

    sr.reveal('#cta-one', { origin: 'left', delay: 100 });
    sr.reveal('.prato', { origin: 'bottom', interval: 150 });
    sr.reveal('#cta-two', { origin: 'right', duration: 900 });
    sr.reveal('.btn-saiba-mais', { origin: 'bottom', distance: '20px', delay: 300 });
});
