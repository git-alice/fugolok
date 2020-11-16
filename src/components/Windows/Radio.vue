<template lang="pug">
  Window(:window-name="this.$options.name" :init-options="initOptions")
    template(v-slot:content)
      fieldset
          legend <span v-tooltip="{content: 'This is a player for our radio. Use the left arrow, right arrow, and space bar to switch music.', boundariesElement: 'body', trigger: 'hover'}">Radio</span>
          #player
            div.d-flex.flex-column.justify-content-center.align-items-center
              .control.mt-1
                .info.w-100.d-flex.justify-content-between
                  div
                    span.amplitude-current-time.time-container
                    span.mr-1.ml-1 /
                    span.amplitude-duration-time.time-container
                  div
                    marquee {{ amplitude.getActiveSongMetadata().artist + ' - ' + amplitude.getActiveSongMetadata().name}}
                progress#song-played-progress.amplitude-song-played-progress
                progress#song-buffered-progress.amplitude-buffered-progress(value='0')
                .mt-2.control-container.d-flex.flex-row.justify-content-between.align-content-center
                  button(@click="shuffle" :class="isShuffle ? 'active' : ''") shuffle
                  button(@click="prev") prev
                  button(@click="play" :class="playing ? 'active' : ''") {{ playing ? 'Pause' : 'Play' }}
                  button(@click="next") next
                  button(@click="repeat" :class="isRepeat ? 'active' : ''") repeat

      p Playlist:
      ul#playlist
        li.song(v-for="(song, index) in amplitude.getSongsState()" :data-amplitude-song-index="song.index" :class="songIsActive(song) ? 'active__song': 'inactive__song'" @click="playSong(song)")
          div {{ song.name }} / {{ song.artist }}
    template(v-slot:status)
      div.text-left {{ amplitude.getSongsState().length }} track(s).
</template>

<script>
import {Howl, Howler} from 'howler';
import Amplitude from 'amplitudejs'

import Window from "@/components/Elements/Window/Window";
import Button from "@/components/Elements/Button/Button";

export default {
  name: 'Radio',
  data() {
      return {
        amplitude: undefined,
        playing: false,
        isShuffle: false,
        isRepeat: false,
        songs: [
          {
            "name": "Across The Wire",
            "artist": "Calexico",
            "album": "1",
            "url": "https://archive.org/download/calexico2006-12-02..flac16/calexico2006-12-02d1t02.mp3",
          },
          {
            "name": "Cold Roses",
            "artist": "Ryan Adams & The Cardinals",
            "album": "1",
            "url": "https://archive.org/download/ra2007-07-21/ra2007-07-21d1t05_64kb.mp3",
          },
          {
            "name": "Married Girl",
            "artist": "The Slackers",
            "album": "1",
            "url": "https://archive.org/download/slac2002-02-15/slac2002-02-15d1t07_64kb.mp3",
          },
          {
            "name": "Saturday Night",
            "artist": "Blitzen Trapper",
            "album": "2",
            "url": "https://archive.org/download/blitzentrapper2009-02-24.flac16/blitzentrapper2009-02-24t02_64kb.mp3",
          },
          {
            "name": "Feel Us Shaking",
            "artist": "The Samples",
            "album": "2",
            'url': 'https://archive.org/download/samples2003-11-21.flac16/samples2003-11-21d2t04.mp3'
          },
          {
            "name": "American Car",
            "artist": "Mike Doughty",
            "album": "2",
            'url': 'https://archive.org/download/mikedoughty2004-06-16.flac16/d1t13.mp3'
          }
        ]
      }
  },
  props: ['initOptions'],
  components: {Button, Window },
  methods: {
    repeat() {
      this.isRepeat = !this.isRepeat
      this.amplitude.setRepeat(this.isRepeat)
    },
    shuffle() {
      this.isShuffle = !this.isShuffle
      this.amplitude.setShuffle(this.isShuffle)
    },
    next() {
      this.amplitude.next()
    },
    prev() {
      this.amplitude.prev()
    },
    play() {
      if ((this.amplitude.getPlayerState() === 'paused') || (this.amplitude.getPlayerState() === 'stopped')) {
        this.amplitude.play()
        this.playing = true;
      } else {
        this.amplitude.pause()
        this.playing = false;
      }
    },
    songIsActive(song) {
      if (song.index === this.amplitude.getActiveSongMetadata().index) {
        return true
      } else {
        return false
      }
    },
    playSong(song) {
      if (this.songIsActive(song)) {
        if (this.amplitude.getPlayerState() === 'paused') {
          this.amplitude.play()
        } else {
          this.amplitude.pause()
        }
      } else {
        this.amplitude.playSongAtIndex(song.index);
      }
    }
  },
  mounted() {
    /*
      Handles a click on the song played progress bar.
    */
    document.getElementById('song-played-progress').addEventListener('click', function( e ){
      let offset = this.getBoundingClientRect();
      let x = e.pageX - offset.left;

      Amplitude.setSongPlayedPercentage( ( parseFloat( x ) / parseFloat( this.offsetWidth) ) * 100 );
    });

  },
  created() {
    window.onkeydown = function(e) {
      return !(e.keyCode == 32);
    };

    Amplitude.init({
      "bindings": {
        37: 'prev',
        39: 'next',
        32: 'play_pause'
      },
      songs: this.songs,
      callbacks: {
        pause: () => {
          this.playing = false
        },
        play: () => {
          this.playing = true
        },
      }
    });

    this.amplitude = Amplitude;
  },
  beforeDestroy: function () {
    Amplitude.stop()
  }
}
</script>

<style lang="scss">
#player {
  margin: auto;
  padding: 0;

  .info {
    font-size: 11px;
  }

  progress {
    min-width: 400px;
  }

  progress[value] {
    margin: 0 auto;
    /* Reset the default appearance */
    -webkit-appearance: none;
    appearance: none;

    &::-webkit-progress-value {
      background-color: whitesmoke;
    }
  }
   progress:not([value]) {
     margin: 0 auto;
     background-color: black;
     /* Reset the default appearance */
     -webkit-appearance: none;
     appearance: none;
   }

  .amplitude-volume-slider {
    width: 100px;
  }

  #song-buffered-progress[value] {
    height: 1px;
    background: whitesmoke;
  }
}

#playlist {
  padding-left: 0;

  .song {
    min-width: 400px;
    padding: 0.5rem;
    margin-bottom: 0.5rem;

    &:hover,& *:hover {
      cursor: pointer;
    }
  }

  .active__song {
    border: 1px solid black;
    background-color: #C0C0C0;
    box-shadow: 0.3rem 0.3rem rgba(42, 53, 79, 0.9);
  }

  .inactive__song {
    border: 1px dotted black;
  }
}
</style>