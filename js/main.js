let $slides = $('.slides__item');
let $indContainer = $('.indicators');
let $indItems = $('.indicators__item');
let currentSlide = 0;
let carouselInterval = 2000;
const SPACE = ' ';
const LEFT_ONE = 'ArrowLeft';
const RIGHT_ONE = 'ArrowRight';
const PAUSE_FA = '<i class="fas fa-pause"></i>';
const PLAY_FA = '<i class="fas fa-play"></i>';

$indContainer.css('display', 'flex');
$('.controls').css('display', 'block'); 

let gotoNSlide = (n) => {
    $($slides[currentSlide]).toggleClass('active');
    $($indItems[currentSlide]).toggleClass('active');
    currentSlide = (n + $slides.length) % $slides.length;
    $($slides[currentSlide]).toggleClass('active');
    $($indItems[currentSlide]).toggleClass('active');
};
let gotoNextSlide = () => gotoNSlide(currentSlide + 1);
let gotoPrevSlide = () => gotoNSlide(currentSlide - 1);

let playbackStatus = true;
let $pausePlayBtn = $('.indicators__pause');
let $nextBtn = $('.controls__next');
let $prevBtn = $('.controls__prev');
let slideInterval = setInterval(gotoNextSlide, carouselInterval);

let pauseSlideShow = () => {
    if (playbackStatus) {
        $pausePlayBtn.html(PAUSE_FA);
        playbackStatus = !playbackStatus;
        clearInterval(slideInterval);
    }
};

let playSlideShow = () => {
    $pausePlayBtn.html(PLAY_FA);
    playbackStatus = !playbackStatus;
    slideInterval = setInterval(gotoNextSlide, carouselInterval);
};
let clickPausePlayBtn = () => playbackStatus ? pauseSlideShow() : playSlideShow();

let clickNextBtn = () => {
    pauseSlideShow();
    gotoNextSlide();
};
let clickPrevBtn = () => {
    pauseSlideShow();
    gotoPrevSlide();
};
$pausePlayBtn.on('click', clickPausePlayBtn);
$nextBtn.on('click', clickNextBtn);
$prevBtn.on('click', clickPrevBtn);

let clickIndicatorBtn = (e) => {
    pauseSlideShow();
    gotoNSlide(+e.target.getAttribute('data-slide-to'));
};

$indContainer.on('click', '.indicators__item', clickIndicatorBtn);

let pressKeyControl = (e) => {
    if (e.key === LEFT_ONE) clickPrevBtn();
    if (e.key === RIGHT_ONE) clickNextBtn();
    if (e.key === SPACE) clickPausePlayBtn();
};

$(document).on('keydown', pressKeyControl);
