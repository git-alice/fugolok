<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <input type="text" v-model="title" value="Some title $342" placeholder="title">
      <input type="text" v-model="description" value="Some description $342" placeholder="description">
      <hr>
      <label>File
        <input type="file" id="files" ref="files" multiple v-on:change="handleFileUpload()"/>
      </label>
      <button v-on:click="submitFile()">Submit</button>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: '',
  data: () => {
    return {
      files: '',
      title: '',
      description: ''
    }
  },
  methods: {
    handleFileUpload() {
      this.files = this.$refs.files.files
    },
    submitFile() {
      const formData = new FormData();

      const json = JSON.stringify({title: this.title, description: this. description});
      const blob = new Blob([json], {
        type: 'application/json'
      });
      formData.append("json_payload", blob);

      if (this.files !== '') {
        for ( let i = 0; i < this.files.length; i++ ) {
          let file = this.files[i];
          formData.append('files', file);
        }
        this.$notify({
          group: 'info',
          title: 'Отправляем... <img src="https://i.gifer.com/XVo6.gif" style="display: block; margin: auto; width: 25px; height: 25px;">',
        });
        this.$http.post( 'http://192.168.0.98:8000/api/v1/films/',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
        ).then(() => {
          this.$notify({
            group: 'info',
            title: 'Отправлено !',
            text: 'Теперь вы можете посмотреть эту пленку у вас в архиве.',
          });
          formData.delete('files');
          formData.delete('json_payload');
        })
        .catch(() => {
          this.$notify({
            group: 'info',
            title: 'Не отправлено ;(',
            text: 'Что то пошло не так, попробуйте еще раз.',
          });
        }).finally(() => {
        });
      } else {
        this.$notify({
          group: 'info',
          text: 'Вы не выбрали ни одного файла.',
        });
      }
    }
  }
}
</script>