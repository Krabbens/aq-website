<!-- SubDevices.vue -->
<template>
    <div>
        <h1>Features for {{ deviceName }}</h1>
        <ul>
            <li v-for="feature in features" :key="feature.id">
                {{ feature.name || 'No Device' }}
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            deviceName: '',
            features: []
        };
    },
    async created() {
        const { uuid } = this.$route.params;
        
        try {
            const response = await axios.get(`https://krabbens.jprq.live/api/v1/device/${uuid}`);
            
            this.features = response.data.features;
            this.deviceName = response.data.device_name;
        } catch (error) {
            console.error('Error fetching device details:', error);
            // Handle error (e.g. show an error message to the user, redirect, etc.)
        }
    }
};
</script>
