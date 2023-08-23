<template>
    <router-link :to="`/device/${device.uuid}/subdevices`">
        <DeviceCard :name="device.name"/>
    </router-link>
</template>

  
<script>
import DeviceCard from '@/components/cards/DeviceCard.vue';

export default {
    name: 'Device',
    props: {
        device: {
            type: Object,
            required: true
        }
    },
    components: {
        DeviceCard
    },
    data() {
        return {
            isOn: this.device.isOn,
        };
    },
    methods: {
    },
}
</script>


  
<style scoped></style>
  