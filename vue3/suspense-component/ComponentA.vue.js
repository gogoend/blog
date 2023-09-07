const { defineComponent, onMounted } = Vue;

const template = `
<div>I'm ComponentA, I'm Lazy!!!</div>
`

export default defineComponent({
  template,
  async setup() {
    await new Promise((resolve) => {
      setTimeout(
        resolve,
        1000
      )
    })

    onMounted((...args) => {
      console.log(...args)
    })
  }
})