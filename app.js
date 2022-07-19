const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $('.player');
const playList = $('.playlist-music')
const titleHeading = $('.song .title')
const authorHeading = $('.song .author')
const cdThumd = $('.cd-thumbnail')
const audio = $('#audio')
const togglePlay = $('.play-pause')
const volumeIcon = $('#volume-icon');
const volumeBar = $('.volume-bar');
const progressBar = $('.progress-bar');
const nextBtn = $('.next');
const prevBtn = $('.prev');
const repeatBtn = $('.repeat');
const randomBtn = $('.random');
const listMusic = $('.playlist')
const openPlayList = $('.open-play-list')
const closePlaylist = $('.close-playlist')
const playListItem = $('.playlist-item');


let isHoldingProgress = false;
let isHoldingVolume = false;

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,


    songs: [
        {
            name: 'Anh Sẽ Đón Em',
            singer: 'Nguyên ft.Trang',
            path: './music/song1.mp3',
            image: './img/img_song1.jpg'
        },
        {
            name: 'Thích Em Hơi Nhiều',
            singer: 'Wren Evans',
            path: './music/song2.mp3',
            image: './img/img_song2.jpg'
        },
        {
            name: 'Marry Me',
            singer: 'Bruno Mars',
            path: './music/song3.mp3',
            image: './img/img_song3.jpg'
        },
        {
            name: 'Love Is Gone',
            singer: 'Slander',
            path: './music/song4.mp3',
            image: './img/img_song4.jpg'
        },
        {
            name: 'The Playal',
            singer: 'Soobin Hoàng Sơn',
            path: './music/song5.mp3',
            image: './img/img_song5.jpg'
        },
        {
            name: 'Tell Ur Mom',
            singer: 'Winno',
            path: './music/song6.mp3',
            image: './img/img_song6.jpg'
        },
        {
            name: 'Trời Giấu Trời Mang Đi',
            singer: 'AMEE',
            path: './music/song7.mp3',
            image: './img/img_song7.jpg'
        },
        {
            name: 'Love You Still',
            singer: 'Tyler Shaw',
            path: './music/song8.mp3',
            image: './img/img_song8.jpg'
        },
        {
            name: 'I Do',
            singer: '911 Band',
            path: './music/song9.mp3',
            image: './img/img_song9.jpg'
        },
        {
            name: 'Memories',
            singer: 'Maroon 5',
            path: './music/song10.mp3',
            image: './img/img_song10.jpg'
        },
        {
            name: 'Lạc Vào Trong Mơ',
            singer: 'Simon C ft.Wuy',
            path: './music/song11.mp3',
            image: './img/img_song11.jpg'
        },
        {
            name: 'We Dont Talk Anymore',
            singer: 'Charlie Puth & Selena Gomez',
            path: './music/song12.mp3',
            image: './img/img_song12.jpg'
        },
        {
            name: 'Something Just Like This',
            singer: 'The Chainsmokers & Coldplay',
            path: './music/song13.mp3',
            image: './img/img_song13.jpg'
        },
        {
            name: 'Photograph',
            singer: 'Ed Sheeran',
            path: './music/song14.mp3',
            image: './img/img_song14.jpg'
        },
        {
            name: 'thinking out loud',
            singer: 'Ed Sheeran',
            path: './music/song15.mp3',
            image: './img/img_song15.jpg'
        },
        {
            name: 'Waiting For Love',
            singer: 'Avicii',
            path: './music/song16.mp3',
            image: './img/img_song16.jpg'
        },
        {
            name: 'Mirrors',
            singer: 'Justin Timberlake',
            path: './music/song17.mp3',
            image: './img/img_song17.jpg'
        },
        {
            name: 'Changes',
            singer: 'XXTenations',
            path: './music/song18.mp3',
            image: './img/img_song18.jpg'
        },
        {
            name: 'Let Her Go',
            singer: 'Passenger',
            path: './music/song19.mp3',
            image: './img/img_song19.jpg'
        },
        {
            name: 'Ngày Đầu Tiên',
            singer: 'Đức Phúc',
            path: './music/song20.mp3',
            image: './img/img_song20.jpg'
        },
    ],

    timerFormat(duration) {
        const rounded = Math.floor(duration);
        return `${Math.floor(rounded/60) >= 10 ? Math.floor(rounded/60) : '0' + Math.floor(rounded/60)}:${rounded%60 >= 10 ? rounded%60 : '0' + rounded%60}`;
    },

    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="playlist-item ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                <div class="playlist-music-thumb" 
                    style="background-image: url('${song.image}')">
                </div>
                <div class="song-info">
                    <h3 class="song-title">${song.name}</h3>
                    <p class="song-author">${song.singer}</p>
                </div>
            </div>
            `
        })
        playList.innerHTML = htmls.join('')
    },

    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            },
        })
    },

    handleEvent: function() {
        const _this = this
        const thumbnailAnimation = cdThumd.animate([{
            transform: 'rotate(360deg)'
        }], {
            duration: 8000,
            iterations: Infinity
        })
        thumbnailAnimation.pause();
        audio.onplay = () => {
            togglePlay.innerText = 'pause_circle';
            thumbnailAnimation.play();
        }
        audio.onpause = () => {
            togglePlay.innerText = 'play_circle';
            thumbnailAnimation.pause();
        }
        togglePlay.onclick = () => {
            audio.paused ? audio.play() : audio.pause();
        }
        audio.onloadedmetadata = () => {
            $('#begin').innerText = this.timerFormat(audio.currentTime);
            $('#end').innerText = this.timerFormat(audio.duration);
        }
        audio.ontimeupdate = () => {
            let progressBarWidth = (audio.currentTime/audio.duration)*100;
            $('#begin').innerText = this.timerFormat(audio.currentTime);
            $('.progress').style.width = `${progressBarWidth}%`;
        }
        audio.onvolumechange = () => {
            if(audio.muted) volumeIcon.innerHTML = 'volume_off';
            else volumeIcon.innerText = audio.volume >= 0.5 ? 'volume_up' : 
                                        audio.volume < 0.05 ? 'volume_mute' : 'volume_down';
            $('.volume').style.width = `${audio.volume*100}%`;
        }
        volumeIcon.onclick = () => {
            audio.muted = !audio.muted;
        }
        volumeBar.onmousedown = (e) => {
            isHoldingVolume = true;
            audio.volume = e.offsetX/e.target.offsetWidth;
        }
        volumeBar.onmousemove = (e) => {
            if(isHoldingVolume) audio.volume = e.offsetX/e.target.offsetWidth;
        }
        progressBar.onmousedown = (e) => {
            isHoldingProgress = true;
            audio.currentTime = (e.offsetX/e.target.offsetWidth)*audio.duration;
        }
        progressBar.onmousemove = (e) => {
            if(isHoldingProgress) audio.currentTime = (e.offsetX/e.target.offsetWidth)*audio.duration;
        }
   
        window.onmouseup = () => {
            isHoldingProgress = false;
            isHoldingVolume = false;
        }
        window.onkeydown = (e) => {
            switch (e.keyCode) {
                case 32:
                    e.preventDefault();
                    togglePlay.click();
                    break;
                case 37:
                    e.preventDefault();
                    audio.currentTime -= 5;
                    break;
                case 38:
                    e.preventDefault();
                    audio.volume + 0.05 < 1 ? audio.volume += 0.05 : audio.volume = 1;
                    break;
                case 39:
                    e.preventDefault();
                    audio.currentTime += 5;
                    break;
                case 40:
                    e.preventDefault();
                    audio.volume - 0.05 > 0 ? audio.volume -= 0.05 : audio.volume = 0;
                    break;
            }
        }
        nextBtn.onclick = function() {
            if (_this.isRandom) {
                _this.randomSong();
            } else {
                _this.nextSong()
            }
            audio.play();
            _this.render();
        }
        prevBtn.onclick = function() {
            if (_this.isRandom) {
                _this.randomSong();
            } else {
                _this.prevSong()
            }            
            audio.play();
            _this.render();
        }
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom;
            randomBtn.classList.toggle("active", _this.isRandom);
            repeatBtn.classList.remove("active");
        }
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat
            repeatBtn.classList.toggle("active", _this.isRepeat);
            randomBtn.classList.remove("active");
        }
        audio.onended = function() {
            if(_this.isRepeat) {
                audio.play();
            } else {
                nextBtn.click();
            }
        }
        openPlayList.onclick = () => {
            listMusic.classList.add('showlist');
        }
        closePlaylist.onclick = () => {
            listMusic.classList.remove('showlist');
        }
        playList.onclick = (e) => {
            const songNode = e.target.closest('.playlist-item:not(.active)')
            if (songNode) {
                _this.currentIndex = Number(songNode.dataset.index);
                _this.loadCurrentSong()
                _this.render()
                audio.play()
            }
        }
    },

    loadCurrentSong: function() {
        titleHeading.textContent = this.currentSong.name
        authorHeading.textContent = this.currentSong.singer
        cdThumd.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path
    },

    nextSong: function() {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },

    prevSong: function() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },

    randomSong: function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        }
        while (newIndex ===  this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },

    start: function() {
        this.defineProperties()
        this.render()
        this.loadCurrentSong()
        this.handleEvent()
    }
}

app.start()
