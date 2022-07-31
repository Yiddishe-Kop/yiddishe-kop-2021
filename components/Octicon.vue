<script>
import Octicons from '@primer/octicons'
import { h } from 'vue'

export default {
  name: 'Octicon',
  props: {
    name: {
      type: String,
      default: 'mark-github',
    },
    large: {
      type: Boolean,
      default: false,
    },
  },
  render() {
    let icon = Octicons[this.name]
    icon = this.large && icon.heights[24] ? icon.heights[24] : icon.heights[16]
    return h('svg', {
      class: ['octicon', 'w-5 h-5'],
      viewBox: icon.options.viewBox,
      id: 'foo',
      innerHTML: icon.path,
    })
  },
}
</script>

<style>
.octicon {
  display: inline-block;
  vertical-align: text-top;
  fill: currentColor;
}
.text-size {
  height: 1em;
}
</style>
