<template>
  <div class="short-link-generator center-absolute">
    <h1 class="text-nord5 mt-10 text-3xl">短链接生成器</h1>
    <input v-model="longUrl" placeholder="输入长链接" class="bg-nord4 rounded-xl placeholder-subtext1 text-text mr-3 mt-5 w-300px p-3"/>
    <button @click="generateShortLink" class="bg-nord4 rounded-3xl text-nord5 p-3 hover:bg-nord3"> 生成短链接 </button>
    <div v-if="shortUrl" class="text-text mt-5">
      短链接: 
      <a :href="shortUrl" target="_blank" class="text-text hover:underline">{{ shortUrl }}</a>
    </div>
    <p v-if="error" class="error mt-5 text-red">{{ error }}</p>
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
          this.error = '请输入长链接';
          throw new Error('请输入长链接');
        }
        // validat url with regex
        if (!this.longUrl.match(/^(http|https|ftp):\/\/[^\s/$.?#]+\.[^\s/$.?#]+[^\s]*$/)) {
          this.error = '请输入正确的链接';
          throw new Error('请输入正确的链接');
        }
        // if (!this.longUrl.startsWith('http')) {
        //   this.error = '请输入正确的链接';
        //   throw new Error('请输入正确的链接');
        // }
        const response = await fetch('https://l-i.biz/shorten', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ url: this.longUrl })
        });

        if (!response) {
          throw new Error('生成短链接失败');
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
