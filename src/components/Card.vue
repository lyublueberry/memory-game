<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="card" :class="flippedStyles" @click="selectCard">
        <div v-if="visible" class="card-face is-front">
            <img :src="`/images/${value}.png`" width="100" height="100" alt="pic">
        </div>
        <div v-else class="card-face is-back"></div>
        <img v-if="matched" width="30" height="30" class="icon-check" src="../../public/images/icon.png" />
    </div>
</template>

<script>
import { computed } from 'vue';
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
        const flippedStyles = computed(() => {
            if (props.visible) {
                return 'is-flipped';
            } else return '';
        });
        const selectCard = () => {
            contex.emit('select-card', {
                position: props.position,
                faceValue: props.value
            })
        }

        return {
            selectCard,
            flippedStyles
        }
    }
}
</script>

<style>
.card {
    position: relative;
    transition: 0.5s transform ease-in;
    transform-style: preserve-3d;
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
    backface-visibility: hidden;
}

.card-face.is-front {
    background-color: blueviolet;background-image: url(../../public/images/back-bg.jpg);
    transform: rotateY(180deg);
}

.card.is-flipped {
    transform: rotateY(180deg);
}

.card-face.is-back {
    background-image: url(../../public/images/back-bg.jpg);

}
</style>