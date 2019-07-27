<template>
    <div class="text-style">
        <p>Ooopps...</p><br>
        <p>{{text}}</p>
    </div>
</template>

<script>
    export default {
        name: "NoItems",
        props: ['text'],
    }
</script>

<style scoped>
div.text-style {
    margin-left: auto;
    margin-right: auto;
    height: 15em;
    display: flex;
    align-items: center;
    justify-content: center }
div.text-style p {
    margin: 0;
    font-size: 2rem;
    background-color: #666666;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
    color: transparent;

    text-shadow: rgba(255,255,255,0.5) 0px 3px 3px;

}

</style>