<template>
    <div class="relative">
        <div class="fixed top-0 left-0 w-full h-screen bg-black opacity-0" v-if="isVisible" @click="hide"></div>
        <transition name="pop">
            <div v-if="isVisible" class="absolute w-[240px] border rounded bg-white shadow-md">
                <div class="h-[260px] flex justify-center items-center text-white rounded-t" :style="{ background: color }">
                </div>
                <div class="p-[1.5rem] pt-4">
                    <div class="relative rounded-full border mb-4">
                        <input type="range" min="0" max="360" v-model="h" class="w-full appearance-none h-3 rounded-full cursor-pointer"
                            :style="gradientH" />
                    </div>
                </div>
            </div>
        </transition>
        <div class="w-12 h-12 mx-auto my-4 border-4 border-white shadow cursor-pointer hover:opacity-80"
            :style="{ background: color }" @click="toggle"></div>
    </div>
</template>
  
<script>
export default {
    props: ["initial"],
    data() {
        return {
            isVisible: true,
            h: 265,
            s: 100,
            l: 100
        };
    },
    computed: {
        color() {
            const hsl = hsb2hsl(this.h / 360, this.s / 100, this.l / 100);
            const colorString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
            this.handleColorChange({ color: colorString });  // Calling the internal method here
            return colorString;
        },
        gradientH() {
            const gradient = Array.from({ length: 7 }, (_, i) => {
                const h = i * 60;
                const hsl = hsb2hsl(h / 360, this.s / 100, this.l / 100);
                return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
            }).join(", ");

            console.log('Gradient:', gradient);  // log the output
            return { backgroundImage: `linear-gradient(to right, ${gradient})` };
        },
    },
    methods: {
        handleColorChange(colorData) {
            // Handle the color change here
            console.log("Color changed to:", colorData.color);
        },
        toggle() {
            this.isVisible = !this.isVisible;
        },
        hide() {
            this.isVisible = false;
        }
    },
    mounted() {
        this.h = Math.floor(Math.random() * 360);
    }
};

function hsb2hsl(h, s, b) {
    const hsl = { h };
    hsl.l = (2 - s) * b;
    hsl.s = s * b;

    if (hsl.l <= 1 && hsl.l > 0) {
        hsl.s /= hsl.l;
    } else {
        hsl.s /= 2 - hsl.l;
    }

    hsl.l /= 2;

    if (hsl.s > 1) hsl.s = 1;
    if (!hsl.s > 0) hsl.s = 0;

    hsl.h *= 360;
    hsl.s *= 100;
    hsl.l *= 100;

    return hsl;
}
</script>
  
<style scoped>
.pop-enter-active,
.pop-leave-active {
    transition: transform .5s, opacity .5s;
    transition-timing-function: cubic-bezier(.8, .3, 0.25, 1.75);
    transform: scale(1);
}

.pop-enter,
.pop-leave-active {
    opacity: 0;
    transform: scale(0);
}

/* For Webkit browsers */
input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none; /* Important to override default styles */
    width: 8px;  /* Adjust as needed */
    height: 36px; /* Adjust as needed */
    background: #fff;
    cursor: pointer;
    border-radius: 20%;
    border: 1px solid #ddd;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2); /* Example box shadow, adjust as desired */
    margin-top: -15.5px; /* Adjust to vertically center the thumb with the track */
}

/* For Firefox */
input[type=range]::-moz-range-thumb {
    width: 8px;  /* Adjust as needed */
    height: 30px; /* Adjust as needed */
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 20%;
    cursor: pointer;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2); /* Example box shadow, adjust as desired */
}

/* Ensure the track is visible by adjusting its height */
input[type=range]::-webkit-slider-runnable-track {
    height: 5px;
}

input[type=range]::-moz-range-track {
    height: 5px;
}

</style>