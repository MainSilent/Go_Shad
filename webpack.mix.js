const mix = require('laravel-mix')

mix.react('src/index.js', 'public/assets/js/script.js')
    .styles([
        'src/css/index.css',
        'src/css/login.css',
        'src/css/chats.css'
    ], 'public/assets/css/style.css');;