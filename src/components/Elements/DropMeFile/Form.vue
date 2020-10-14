<template lang="pug">
  div.d-flex.flex-column.p-0.m-0.w-100.h-100
      div.d-flex.justify-content-center
        div.drag_and_drop.row
          .col-md
            form(ref='fileform')
              span.drop-files Drop the files here!
          .col-md(style="min-width: 400px;")
            div.general__info
              h4.wrap__text Here you can upload film to the server!
              p To upload files, drag them to this area. You will see the uploaded photos below.
              div(v-show='files.length > 0')
                hr
                label() Title:
                input(type="text" id="film__title" v-model="title" value="Some title $342" placeholder="Title")
                br
                label() Description:
                textarea(rows="3" cols="20" id="film__description" v-model="description" value="Some description $342" placeholder="Description")
                br
                div.submit__group.d-flex.justify-content-end
                  button.submit__button(v-on:click='submitFiles()') Submit film
        // progress(max='100' :value.prop='uploadPercentage')
      div.flex-wrap
        div.files.mt-3.mb-3(v-if="files.length > 0")
          .file__listing.d-flex.flex-column(v-for='(file, key) in files' :key='key')
            div.w-auto.m-auto
              img.preview(v-bind:ref="'preview' + parseInt( key )")
            button.remove(v-on:click='removeFile( key )')
            div.img__info
              ul
                li Name: {{ file.name }}
                li Size: {{ humanReadableSize(file.size) }}
                li Type: {{ file.type }}
                li Last modified: {{ file.lastModifiedDate.toDateString() }}
            .remove-container
              // button.remove() Remove
          div.files__size Files: {{ files.length }}
        div.no__files(v-else style="min-height: 400px;") Just choose files.
</template>

<script>
import axios from 'axios'
import { humanFileSize } from "@/utils/human_readable";
import Button from "@/components/Elements/Button/Button";

export default {
  name: 'DragAndDrop',
  components: {Button},
  data(){
      return {
        title: '',
        description: '',
        dragAndDropCapable: false,
        files: [],
        uploadPercentage: 30,
        srcImage: require('@/assets/img/files.png')
      }
  },
  /**
   * Event Listeners
   */
  mounted(){
      this.dragAndDropCapable = this.determineDragAndDropCapable();

      if (this.dragAndDropCapable) {
          // Remove the default behavior
          ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach( function( evt ) {
              this.$refs.fileform.addEventListener(evt, function(e){
                  e.preventDefault();
                  e.stopPropagation();
              }.bind(this), false);
          }.bind(this));
          // Add our behavior
          this.$refs.fileform.addEventListener('drop', function(e){
              let existedFiles = this.files.map((fileObj) => fileObj.file)
              for( let i = 0; i < e.dataTransfer.files.length; i++ ){
                if (!existedFiles.includes(e.dataTransfer.files[i].file)) {
                  this.files.push( e.dataTransfer.files[i] );
                  this.getImagePreviews();
                }
              }
          }.bind(this));
      }
  },
  methods: {
    /**
     * Check draggable functionality
     */
    determineDragAndDropCapable(){
        let div = document.createElement('div');
        return (( 'draggable' in div ) || ( 'ondragstart' in div && 'ondrop' in div ))
            && 'FormData' in window
            && 'FileReader' in window;
    },
    /**
     * Add previews
     */
    getImagePreviews(){
        for( let i = 0; i < this.files.length; i++ ){
            if ( /\.(jpe?g|png|gif)$/i.test( this.files[i].name ) ) {
                let reader = new FileReader();
                // Show after reading
                reader.addEventListener("load", function(){
                    this.$refs['preview' + parseInt(i)][0].src = reader.result;
                }.bind(this), false);

                reader.readAsDataURL( this.files[i] );
            } else {
                // Show if can't reading
                this.$nextTick(function(){
                    this.$refs['preview' + parseInt(i)][0].src = require('@/assets/img/white_blank.png');
                });
            }
        }
    },
    humanReadableSize(size) {
      return humanFileSize(size)
    },
    submitFiles(){
        let formData = new FormData();

        for (let i = 0; i < this.files.length; i++) {
            let file = this.files[i];
            formData.append('files[' + i + ']', file);
        }

        axios.post( '/file-drag-drop',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: function( progressEvent ) {
                    this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) );
                }.bind(this)
            }
        ).then(function() {
          console.log('SUCCESS!!');
        }).catch(function() {
          console.log('FAILURE!!');
        });
    },

    removeFile(key) {
      this.files = this.files.filter(item => item !== this.files[key])
      this.getImagePreviews()
    }
  }
}
</script>

<style lang="scss">
    @import "../../../assets/css/drag_and_drop.scss";
</style>