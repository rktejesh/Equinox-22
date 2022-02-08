/* eslint-disable func-names */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-undef */
// @codekit-prepend "/vendor/hammer-2.0.8.js";

$(document).ready(function () {
    // DOMMouseScroll included for firefox support
    let canScroll = true
    let scrollController = null
    $(this).on('', (e) => {
        if (!($('.outer-nav').hasClass('is-vis'))) {
            e.preventDefault()
            const delta = (e.originalEvent.wheelDelta) ? -e.originalEvent.wheelDelta : e.originalEvent.detail * 20
            if (delta > 50 && canScroll) {
                canScroll = false
                clearTimeout(scrollController)
                scrollController = setTimeout(() => {
                    canScroll = true
                }, 800)
                updateHelper(1)
            } else if (delta < -50 && canScroll) {
                canScroll = false
                clearTimeout(scrollController)
                scrollController = setTimeout(() => {
                    canScroll = true
                }, 800)
                updateHelper(-1)
            }
        }
    })

    $('.side-nav li, .outer-nav li').click(function () {
        if (!($(this).hasClass('is-active'))) {
            const $this = $(this)
            const curActive = $this.parent().find('.is-active')
            const curPos = $this.parent().children().index(curActive)
            const nextPos = $this.parent().children().index($this)
            const lastItem = $(this).parent().children().length - 1

            updateNavs(nextPos)
            updateContent(curPos, nextPos, lastItem)
        }
    })

    $('.cta').click(() => {
        const curActive = $('.side-nav').find('.is-active')
        const curPos = $('.side-nav').children().index(curActive)
        const lastItem = $('.side-nav').children().length - 1
        const nextPos = lastItem - 1

        updateNavs(lastItem - 1)
        updateContent(curPos, nextPos, lastItem - 1)
    })

    // swipe support for touch devices

    // sync side and outer navigations
    function updateNavs(nextPos) {
        $('.side-nav, .outer-nav').children().removeClass('is-active')
        $('.side-nav').children().eq(nextPos).addClass('is-active')
        $('.outer-nav').children().eq(nextPos).addClass('is-active')
    }

    // update main content area
    function updateContent(curPos, nextPos, lastItem) {
        $('.main-content').children().removeClass('section--is-active')
        $('.main-content').children().eq(nextPos).addClass('section--is-active')
        $('.main-content .section').children().removeClass('section--next section--prev')

        if (curPos === lastItem && nextPos === 0 || curPos === 0 && nextPos === lastItem) {
            $('.main-content .section').children().removeClass('section--next section--prev')
        } else if (curPos < nextPos) {
            $('.main-content').children().eq(curPos).children()
                .addClass('section--next')
        } else {
            $('.main-content').children().eq(curPos).children()
                .addClass('section--prev')
        }

        if (nextPos !== 0 && nextPos !== lastItem) {
            $('.header--cta').addClass('is-active')
        } else {
            $('.header--cta').removeClass('is-active')
        }
    }

    function outerNav() {
        $('.header--nav-toggle').click(() => {
            $('.perspective').addClass('perspective--modalview')
            setTimeout(() => {
                $('.perspective').addClass('effect-rotate-left--animate')
            }, 25)
            $('.outer-nav, .outer-nav li, .outer-nav--return').addClass('is-vis')
        })

        $('.outer-nav--return, .outer-nav li').click(() => {
            $('.perspective').removeClass('effect-rotate-left--animate')
            setTimeout(() => {
                $('.perspective').removeClass('perspective--modalview')
            }, 400)
            $('.outer-nav, .outer-nav li, .outer-nav--return').removeClass('is-vis')
        })
    }

    function workSlider() {
        $('.slider--prev, .slider--next').click(function () {
            const $this = $(this)
            const curLeft = $('.slider').find('.slider--item-left')
            const curLeftPos = $('.slider').children().index(curLeft)
            const curCenter = $('.slider').find('.slider--item-center')
            const curCenterPos = $('.slider').children().index(curCenter)
            const curRight = $('.slider').find('.slider--item-right')
            const curRightPos = $('.slider').children().index(curRight)
            const totalWorks = $('.slider').children().length
            const $left = $('.slider--item-left')
            const $center = $('.slider--item-center')
            const $right = $('.slider--item-right')
            const $item = $('.slider--item')

            $('.slider').velocity({ opacity : 0 }, 400)

            setTimeout(() => {
                if ($this.hasClass('slider--next')) {
                    if (curLeftPos < totalWorks - 1 && curCenterPos < totalWorks - 1 && curRightPos < totalWorks - 1) {
                        $left.removeClass('slider--item-left').next().addClass('slider--item-left')
                        $center.removeClass('slider--item-center').next().addClass('slider--item-center')
                        $right.removeClass('slider--item-right').next().addClass('slider--item-right')
                    } else if (curLeftPos === totalWorks - 1) {
                        $item.removeClass('slider--item-left').first().addClass('slider--item-left')
                        $center.removeClass('slider--item-center').next().addClass('slider--item-center')
                        $right.removeClass('slider--item-right').next().addClass('slider--item-right')
                    } else if (curCenterPos === totalWorks - 1) {
                        $left.removeClass('slider--item-left').next().addClass('slider--item-left')
                        $item.removeClass('slider--item-center').first().addClass('slider--item-center')
                        $right.removeClass('slider--item-right').next().addClass('slider--item-right')
                    } else {
                        $left.removeClass('slider--item-left').next().addClass('slider--item-left')
                        $center.removeClass('slider--item-center').next().addClass('slider--item-center')
                        $item.removeClass('slider--item-right').first().addClass('slider--item-right')
                    }
                } else if (curLeftPos !== 0 && curCenterPos !== 0 && curRightPos !== 0) {
                    $left.removeClass('slider--item-left').prev().addClass('slider--item-left')
                    $center.removeClass('slider--item-center').prev().addClass('slider--item-center')
                    $right.removeClass('slider--item-right').prev().addClass('slider--item-right')
                } else if (curLeftPos === 0) {
                    $item.removeClass('slider--item-left').last().addClass('slider--item-left')
                    $center.removeClass('slider--item-center').prev().addClass('slider--item-center')
                    $right.removeClass('slider--item-right').prev().addClass('slider--item-right')
                } else if (curCenterPos === 0) {
                    $left.removeClass('slider--item-left').prev().addClass('slider--item-left')
                    $item.removeClass('slider--item-center').last().addClass('slider--item-center')
                    $right.removeClass('slider--item-right').prev().addClass('slider--item-right')
                } else {
                    $left.removeClass('slider--item-left').prev().addClass('slider--item-left')
                    $center.removeClass('slider--item-center').prev().addClass('slider--item-center')
                    $item.removeClass('slider--item-right').last().addClass('slider--item-right')
                }
            }, 400)

            $('.slider').velocity({ opacity : 1 }, 400)
        })
    }

    function transitionLabels() {
        $('.work-request--information input').focusout(function () {
            const textVal = $(this).val()

            if (textVal === '') {
                $(this).removeClass('has-value')
            } else {
                $(this).addClass('has-value')
            }

            // correct mobile device window position
            window.scrollTo(0, 0)
        })
    }
    outerNav()
    workSlider()
    transitionLabels()
})
