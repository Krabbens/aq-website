<template>
    <div class="list-item">
        <div class="item-name">{{ name }}</div>
        <button class="item-button">Button</button>
    </div>
</template>
  
<script>
export default {
    props: {
        name: {
            type: Object,
            required: true,
        },
    },
};
</script>
  
<style scoped>
.list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #f5f5f5;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    width: 100%;
    height: 50px;
    margin: 10px 0;
}

.item-name {
    font-size: 16px;
}

.item-button {
    padding: 5px 15px;
    font-size: 14px;
}
</style>