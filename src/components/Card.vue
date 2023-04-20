<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="card" @click="selectCard">
        <div v-if="visible" class="card-face is-front">
        <img :src="`/images/${value}.png`" width="100" height="100" alt="pic"></div>
        <div v-else class="card-face is-back"></div>
         <img v-if="matched" width="30" height="30" class="icon-check" src="../../public/images/icon.png"/>

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
            type: String,
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

        return {
            selectCard
        }
    }
}
</script>

<style>
.card {
    position: relative;
}

.icon-check {
    right: 0;
    position: absolute;
    bottom: 0;
}

.card-face {
    border: 3px solid #ffffff;
    border-radius: 4px;
    width: 100%;
    height: 100%;
    position: absolute;
}

.card-face.is-front {
    background-image: url();
    background-color: blueviolet;
}

.card-face.is-back {
    background-image: url(../../public/images/back-bg.jpg);

}</style>