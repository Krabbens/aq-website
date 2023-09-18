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
                        :isActive="activeSubDevice && feature.pin === activeSubDevice.pin"
                        @click.native="setActiveSubDevice(feature)">
                    </SubDeviceCard>

                </div>
                <div v-if="activeSubDevice.uuid !== ''">
                    <Accordion :activeSubDevice="activeSubDevice" title="Settings">
                        <fieldset class="flex flex-col border gap-3 py-3 px-3 rounded-xl shadow-lg"
                            v-if="activeSubDevice.type === 'led'">
                            <legend class="text-md font-semibold">LED Color States</legend>
                            <ColorPicker :label="{ idx }" v-for="(state, idx) in activeSubDevice.settings.led_state"
                                v-model="activeSubDevice.settings.led_state[idx]" :key="idx" />
                        </fieldset>
                        <fieldset class="flex flex-col border py-3 px-3 rounded-xl shadow-lg"
                            v-if="activeSubDevice.type === 'led'">
                            <legend class="text-md font-semibold">LED Settings</legend>
                            <div class="flex items-center">
                                <label class="w-24 text-left">Brightness</label> <!-- Fixed width for labels -->
                                <input type="range" min="0" max="100" v-model="activeSubDevice.settings.led_brightness"
                                    class="ml-2 w-48 h-1.5 rounded border accent-purple-500">
                                <label class="ml-2">{{ activeSubDevice.settings.led_brightness }}%</label>
                                <div
                                    v-bind:class="{ 'mx-4 rounded-full w-4 h-4 border border-orange-500': changedSettings.led_brightness }">
                                </div>
                            </div>
                            <hr class="my-2 bg-gray-200 dark:bg-gray-700">
                            <div class="flex items-center"> <!-- Added margin-top for spacing -->
                                <label class="w-24 text-left">Speed</label> <!-- Fixed width for labels -->
                                <input type="range" min="0" max="10000" step="100"
                                    v-model="activeSubDevice.settings.led_speed"
                                    class="ml-2 w-48 h-1.5 rounded border accent-purple-500">
                                <label class="ml-2">{{ Math.round(activeSubDevice.settings.led_speed / 10000 * 100)
                                }}%</label>
                                <div
                                    v-bind:class="{ 'mx-4 rounded-full w-4 h-4 border border-orange-500': changedSettings.led_speed }">
                                </div>
                            </div>
                            <hr class="my-2 bg-gray-200 dark:bg-gray-700">
                            <div class="flex items-center">
                                <label class="w-24 text-left">Led count</label> <!-- Fixed width for labels -->
                                <NumberInput v-model="activeSubDevice.settings.led_count" min="0" max="1000"
                                    class="ml-2 w-48 h-1.5 rounded accent-purple-500" />
                                <div
                                    v-bind:class="{ 'mx-4 rounded-full w-4 h-4 border border-orange-500': changedSettings.led_count }">
                                </div>
                            </div>
                            <hr class="my-2 bg-gray-200 dark:bg-gray-700">
                            <div class="flex items-center">
                                <label class="w-24 text-left">Led type</label>
                                <select v-model="activeSubDevice.settings.led_type"
                                    class="w-48 mx-1 rounded-lg border-gray-300 text-gray-700 sm:text-sm">
                                    <option value="ws2812">WS2812</option>
                                    <option value="ws2812b">WS2812B</option>
                                    <option value="ws2813">WS2813</option>
                                    <option value="ws2811">WS2811</option>
                                    <option value="NeoPixel">NeoPixel</option>
                                </select>
                                <div
                                    v-bind:class="{ 'mx-4 rounded-full w-4 h-4 border border-orange-500': changedSettings.led_type }">
                                </div>
                            </div>
                            <hr class="my-2 bg-gray-200 dark:bg-gray-700">
                            <div class="flex items-center">
                                <label class="w-24 text-left">Effect</label>
                                <select v-model="activeSubDevice.settings.led_effect"
                                    class="w-48 mx-1 rounded-lg border-gray-300 text-gray-700 sm:text-sm">
                                    <option value="solid">Solid</option>
                                    <option value="fade">Fade</option>
                                </select>
                                <div
                                    v-bind:class="{ 'mx-4 rounded-full w-4 h-4 border border-orange-500': changedSettings.led_effect }">
                                </div>
                            </div>
                        </fieldset>
                        <fieldset class="flex flex-col border py-3 px-3 rounded-xl shadow-lg"
                            v-if="activeSubDevice.type === 'relay'">
                            <legend class="text-md font-semibold">Relay Settings</legend>
                            <div class="flex items-center">
                                <label class="ml-2">Enabled</label>
                                <input type="checkbox" v-model="activeSubDevice.settings.state" class="mx-4">
                            </div>
                        </fieldset>
                    </Accordion>
                    <Accordion :activeSubDevice="activeSubDevice" title="Timers">
                        <fieldset class="flex flex-col border gap-3 py-3 px-3 rounded-xl shadow-lg"
                            :key="activeSubDevice.pin">
                            <legend class="text-md font-semibold">Start time</legend>
                            <TimePicker v-model="activeSubDevice.timer.start_time" />
                        </fieldset>
                        <fieldset class="flex flex-col border gap-3 py-3 px-3 rounded-xl shadow-lg"
                            :key="activeSubDevice.pin">
                            <legend class="text-md font-semibold">End time</legend>
                            <TimePicker dark-mode="true" placeholder="Select a time" label="Select a time"
                                v-model="activeSubDevice.timer.end_time" />
                        </fieldset>
                    </Accordion>
                    <button v-if="(settingsChanged || timersChanged) && !loading" data-test="swashOut"
                        class="float-right border shadow-lg hover:bg-purple-800 hover:text-white my-2 py-2 px-4 rounded-lg transition duration-100 ease-in-out"
                        @click="saveSettings()">Save</button>
                    <div class="-translate-x-10 float-right" v-if="loading">
                        <div class="mt-4 w-12 h-12 rounded-full justify-center animate-spin
                    border-2 border-solid border-blue-500 border-t-transparent"></div>
                    </div>
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
import NumberInput from '@/components/NumberInput.vue';
import TimePicker from '@/components/TimePicker.vue';
import { useToast } from "vue-toastification";
import _ from 'lodash';

