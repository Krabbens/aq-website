<template>
    <div class="relative">
        <input type="text" v-model="selectedTime" @mousedown="onInputMouseDown" @mouseup="onInputMouseUp"
            @click="onInputClick"
            class="block w-full py-2 pl-3 pr-10 text-gray-800 placeholder-gray-400 border border-gray-300 rounded-md focus:ring focus:ring-blue-400"
            placeholder="Select time" />
        <div v-if="isOpen" class="absolute z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-lg" @click.stop>
            <div class="p-2 flex justify-center items-center">
                <div class="flex flex-col items-center">
                    <button @click.stop="setHour(hour + 1)" class="hover:bg-gray-200 text-xl p-2">
                        <span class="block">&#9650;</span> <!-- Up arrow -->
                    </button>
                    <span class="text-xl">{{ hour }}</span>
                    <button @click.stop="setHour(hour - 1)" class="hover:bg-gray-200 text-xl p-2">
                        <span class="block">&#9660;</span> <!-- Down arrow -->
                    </button>
                </div>
                <span class="text-xl mx-2">:</span>
                <div class="flex flex-col items-center">
                    <button @click.stop="setMinute(minute + 1)" class="hover:bg-gray-200 text-xl p-2">
                        <span class="block">&#9650;</span> <!-- Up arrow -->
                    </button>
                    <span class="text-xl">{{ minute }}</span>
                    <button @click.stop="setMinute(minute - 1)" class="hover:bg-gray-200 text-xl p-2">
                        <span class="block">&#9660;</span> <!-- Down arrow -->
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    emits: ['update:modelValue'],
    props: {
        modelValue: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            isOpen: false,
            hour: this.stringTimeToHourAndMinute(this.modelValue)[0],
            minute: this.stringTimeToHourAndMinute(this.modelValue)[1],
            selectedTime: this.modelValue,
        };
    },
    watch: {
        selectedTime() {
            this.updateTime();
            this.$emit('update:modelValue', this.formattedTime);
        },
    },
    mounted() {
        this.selectedTime = this.modelValue;
    },
    computed: {
        formattedTime() {
            const formattedHour = this.hour.toString().padStart(2, '0');
            const formattedMinute = this.minute.toString().padStart(2, '0');
            return `${formattedHour}:${formattedMinute}`;
        },
    },
    methods: {
        setHour(newHour) {
            this.hour = Math.min(23, Math.max(0, newHour));
        },
        setMinute(newMinute) {
            this.minute = Math.min(59, Math.max(0, newMinute));
        },
        onInputMouseDown() {
            this.isOpen = false; // Prevent the picker from closing immediately
        },
        onInputMouseUp() {
            // Ensure the picker is closed only if it was previously open
            if (!this.isOpen) {
                this.togglePicker();
            }
        },
        onInputClick() {
            if (!this.isOpen) {
                this.togglePicker();
            }
        },
        togglePicker() {
            if (this.isOpen) {
                // Save the time before closing the picker
                this.selectedTime = this.formattedTime;
            }
            this.isOpen = !this.isOpen;
            if (this.isOpen) {
                // Add a click event listener to close the picker when clicking outside
                document.addEventListener('click', this.closePickerOnClickOutside);
            } else {
                // Remove the click event listener when the picker is closed
                document.removeEventListener('click', this.closePickerOnClickOutside);
            }
        },
        closePickerOnClickOutside(event) {
            // Close the picker and save the time if a click occurs outside the component
            const isOutsideComponent = !this.$el.contains(event.target);
            if (isOutsideComponent) {
                this.selectedTime = this.formattedTime;
                this.isOpen = false;
                document.removeEventListener('click', this.closePickerOnClickOutside);
            }
        },
        updateTime() {
            // Split the time input to hour and minute parts
            const [hourStr, minuteStr] = this.selectedTime.split(':');
            const hour = parseInt(hourStr, 10);
            const minute = parseInt(minuteStr, 10);

            // Update the component's hour and minute
            if (!isNaN(hour) && !isNaN(minute)) {
                this.hour = Math.min(23, Math.max(0, hour));
                this.minute = Math.min(59, Math.max(0, minute));
            }
        },
        stringTimeToHourAndMinute(time) {
            const [hourStr, minuteStr] = time.split(':');
            const hour = parseInt(hourStr, 10);
            const minute = parseInt(minuteStr, 10);
            return [hour, minute];
        },
    },
};
</script>
