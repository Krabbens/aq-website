<template>
    <div
        class="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 mx-8">
        <div class="relative overflow-hidden bg-cover bg-no-repeat" data-te-ripple-init data-te-ripple-color="light">
            <img class="rounded-t-lg" src="https://source.unsplash.com/random" alt="" />
            <a href="#!">
                <div
                    class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100">
                </div>
            </a>
        </div>
        <div class="p-6">
            <h5 class="mb-2 text-xl font-small leading-tight text-neutral-800 dark:text-neutral-50">
                {{ name }}
            </h5>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true,
        },
    },
};
</script>