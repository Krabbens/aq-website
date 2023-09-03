<template>
    <div class="flex custom-number-input h-8 w-32 mx-2">
        <div class="flex flex-row h-full w-full rounded-lg relative bg-transparent">
            <button @click="decrement"
                class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                <span class="m-auto text-2xl font-thin">−</span>
            </button>
            <input type="number"
                class="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700 outline-none"
                name="custom-input-number" :value="counterValue" @input="updateValue" />
            <button @click="increment"
                class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                <span class="m-auto text-2xl font-thin">+</span>
            </button>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        value: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            counterValue: this.value,
        };
    },
    methods: {
        updateValue() {
            this.$emit('input', this.counterValue);
        },
        decrement() {
            this.counterValue--;
            this.updateValue();
        },
        increment() {
            this.counterValue++;
            this.updateValue();
        },
    },
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