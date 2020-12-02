<script>
import Octicons from "@primer/octicons";

export default {
  name: "Octicon",
  functional: true,
  props: {
    name: {
      type: String,
      default: "mark-github",
    },
    large: {
      type: Boolean,
      default: false,
    },
  },
  render(h, { props, data }) {
    let icon = Octicons[props.name];
    icon = props.large && icon.heights[24] ? icon.heights[24] : icon.heights[16];
    return h(
      "svg",
      {
        class: ["octicon", data.staticClass || 'w-5 h-5'],
        attrs: {
          'viewBox': icon.options.viewBox,
          id: 'foo'
        },
        domProps: {
          innerHTML: icon.path,
        },
      }
    );
  },
};
</script>

<style>
.octicon {
  display: inline-block;
  vertical-align: text-top;
  fill: currentColor;
}
</style>