export default {
    data() {
        return {
            deviceName: '',
            features: [],
            loading: false,
            oldLedStates: [],
            activeSubDevice: {
                pin: -1,
                name: '',
                uuid: '',
                state: 0,
                settings: {
                    led_brightness: 0,
                    led_count: 0,
                    led_effect: '',
                    led_speed: 0,
                    led_state: [],
                    led_type: '',
                    smooth_fade: false
                },
                timer: {
                    start_time: '00:00',
                    end_time: '00:00'
                },
            },
            changedSettings: {
                led_brightness: false,
                led_count: false,
                led_effect: false,
                led_speed: false,
                led_type: false,
                smooth_fade: false,
                led_state: false,
            },
            changedTimers: {
                start_time: false,
                end_time: false
            },
            oldSettings: {}, // Initialize oldSettings object
        };
    },
    components: {
        SubDeviceCard,
        Navbar,
        Logo,
        Accordion,
        ColorPicker,
        NumberInput,
        TimePicker
    },
    async created() {
        const { uuid } = this.$route.params;

        try {
            const response = await axios.get(`https://krabbens.jprq.live/api/v1/device/${uuid}`);
            console.log(response.data)
            this.features = response.data.features;
            this.deviceName = response.data.device_name;
        } catch (error) {
            console.error('Error fetching device details:', error);
            // Handle error (e.g. show an error message to the user, redirect, etc.)
        }
        if (this.activeSubDevice.settings) {
            this.oldSettings = _.cloneDeep(this.activeSubDevice.settings);
            this.oldLedStates = _.cloneDeep(this.activeSubDevice.settings.led_state);
        }
        if (this.activeSubDevice.timer) {
            this.oldTimers = _.cloneDeep(this.activeSubDevice.timer);
        }
    },
    methods: {
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        },
        setActiveSubDevice(feature) {
            this.activeSubDevice = feature;
            if (this.activeSubDevice.settings) {
                this.oldSettings = _.cloneDeep(this.activeSubDevice.settings);
                this.oldLedStates = _.cloneDeep(this.activeSubDevice.settings.led_state);
            }
            if (this.activeSubDevice.timer) {
                this.oldTimers = _.cloneDeep(this.activeSubDevice.timer);
            }

            this.changedSettings = {
                led_brightness: false,
                led_count: false,
                led_effect: false,
                led_speed: false,
                led_type: false,
                smooth_fade: false,
                led_state: false,
            };

            this.changedTimers = {
                start_time: false,
                end_time: false
            };

            console.log("Active subdevice: ", this.activeSubDevice);
        },
        saveSettings() {
            const toast = useToast();
            console.log("Saving settings...");
            console.log(this.activeSubDevice);

            const swash = document.querySelector('[data-test="swashOut"]');
            swash.classList.add('magictime', 'swashOut')
            setTimeout(() => {
                this.loading = true;
                swash.classList.add('invisible');
            }, 1000);

            axios.post(`https://krabbens.jprq.live/api/v1/device/${this.$route.params.uuid}/set_feature`, {
                auth: this.getCookie('token'),
                pin: this.activeSubDevice.pin,
                settings: this.activeSubDevice.settings,
                timer: this.activeSubDevice.timer
            }).then((response) => {
                console.log(response);
                toast.success("Settings saved!");

                // Update oldSettings with a copy of the new settings
                this.oldSettings = { ...this.activeSubDevice.settings };
                this.oldTimers = { ...this.activeSubDevice.timer };
                this.loading = false;

                swash.classList.remove('invisible');

                this.features.forEach((feature, index) => {
                    if (feature.pin === this.activeSubDevice.pin) {
                        this.features[index] = this.activeSubDevice;
                    }
                });
            }).catch((error) => {
                console.log(error);
                // print error from response
                toast.error(error.response.data);

                swash.classList.remove('invisible');
                this.loading = false;
            });
        }
    },
    watch: {
        'activeSubDevice.settings': {
            deep: true,
            handler(newSettings) {
                for (const key in newSettings) {
                    console.log(key, newSettings[key], this.oldSettings[key]);
                    if (newSettings[key] != this.oldSettings[key]) {
                        console.log(key, newSettings[key], this.oldSettings[key]);
                        this.changedSettings[key] = true;
                    } else {
                        this.changedSettings[key] = false;
                    }
                }
            },
        },
        'activeSubDevice.timer': {
            deep: true,
            handler(newTimers) {
                for (const key in newTimers) {
                    if (newTimers[key] != this.oldTimers[key]) {
                        console.log(key, newTimers[key], this.oldTimers[key]);
                        this.changedTimers[key] = true;
                    } else {
                        this.changedTimers[key] = false;
                    }
                }
            },
        },
    },
    computed: {
        // Returns true if any of the settings have changed
        settingsChanged() {
            return Object.values(this.changedSettings).some((value) => value);
        },
        // Returns true if any of the timers have changed
        timersChanged() {
            return Object.values(this.changedTimers).some((value) => value);
        },
        // Returns true if any of the settings or timers have changed
        changed() {
            return this.settingsChanged || this.timersChanged;
        },
    }


};
</script>
