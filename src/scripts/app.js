require.context('../images/', true, /\.(jpe?g|png|gif|svg)$/);

// import OverlayScrollbars from 'overlayscrollbars';
// import 'overlayscrollbars/css/OverlayScrollbars.min.css';
import '../styles/app.scss'
import Func from './func'

window['$']     = $;
window['Func']  = Func;

$(function() {

// 桌機版縮放

    // const mqDesktop = window.matchMedia('(min-width: 1081px)');

    // $(window).on('resize', () => {
    //     if (device.desktop()) {
    //         $('#container').height($(window).height());
    //         Func.scaleContainer(mqDesktop.matches, $('#main, .pop-main'));
    //     }
    // })

    // if (device.desktop()) {
    //     $('#container, .pop-container').css('overflow', 'hidden')
    //     $('#container').height($(window).height());
    //     Func.scaleContainer(mqDesktop.matches, $('#main, .pop-main'));
    // }

// Menu GA

    // $('#menu nav li a').on('click', function(e) {

    //     e.preventDefault();

    //     var category = 'menu';
    //     var label;
    //     var name = $(this).attr('class');
    //     var href = $(this).attr('href');
    //     Func.sendEvent(category, 'click', label);

    // });

// 開啟/關閉 Menu

    // $('#header .menu-toggler').on('click', function(e) {

    //     e.preventDefault();

    //     if (!$(this).hasClass('open')) {
    //         // 關 => 開
    //         Func.lockContainer();

    //         if ($('#rule').length === 1) {
    //             Func.sendEvent('rule', 'click', 'rule_menu');
    //         }

    //     } else {
    //         // 開 => 關
    //         Func.unlockContainer();
    //     }

    //     $(this).toggleClass('open');
    //     $('#menu').toggle();

    // });

// 點擊 [Popup 叉叉] 或 [btn-close-pop 按鈕] 來關閉 popup

    $('.pop-close, .btn-close-pop').on('click', (e) => {
        e.preventDefault();
        Func.closePopUp();
    });

});
