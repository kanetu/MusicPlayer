window.addEventListener('DOMContentLoaded', function(){

    var playButton = document.getElementById("play-pause");
    var nextButton = document.getElementById("next-audio");
    var prevButton = document.getElementById("prev-audio");
    var musicList = document.getElementById("list-music");
    var albumArt = document.getElementById("album-art");
    var playWhenMusicEnd = null;
    var audio = new Audio();
    var currentIndexSong = 0;

    var songList = [
        {
            artis: "Den-VuThanhDong",
            name: "Anh Đếch Cần Gì Nhiều Ngoài Em",
            url: "Musics/AnhDechCanGiNhieuNgoaiEm-DenVuThanhDong-5749937.mp3",
		    picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
        },
        {
            artis: "MIN-Den-JustaTee",
            name: "Vi Yeu Cu Dam Dau",
            url: "Musics/Vi-Yeu-Cu-Dam-Dau-MIN-Den-JustaTee.mp3",
		    picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
        },
		{
            artis: "2T-Van",
            name: "Liệu Giờ",
            url: "Musics/Lieu-Gio-2T-Van.mp3",
		    picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
        },
    ];

    function effectTrigger(){
        if(!audio.paused){
            albumArt.classList.add('active');
            playButton.children[0].src="Background/pause.svg"
        }else{
            albumArt.classList.remove('active');
            playButton.children[0].src="Background/play.svg"

        }
    }

    function init(){
        audio.src = songList[currentIndexSong].url;
        songList.map( (item, index) => {
            let song = document.createElement("li");
            song.innerText  = item.name;
            song.addEventListener('click', () => chooseSong(index));
            musicList.appendChild(song)
        })
    }

    function nextSong(){
        if( currentIndexSong < songList.length - 1 ){
            ++currentIndexSong;
            audio.src = songList[currentIndexSong].url;
            audio.play();
            effectTrigger();
        }else{
            currentIndexSong = 0;
            audio.src = songList[currentIndexSong].url;
            audio.play();
            effectTrigger();
        }
    }

    function prevSong(){
        if( currentIndexSong > 0){
            --currentIndexSong;
            audio.src = songList[currentIndexSong].url;
            audio.play();
            effectTrigger();
        }else{
            currentIndexSong = songList.length - 1;
            audio.src = songList[currentIndexSong].url;
            audio.play();
            effectTrigger();
        }
    }

    function chooseSong(index){
        currentIndexSong = index;
        audio.src = songList[currentIndexSong].url;
        audio.play();
        effectTrigger();
    }

    function continuePlayMusicAfterEnded(flag) {
        if(flag){
            playWhenMusicEnd = setInterval(() => {
                if(audio.paused) nextSong()
            }, 2000)
        }else{
            clearInterval(playWhenMusicEnd);
        }
    }

    playButton.addEventListener('click', () => {
        if(audio.paused){
            audio.play();
            effectTrigger();
            continuePlayMusicAfterEnded(true);
        }else{
            audio.pause();
            effectTrigger();
            continuePlayMusicAfterEnded(false);
        }
    });

    nextButton.addEventListener('click', () => nextSong())
    prevButton.addEventListener('click', () => prevSong())


    init();

   

    
});