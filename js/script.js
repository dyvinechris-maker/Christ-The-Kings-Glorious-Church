// --- Dark Mode Logic ---
const themeToggleBtn = $('#theme-toggle');
const body = $('body');
const icon = themeToggleBtn.find('i');

// Check local storage
if (localStorage.getItem('theme') === 'dark') {
    body.addClass('dark-mode');
    icon.removeClass('fa-moon-o').addClass('fa-sun-o text-warning');
}

themeToggleBtn.on('click', function() {
    body.toggleClass('dark-mode');
    if (body.hasClass('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        icon.removeClass('fa-moon-o').addClass('fa-sun-o text-warning');
    } else {
        localStorage.setItem('theme', 'light');
        icon.removeClass('fa-sun-o').addClass('fa-moon-o').removeClass('text-warning');
    }
});

// --- Active Link Highlighting ---
const currentPath = window.location.pathname.split("/").pop();
$('.navbar-nav li a').each(function() {
    const linkPath = $(this).attr('href');
    if (linkPath === currentPath) {
        $(this).parent().addClass('active');
    }
});

// --- Service Countdown ---
function updateCountdown() {
    const now = new Date();
    const nextSunday = new Date();
    
    // Calculate next Sunday 9:00 AM
    nextSunday.setDate(now.getDate() + ((7 - now.getDay()) % 7));
    nextSunday.setHours(9, 0, 0, 0);
    
    // If it's Sunday past 9am, move to next week
    if (now.getDay() === 0 && now.getHours() >= 9) {
        nextSunday.setDate(nextSunday.getDate() + 7);
    }
    // If today is not Sunday but nextSunday calculated to today (0 diff) 
    // Logic fix: (7-d)%7 gives 0 if d=0. 
    if (now > nextSunday) {
         nextSunday.setDate(nextSunday.getDate() + 7);
    }

    const diff = nextSunday - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    $('#days').text(days);
    $('#hours').text(hours);
    $('#minutes').text(minutes);
    $('#seconds').text(seconds);
}

// Only run countdown if element exists
if ($('#countdown').length) {
    setInterval(updateCountdown, 1000);
    updateCountdown();
}

// --- Navbar Scroll Effect ---
$(window).scroll(function() {
    if ($(this).scrollTop() > 50) {
        $('.navbar').css('box-shadow', '0 2px 10px rgba(0,0,0,0.1)');
    } else {
        $('.navbar').css('box-shadow', 'none');
    }
});

// --- Simple Scroll Animation Trigger ---
$(window).on('scroll load', function() {
    $('.fade-in').each(function() {
        var bottom_of_object = $(this).offset().top + 50;
        var bottom_of_window = $(window).scrollTop() + $(window).height();
        
        if( bottom_of_window > bottom_of_object ){
            $(this).css({'opacity':'1', 'transform':'translateY(0)'});
        }
    });
});

// Trigger animations css manually for elements already in view if script loads late
$('.fade-in').css('transition', 'all 0.8s ease');