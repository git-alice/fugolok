<template>
    <div id="file-drag-drop">
        <form ref="fileform">
            <span class="drop-files">Drop the files here!</span>
        </form>

        <progress max="100" :value.prop="uploadPercentage"></progress>

        <div v-for="(file, key) in files" :key="key" class="file-listing">
            <img class="preview" v-bind:ref="'preview'+parseInt( key )"/>
            {{ file.name }}
            <div class="remove-container">
                <a class="remove" v-on:click="removeFile( key )">Remove</a>
            </div>
        </div>

        <a class="submit-button" v-on:click="submitFiles()" v-show="files.length > 0">Submit</a>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            dragAndDropCapable: false,
            files: [],
            uploadPercentage: 30
        }
    },
    mounted(){
        this.dragAndDropCapable = this.determineDragAndDropCapable();

        if (this.dragAndDropCapable) {

            ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach( function( evt ) {

                this.$refs.fileform.addEventListener(evt, function(e){
                    e.preventDefault();
                    e.stopPropagation();
                }.bind(this), false);
            }.bind(this));

            this.$refs.fileform.addEventListener('drop', function(e){
                for( let i = 0; i < e.dataTransfer.files.length; i++ ){
                    this.files.push( e.dataTransfer.files[i] );
                    this.getImagePreviews();
                }
            }.bind(this));
        }
    },
    methods: {
        determineDragAndDropCapable(){
            let div = document.createElement('div');

            return ( ( 'draggable' in div )
                || ( 'ondragstart' in div && 'ondrop' in div ) )
                && 'FormData' in window
                && 'FileReader' in window;
        },
        getImagePreviews(){
            for( let i = 0; i < this.files.length; i++ ){
                if ( /\.(jpe?g|png|gif)$/i.test( this.files[i].name ) ) {

                    let reader = new FileReader();

                    reader.addEventListener("load", function(){
                        this.$refs['preview'+parseInt( i )][0].src = reader.result;
                    }.bind(this), false);

                    reader.readAsDataURL( this.files[i] );
                } else {
                    this.$nextTick(function(){
                        this.$refs['preview'+parseInt( i )][0].src = '/images/file.png';
                    });
                }
            }
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

        removeFile(key){
            this.files.splice(key, 1);
        }
    }
}
</script>

<style scoped>
    @import "index.scss";
</style>