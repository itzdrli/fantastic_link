<template>
  <div class="short-link-generator center-absolute">
    <h1 class="text-text mt-10 text-3xl">Fantastic Link</h1>
    <input v-model="longUrl" placeholder="Loooong Link" class="bg-flow rounded-xl placeholder-subtext1 text-text mr-3 mt-5 w-300px p-3"/>
    <button @click="generateShortLink" class="bg-flow rounded-3xl text-text p-3 hover:bg-flow"> Shoten! </button>
    <div v-if="shortUrl" class="text-text mt-5">
      Shorten Link: 
      <a :href="shortUrl" target="_blank" class="text-text hover:underline">{{ shortUrl }}</a>
    </div>
    <p v-if="error" class="error mt-5 text-red">{{ error }}</p>

    <footer class="mt-10 text-center text-text">
      <a href="https://github.com/itzdrli/fantastic_link" target="_blank" class="text-text hover:underline">Github</a>  |  
      <a href="mailto:itzdrli@proton.me" class="text-text hover:underline">Contact</a>  |  
      <a href="https://legal.itzdrli.cc/" class="text-text hover:underline">Privacy Policy</a>  |
      <a href="https://ko-fi.com/itzdrli" class="text-text hover:underline">Donate</a>  |  
      <a href="https://afdian.com/a/itzdrli" target="_blank" class="text-text hover:underline">AFDian</a>
    </footer>
  
  </div>
</template>


<script>
export default {
  data() {
    return {
      longUrl: '',
      shortUrl: '',
      error: ''
    };
  },
  methods: {
    async generateShortLink() {
      try {
        if (!this.longUrl) {
          this.error = 'Original Link is Required';
          throw new Error('Original Link is Required');
        }
        if (!this.longUrl.match(/^(http|https|ftp):\/\/[^\s/$.?#]+\.[^\s/$.?#]+[^\s]*$/)) {
          this.error = 'Provide a valid URL';
          throw new Error('Provide a valid URL');
        }
        const response = await fetch('https://l-i.biz/shorten', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ url: this.longUrl })
        });

        if (!response) {
          throw new Error('Failed to generate short link');
        }

        const data = await response.json();
        this.shortUrl = data.url;
        this.error = '';
      } catch (error) {
        this.error = error.message;
        this.shortUrl = '';
      }
    }
  }
};
</script>
