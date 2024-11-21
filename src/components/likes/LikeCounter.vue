<template>

  <div v-if="isLoading">
    Loading...
  </div>
  <button v-else-if="likeCount === 0" @click="likePost">
    Like this post
  </button>
  <button v-else>
    Likes <span>{{ likeCount }}</span>
  </button>
</template>


<script setup lang="ts">
import { ref } from 'vue';


interface Props {
  postId: string;
}

const props = defineProps<Props>()


const likeCount = ref(0)
const likeClicks = ref(0)
const isLoading = ref(true)

const likePost = () => {
  console.log('+1 Like')
}

const getCurrentLikes = async ()=>{

  const resp = await fetch(`/api/posts/likes/${props.postId}`)
  if (!resp.ok) {
    throw new Error('Failed to fetch likes')
  }

  const data = await resp.json();
  console.log("🚀 ~ getCurrentLikes ~ data:", data)
  
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