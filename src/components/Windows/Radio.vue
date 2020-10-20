<template lang="pug">
  Window(:window-name="this.$options.name" :init-options="initOptions")
    button(@click="play") play
    button(@click="pause") pause
    p {{ current_music_timer }} / {{ current_music_duration }}
</template>

<script>
import {Howl, Howler} from 'howler';

import Window from "@/components/Elements/Window/Window";

export default {
  name: 'Radio',
  data() {
      return {
        'src': require('@/assets/music/Motorama - Wind In Her Hair.mp3'),
        player: undefined,
        current_music_id: undefined,
        current_music_timer: 0,
        current_music_duration: 0
      }
  },
  props: ['initOptions'],
  components: { Window },
  methods: {
    play() {
      requestAnimationFrame(() => {
        // this.current_music_timer = this.player.seek() || 0;
      })
      if (!this.current_music_id) {
        this.current_music_id = this.player.play()
      } else {
        this.player.play(this.current_music_id)
      }
    },
    pause() {
      this.player.pause(this.current_music_id)
    }
  },
  mounted() {
    let src = 'http://alexkatz.me/codepen/music/interlude.mp3';
    this.player = new Howl({
      src: [src],
      onplay: () => {
        console.log('play')
      },
      onseek: () => {
        requestAnimationFrame(() => {
          console.log('kek')
        })
      },
      onpause: () => {
        console.log('pause')
      },
    });
    this.current_music_duration = this.player.duration()
  }

}
</script>