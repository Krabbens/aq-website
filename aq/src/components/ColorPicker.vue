<template>
    <fieldset class="flex px-2 py-2 shadow-lg items-center border rounded-lg">
        <legend class="mr-2 text-md font-semibold">State {{ label.idx + 1 }}</legend>
        <div class="w-8 h-8 rounded border shadow" :style="{ backgroundColor: color }"></div>
        <input type="range" min="0" max="360" v-model="hue" class="mx-4 appearance-none w-48 h-1.5 rounded border"
            style="background: linear-gradient(to right, hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(0, 100%, 50%));">
        <label class="ml-2">{{ colorInfo.name }}</label>
    </fieldset>
</template>
  
<script>
import axios from 'axios';

export default {
    emits: ['update:modelValue'],
    name: 'ColorPicker',
    props: {
        label: {
            type: Object,
            required: true
        },
        modelValue: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            hue: this.rgbToHsv(this.modelValue)[0],
            colorInfo: {
                name: 'Loading...',
                hex: this.rgbToHex(this.modelValue)
            },
            rgbArray: this.modelValue
        };
    },
    computed: {
        color() {
            return `hsl(${this.hue}, 100%, 50%)`;
        }
    },
    methods: {
        hsvToRgb(h, s, v) {
            // Ensure that h, s, and v are in the valid range
            h = Math.max(0, Math.min(360, h));
            s = Math.max(0, Math.min(100, s));
            v = Math.max(0, Math.min(100, v));

            // Convert HSV to RGB
            const c = (v / 100) * (s / 100);
            const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
            const m = (v / 100) - c;
            let r, g, b;

            if (h >= 0 && h < 60) {
                r = c;
                g = x;
                b = 0;
            } else if (h >= 60 && h < 120) {
                r = x;
                g = c;
                b = 0;
            } else if (h >= 120 && h < 180) {
                r = 0;
                g = c;
                b = x;
            } else if (h >= 180 && h < 240) {
                r = 0;
                g = x;
                b = c;
            } else if (h >= 240 && h < 300) {
                r = x;
                g = 0;
                b = c;
            } else {
                r = c;
                g = 0;
                b = x;
            }

            return [
                Math.round(255 * (r + m)),
                Math.round(255 * (g + m)),
                Math.round(255 * (b + m))
            ];
        },
        rgbToHex(rgb) {
            let r = rgb[0];
            let g = rgb[1];
            let b = rgb[2];
            // Convert RGB to HEX
            const rHex = Math.round(r).toString(16).padStart(2, '0');
            const gHex = Math.round(g).toString(16).padStart(2, '0');
            const bHex = Math.round(b).toString(16).padStart(2, '0');

            return `#${rHex}${gHex}${bHex}`;
        },
        rgbToHsv(rgb) {
            // Convert RGB to HSV
            const r = rgb[0] / 255;
            const g = rgb[1] / 255;
            const b = rgb[2] / 255;

            const cMax = Math.max(r, g, b);
            const cMin = Math.min(r, g, b);
            const delta = cMax - cMin;

            let h = 0;
            if (delta === 0) {
                h = 0;
            } else if (cMax === r) {
                h = 60 * (((g - b) / delta) % 6);
            } else if (cMax === g) {
                h = 60 * (((b - r) / delta) + 2);
            } else {
                h = 60 * (((r - g) / delta) + 4);
            }

            let s = 0;
            if (cMax === 0) {
                s = 0;
            } else {
                s = delta / cMax;
            }

            const v = cMax;

            return [h, s * 100, v * 100];
        },
        async setColorInfo(newHue) {
            let hexString = this.hsvToRgb(newHue, 100, 100);
            //convert to string
            hexString = this.rgbToHex(hexString);

            let hex = hexString.replace('#', '');
            let redHex = hex.substring(0, 2);
            let greenHex = hex.substring(2, 4);
            let blueHex = hex.substring(4, 6);

            axios
                .get(`https://api.color.pizza/v1/${redHex}${greenHex}${blueHex}`)
                .then((response) => {
                    // Update the color name and hex value from the API response
                    this.colorInfo.name = response.data.paletteTitle;
                    this.colorInfo.hex = response.data.colors[0].hex;
                })
                .catch((error) => {
                    console.error('Error fetching color data:', error);
                });
        },
        hexToRgb(hex) {
            // Convert a hex color string to an RGB array
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            return [r, g, b];
        }
    },
    watch: {
        hue(newHue) {
            // Make a GET request to the Color API when the slider value changes
            this.setColorInfo(newHue);

            let rgb = this.hsvToRgb(newHue, 100, 100);
            console.log(rgb)
            console.log(newHue)
            let greenredblue = [rgb[0], rgb[1], rgb[2]];

            this.$emit('update:modelValue', greenredblue);
        }
    },
    created() {
        console.log(this.modelValue);
        // Make a GET request to the Color API when the component is mounted
        this.setColorInfo(this.rgbToHsv(this.modelValue)[0])
    }
};
</script>
  
<style scoped>
input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    /* Important to override default styles */
    width: 8px;
    /* Adjust as needed */
    height: 24px;
    /* Adjust as needed */
    background: #fff;
    cursor: pointer;
    border-radius: 20%;
    border: 1px solid #ddd;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
    /* Example box shadow, adjust as desired */
    /* Adjust to vertically center the thumb with the track */
}
</style>