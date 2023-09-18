<template>
    <div class="flex custom-number-input h-8 w-32 mx-2">
        <div class="flex flex-row h-full w-full rounded-lg relative bg-transparent">
            <button @click="decrement"
                class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                <span class="m-auto text-2xl font-thin">−</span>
            </button>
            <input type="number"
                class="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700 outline-none"
                name="custom-input-number" :value="counterValue" @input="updateValue($event.target.value)">
            <button @click="increment"
                class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                <span class="m-auto text-2xl font-thin">+</span>
            </button>
        </div>
    </div>
</template>
  
<script>
export default {
    emits: ['update:modelValue'],
    props: {
        modelValue: {
            type: Number,
            required: true, // Make sure the value prop is required
        },
        min: {
            type: String,
            default: 0
        },
        max: {
            type: String,
            default: 100
        },
        step: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            counterValue: this.modelValue
        };
    },
    watch: {
        counterValue(newVal) { // Watch counterValue instead of value
            this.$emit('update:modelValue', newVal);
        }
    },
    methods: {
        increment() {
            if (this.counterValue < this.max) {
                this.counterValue = this.counterValue + this.step;
            }
        },
        decrement() {
            if (this.counterValue > this.min) {
                this.counterValue = this.counterValue - this.step;
            }
        },
        updateValue(value) {
            const num = parseInt(value);
            if (num <= this.max && num >= this.min) {
                this.counterValue = num;
            }
        }
    }
};
</script>

  
<style scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
}

.custom-number-input input:focus {
    outline: none !important;
}

.custom-number-input button:focus {
    outline: none !important;
}
</style>
  