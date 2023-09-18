<template>
    <details class="group flex" v-if="activeSubDevice">
        <summary
            class="bg-white text-black w-full flex rounded-xl shadow-lg p-4 my-2 flex justify-between items-center font-medium cursor-pointer list-none border">
            <div>{{ title }}</div>
            <span class="transition group-open:rotate-180">
                <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor"
                    stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24">
                    <path d="M6 9l6 6 6-6"></path>
                </svg>
            </span>
        </summary>
        <div
            class="bg-white text-black w-full flex flex-col rounded-xl gap-3 shadow-lg p-4 my-2 text-neutral-600 mt-3 group-open:animate-fadeIn transition-all border">
            <slot></slot>
        </div>
    </details>
</template>
  
<script>
export default {
  props: {
    activeSubDevice: {
      type: Object,
      default: null
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
  
<style scoped>
/* Add any component-specific styles here */
</style>
  