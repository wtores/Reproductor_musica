
// Reproductor
document.addEventListener("DOMContentLoaded", () => {
    const playlist = {
        feid: [
            {
                title: "Ferxxo 100",
                Image: "portada/Ferxxo_100.png",
                src: "canciones/cancion1-ferxxo_100.mp3"
            },
            {
                title: "Feliz Cumpleaños Ferxxo",
                Image: "img/ferxxo.jpg",
                src: "canciones/cancion2-feliz cumpleaños.mp3"
            },
            {
                title: "Chorrito Pa Las Animas",
                Image: "img/Chorritos pa las Animas.jpg",
                src: "canciones/cancion3-chorrito pa las animas.mp3"
            },
            {
                title: "Classy 101",
                Image: "img/Classy 101.jpg",
                src: "canciones/cancion4- classy 101.mp3"
            },
            {
                title: "Si Te La Encuentras Por Ahí",
                Image: "img/Si te la Encuentras por ahi.jpg",
                src: "canciones/cancion5-si te la encuentras por ahí.mp3"
            },
            {
                title: "Porfa",
                Image: "img/Porfa.jpg",
                src: "canciones/cancion6-porfa.mp3"
            },
            {
                title: "Normal",
                Image: "img/Normal.jpg",
                src: "canciones/cancion7-normal.mp3"
            },
            {
                title: "Fumeteo",
                Image: "img/Fumeteo.jpg",
                src: "canciones/cancion8-fumeteo.mp3"
            }
        ],
        Bad_Bunny: [
            {
                title: "Si estuviésemos juntos",
                Image: "img/si estuvieramos juntos.jpg",
                src: "canciones/cancion_1-si estuviesemos juntos.mp3"
            },
            {
                title: "Thunder y Lightning ",
                Image: "img/thunder.jpg",
                src: "canciones/cancion_1-thunder y lightning .mp3"
            },
            
        ]
    };
    const startButton = document.getElementById("start-button");
    const welcomeSection = document.getElementById("welcome-section");
    const playerSection = document.getElementById("player-section");
    const viewPlaylistBtn = document.getElementById("view-playlist-btn");
    const playlistSection = document.getElementById("playlist-section");
    const closePlaylistBtn = document.getElementById("close-playlist-btn");
    const playlistItems = document.getElementById("playlist-items");

    startButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevenir el comportamiento por defecto del enlace
        welcomeSection.style.display = "none";
        playerSection.style.display = "block";
    });

    viewPlaylistBtn.addEventListener("click", () => {
        playlistSection.style.display = "block";
        populatePlaylist();
    });

    closePlaylistBtn.addEventListener("click", () => {
        playlistSection.style.display = "none";
    });
    
    function populatePlaylist() {
        playlistItems.innerHTML = ""; // Limpiar lista actual
        currentPlaylist.forEach((song, index) => {
            const li = document.createElement("li");
            
            // Crear contenedor para la imagen y el título
            const songContainer = document.createElement("div");
            songContainer.classList.add("song-container");
            
            // Crear imagen
            const img = document.createElement("img");
            img.classList.add("song-image");
            img.src = song.Image || 'default-image.png'; // Usa una imagen por defecto si no hay imagen especificada
            
            // Crear título
            const title = document.createElement("span");
            title.textContent = song.title;
            
            songContainer.appendChild(img);
            songContainer.appendChild(title);
            
            li.appendChild(songContainer);
            li.dataset.index = index; // Almacena el índice de la canción
            
            li.addEventListener("click", () => {
                loadSong(index);
                playlistSection.style.display = "none"; // Ocultar lista de reproducción
            });
            
            playlistItems.appendChild(li);
        });
    }

    function loadSong(index) {
        const song = currentPlaylist[index];
        audioPlayer.src = song.src;
        currentSongTitle.textContent = song.title;
        audioPlayer.play();
        togglePlayPauseIcons(true); // Muestra el icono de pausa
    }

    const audioPlayer = document.getElementById("audio-player");
    const playPauseBtn = document.getElementById("play-pause-btn");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const randomBtn = document.getElementById("random-btn");
    const currentSongTitle = document.getElementById("current-song");
    const playlistSelector = document.getElementById("playlist");
    const progressContainer = document.getElementById("progress");
    const currentTimeElement = document.getElementById("current-time");
    const durationElement = document.getElementById("duration");

    // Iconos de reproducción y pausa
    const playIcon = document.getElementById("play-icon");
    const pauseIcon = document.getElementById("pause-icon");

    let currentPlaylist = playlist.feid;
    let currentSongIndex = 0;

    function loadSong(index) {
        const song = currentPlaylist[index];
        audioPlayer.src = song.src;
        currentSongTitle.textContent = song.title;
    
        // Actualizar la imagen de portada
        const coverImage = document.getElementById("cover-image");
        coverImage.src = song.Image || 'default-cover-image.png'; // Usa una imagen por defecto si no hay imagen especificada
    
        audioPlayer.play();
        togglePlayPauseIcons(true); // Muestra el icono de pausa
    }
    function loadRandomSong() {
        const randomIndex = Math.floor(Math.random() * currentPlaylist.length);
        loadSong(randomIndex);
    }

    playPauseBtn.addEventListener("click", () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            togglePlayPauseIcons(true);
        } else {
            audioPlayer.pause();
            togglePlayPauseIcons(false);
        }
    });

    prevBtn.addEventListener("click", () => {
        currentSongIndex = (currentSongIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
        loadSong(currentSongIndex);
    });

    nextBtn.addEventListener("click", () => {
        currentSongIndex = (currentSongIndex + 1) % currentPlaylist.length;
        loadSong(currentSongIndex);
    });

    randomBtn.addEventListener("click", loadRandomSong);

  

    playlistSelector.addEventListener("change", (event) => {
        const selectedPlaylist = event.target.value;
        currentPlaylist = playlist[selectedPlaylist];
        currentSongIndex = 0;
        loadSong(currentSongIndex);
    });

    audioPlayer.addEventListener("timeupdate", () => {
        const { currentTime, duration } = audioPlayer;
        const progressPercent = (currentTime / duration) * 100;
        progressContainer.style.width = `${progressPercent}%`;

        currentTimeElement.textContent = formatTime(currentTime);
        durationElement.textContent = formatTime(duration);
    });

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    document.querySelector(".progress-container").addEventListener("click", (e) => {
        const width = e.currentTarget.offsetWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;

        audioPlayer.currentTime = (clickX / width) * duration;
    });

    function togglePlayPauseIcons(isPlaying) {
        if (isPlaying) {
            playIcon.style.display = "none";
            pauseIcon.style.display = "block";
        } else {
            playIcon.style.display = "block";
            pauseIcon.style.display = "none";
        }
    }

    // Cargar la primera canción al inicio
    loadSong(currentSongIndex);
});
    
