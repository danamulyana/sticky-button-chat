const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)

    setTimeout(function () {
      window.scrollTo(0, 1)
    }, 0)

    const chat = document.querySelector('.con-chat')
    const icon = chat.querySelector('.con-icon')
    let activeTouch = false
    let x = 0
    let y = 0
    let time = 0

    let interval = null

    icon.addEventListener('touchend', () => {
        if (time <= 10) {
            chat.classList.toggle('open')
        }
        time = 0
        clearInterval(interval)
    })

    icon.addEventListener('touchstart', (evt) => {
        interval = setInterval(() => {
            time++
        }, 10)
    })
    icon.addEventListener('touchend', (evt) => {
        chat.style.transition = 'all .3s ease'
        if (x < window.innerWidth / 2) {
            chat.style.left = '20px'
        } else {
            chat.style.left = `${window.innerWidth - 20}px`
        }
        setTimeout(() => {
            chat.style.transition = ''
        }, 250);
        chat.classList.remove('move')
    })
    icon.addEventListener('touchmove', (evt) => {
        x = evt.touches[0].clientX
        y = evt.touches[0].clientY
        chat.style.left = `${x}px`
        chat.style.top = `${y}px`
        chat.classList.add('move')
        chat.classList.remove('open')
        if (x < window.innerWidth / 2) {
            chat.classList.remove('openRight')
        } else {
            chat.classList.add('openRight')
        }
        if (y < window.innerHeight / 2) {
            chat.classList.remove('openTop')
        } else {
            chat.classList.add('openTop')
        }
    })

    document.addEventListener('click', (evt) => {
        if (!evt.target.closest('.con-chat')) {
            chat.classList.remove('open')
        }
    })

    const users = [...document.querySelectorAll('.sms'), ...document.querySelectorAll('.con-avatars .con-img')]
    users.forEach((item) => {
        item.addEventListener('click', () => {
            chat.classList.add('openChat')
        })
    })

    document.querySelector('.back').addEventListener('click', () => {
        chat.classList.remove('openChat')
    })