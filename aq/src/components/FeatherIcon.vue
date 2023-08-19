<template>
    <i ref="iconEl" :data-feather="icon" v-bind="$attrs"></i>
  </template>
  
  <script>
  import feather from 'feather-icons';
  
  export default {
    name: 'FeatherIcon',
    props: {
      icon: {
        type: String,
        required: true
      }
    },
    mounted() {
      feather.replace({ width: '1em', height: '1em' });
    }
  }
  </script>
  