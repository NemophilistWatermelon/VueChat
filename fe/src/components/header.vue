<template>
    <div class="header">
        <div class="title">
            <span>{{Text}}</span>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        props: {
            Text: {
                type: String,
                default: "头部",
            },
        },
    })
</script>

<style scoped>
.header {
    width: 100%;
    height: 30px;
    line-height: 30px;
    color: white;
    background-color: #99a0b114;
    text-shadow:  0 0 1px #000;
}

</style>