<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="card" @click="selectCard">
        <div v-if="visible" class="card-face is-front">{{ value }} {{ matched }}</div>
        <div v-else class="card-face is-back">back</div>
    </div>
</template>

<script>
export default {
    props: {
        matched: {
            type: Boolean,
            default: false
        },
        position: {
            type: Number,
            required: false
        },
        value: {
            type: Number,
            required: false
        },
        visible: {
            type: Boolean,
            default: false
        }
    },
    setup(props, contex) {
        const selectCard = () => {
            contex.emit('select-card', {
                position: props.position,
                faceValue: props.value
            })
        }

        return{
            selectCard
        }
    }
}
</script>

<style>
.card {
    border: 10px solid green;
    position: relative;
}

.card-face {
    width: 100%;
    height: 100%;
    position: absolute;
}

.card-face.is-front {
    background-color: blue;
}

.card-face.is-back {
    background-color: blueviolet;
}
</style>