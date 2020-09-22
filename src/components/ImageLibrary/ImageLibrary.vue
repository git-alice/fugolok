<template lang="pug">
  div
    // p Test Gallery
    // vue-preview(:slides="slide1")

    p Films
    br
    div(v-if="films === null")
      center
        p Грузится...
        img(src="https://i.gifer.com/XVo6.gif" style="width: 25px; height: 25px; ")
    div(v-else-if="typeof films === 'object'")
      div(class="my-gallery")
        div(v-for="film in films")
          img(:src="'data:image/jpeg;base64,' + film.preview" style="width: 100px; height: 100px")
          button(@click="getFilmPreviews(film.name)") {{ film.name }}

    p Film preview
    div(v-if="filmPreviews === null")
      center
        p Пока ничего не выбрано.
    div(v-else-if="filmPreviews === 'loading'")
      center
        p Грузится...
        img(src="https://i.gifer.com/XVo6.gif" style="width: 25px; height: 25px; ")
    div(v-else-if="typeof filmPreviews === 'object'")
      vue-preview(:slides="filmPreviews")
      // div(class="film__preview")
      //  div(v-for="film in filmPreviews")
      //    div
      //      img(:src="film.msrc")
      //      center {{ film.name }}
</template>

<script>
import Button from "@/components/Elements/Buttons/Button";
export default {
  name: "Test",
  components: {Button},
  data () {
    return {
      slide1: [
        {
          src: 'https://downloader.disk.yandex.ru/disk/11c91cca8646c484b24ddfaaa9296197f783a8a201f141d244a7cee01cf5c4fc/5f3aa264/CKd8f9OIE7XZKELUoV_EAv0okkr90uEyRO15obW1lNO2xnpwaOOwloleEvksSvOrrkbVfSf-D2FGt_yricZGQQ%3D%3D?uid=843383613&filename=jpg003.jpg&disposition=attachment&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=843383613&fsize=1136765&hid=fb461ef39bb5a3a06a667e1ebf9e1da2&media_type=image&tknv=v2&etag=9f6e13e21ae00a31dde81449c56adf30',
          msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
          alt: 'picture2',
          title: 'Image Caption 2',
          w: 1200,
          h: 900
        },
        {
          src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
          msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
          alt: 'picture2',
          title: 'Image Caption 2',
          w: 1200,
          h: 900
        },
      ],
      filmPreviews: null,
      films: null,
      filmSources: null
    }
  },
  mounted() {
    let films = null

    let pFilms = fetch('http://localhost:5000/films/')
    pFilms.then((films) => {
      return films.json();
    }).then((films) => {
      this.films = films
    })
  },
  methods: {
    getFilmPreviews(filmName) {
      let filmPreviews = this.filmPreviews = "loading"
      let filmSources = null

      let pFilmPreviews = fetch(`http://localhost:5000/${filmName}`)
      pFilmPreviews.then((smt) => {
        return smt.json();
      }).then((json) => {
        filmPreviews = json['previews'];
        // filmSources = json['sources'];
        filmPreviews = Object.entries(filmPreviews).map(([name, srcBase64], i) => {
          return {
            name: name,
            src: 'data:image/jpeg;base64,'+ srcBase64,
            msrc: 'data:image/jpeg;base64,'+ srcBase64,
            // src: filmSources[name],
            w: 400,
            h: 400
          }
        })
        console.log(filmPreviews)
        this.filmPreviews = filmPreviews;
      })
    }
  }
}
</script>

<style lang="scss">

.my-gallery {
  display: flex;
  flex-direction: row;
}

.my-gallery figure img {
  height: 100px !important;
  width: 200px !important;
}

.film__preview {
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.film__preview::after {
  content: "";
  flex: auto;
}

.film__preview > div {
  margin: 3px;
  padding: 3px;
  border: 1px dotted black;
}

// --------------------

.my-gallery {
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  flex-wrap: wrap;
  justify-content: space-around;
}

.my-gallery figure {
  margin: 0;
}

.my-gallery figure img {
  height: 150px !important;
  width: 150px !important;
}

</style>