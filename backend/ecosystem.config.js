module.exports = {
  apps : [{
    name   : "fantastic_link_backend",
    script : "./index.mjs",
    watch: true,
    watch_delay: 5000,
    ignore_watch : ["node_modules", "logs", ".git"],
  }]
}
