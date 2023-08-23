<template>
    <div class="bg-white text-black w-full flex flex-col rounded-xl shadow-lg p-4 my-2 border hover:bg-gray-100" :class="[
        'transition-colors duration-150 cursor-pointer',
        isActive ? 'ring-1 ring-purple-400' : 'bg-white'
    ]" @click="$emit('click')">
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
                <div class="rounded-full w-4 h-4 border border-purple-500" :class="isActive ? 'bg-purple-500' : ''"></div>
                <div class="text-md font-bold">{{ name || "Unnamed" }}</div>
            </div>
            <div class="flex justify-center items-center rounded transition duration-300 ease-in-out hover:opacity-40">
                <!-- Binding class and text content directly to reactive data -->
                <span class="material-icons select-none cursor-pointer" :class="buttonClass" @click="toggleState()">{{
                    buttonText }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SubDeviceCard",
    props: {
        name: {
            type: String,
            required: true,
        },
        isActive: Boolean
    },
    data() {
        return {
            state: 0
        };
    },
    computed: {
        // Use computed properties for dynamic class and text based on state
        buttonClass() {
            if (this.state === 0) {
                return "filter-auto";
            } else if (this.state === 1) {
                return "filter-disabled";
            } else {
                return "filter-enabled";
            }
        },
        buttonText() {
            if (this.state === 0) {
                return "font_download";
            } else if (this.state === 1) {
                return "power_settings_new";
            } else {
                return "power_settings_new";
            }
        }
    },
    methods: {
        toggleState() {
            this.state = (this.state + 1) % 3;
            // Let Vue handle the DOM updates based on the reactive data
        }
    }
};
</script>