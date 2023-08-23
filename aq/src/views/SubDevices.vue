<template>
    <div class="bg-white pb-6 sm:pb-8 lg:pb-12">
        <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
            <header class="mb-8 flex items-center justify-between py-4 md:py-8">

                <Logo />
                <Navbar />

            </header>

            <span class="text-2xl font-bold text-neutral-900 dark:text-neutral-50">Subdevices</span>
            <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700">

            <div class="grid grid-cols-2">
                <div class="flex flex-col justify-items max-w-lg">
                    <SubDeviceCard v-for="feature in features" :name="feature.name" :key="feature.uuid"
                    :isActive="activeSubDevice && feature.pin === activeSubDevice.pin" @click.native="setActiveSubDevice(feature)">
                    </SubDeviceCard>

                </div>
                <div v-if="activeSubDevice.uuid !== ''">
                    <Accordion :activeSubDevice="activeSubDevice" title="Settings">
                        <ColorPicker v-if="activeSubDevice.type === 'led'" v-for="state in activeSubDevice.settings.led_state" />
                    </Accordion>
                    <Accordion :activeSubDevice="activeSubDevice" title="Timers">
                    </Accordion>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Navbar from '@/components/Navbar.vue';
import Logo from '@/components/Logo.vue';
import SubDeviceCard from '@/components/cards/SubDeviceCard.vue';
import Accordion from '@/components/Accordion.vue';
import ColorPicker from '@/components/ColorPicker.vue';

export default {
    data() {
        return {
            deviceName: '',
            features: [],
            activeSubDevice: {
                pin: 0,
                name: '',
                state: 0
            }
        };
    },
    components: {
        SubDeviceCard,
        Navbar,
        Logo,
        Accordion,
        ColorPicker
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
    },
    methods: {
        setActiveSubDevice(feature) {
            this.activeSubDevice = feature;
            console.log(feature)
        }
    }

};
</script>
