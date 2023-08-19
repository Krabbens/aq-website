<template>
    <router-link :to="`/device/${device.uuid}/subdevices`" class="device">
        <div class="device-name">{{ device.name }}</div>
        <div class="device-controls">
            <i class="icon-timer"></i>
            <i class="icon-manual"></i>
        </div>
    </router-link>
</template>

  
<script>
export default {
    name: 'Device',
    props: {
        device: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            isOn: this.device.isOn
        };
    },
    methods: {
        toggleSwitch() {
            this.isOn = !this.isOn;
            this.$emit('toggle-device', this.device.uuid, this.isOn);
        },
        handleSliderClick(event) {
            event.stopPropagation();
        }
    }
}
</script>


  
<style scoped>
.device-name {
    font-size: 1.2rem;
    font-weight: 500;

    text-decoration: none;
}

.device-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    /* This ensures the container takes full width minus the left and right spacing */
}

.device-status {
    font-size: 0.8rem;
}

/* Switch Styles */
/* Switch Styles */
.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 30px;
    background-color: #ccc;
    /* Background color for the off state */
    border-radius: 15px;
    /* Half of the height to make it oval */
    transition: background-color 0.4s;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 50%;
    left: 0;
    width: 30px;
    /* Half of the switch width */
    height: 30px;
    background-color: white;
    border-radius: 50%;
    /* Make it a circle */
    transition: transform 0.4s;
    transform: translateY(-50%);
    /* Center it vertically */
    border: none;
    box-shadow: none;
}

input:checked+.slider {
    transform: translateX(30px) translateY(-50%);
    /* Move it to the right when checked */
}

input:checked~.switch {
    background-color: var(--primary);
    /* Change the background color of the switch when checked */
}

.slider::before,
.slider::after {
    border: none;
    box-shadow: none;
    content: none;
}</style>
  