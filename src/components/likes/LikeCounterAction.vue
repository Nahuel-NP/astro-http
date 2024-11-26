<template>

  <div v-if="isLoading">
    Loading...
  </div>
  <button v-else-if="likeCount === 0" @click="likePost">
    Like this post
  </button>
  <button v-else @click="likePost">
    Likes <span>{{ likeCount }}</span>
  </button>
</template>


<script setup lang="ts">
import { actions } from 'astro:actions';
import confetti from 'canvas-confetti'
import debounce from 'lodash.debounce'
import { ref, watch } from 'vue';


interface Props {
  postId: string;
}

const props = defineProps<Props>()


const likeCount = ref(0)
const likeClicks = ref(0)
const isLoading = ref(true)

watch(likeCount, debounce(() => {

  fetch(`/api/posts/likes/${props.postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ likes: likeClicks.value })
  })
  likeClicks.value = 0
}, 500))

const likePost = async () => {
  likeCount.value++;
  likeClicks.value++;

  const { data, error } = await actions.getGreeting({ name: 'World', age: 1, isActive: true })

  if (error) {
    console.error(error)
    return alert('Failed to like post')
  }
  console.log("🚀 ~ likePost ~ data:", data)

  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}

const getCurrentLikes = async () => {

  const { data, error } = await actions.getPostsLikes(props.postId)

  if (error) {
    return alert(error)
  }
  
  likeCount.value = data.likes;
  isLoading.value = false
}


getCurrentLikes();

</script>

<style scoped>
button {
  background-color: #5e51bc;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all .3s;
}

button:hover {
  background-color: #4a3f9a;
}
</style>