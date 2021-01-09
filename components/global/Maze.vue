<template>
  <div>
    <div
      class="text-sm font-bold text-gray-700 dark:text-gray-400"
      v-if="showControls"
    >
      Controls
    </div>
    <div v-if="showControls" class="flex items-end mb-3 space-x-6">
      <field
        v-model.number="options.cols"
        type="number"
        label="Columns"
        class="w-12"
      />
      <field
        v-model.number="options.rows"
        type="number"
        label="Rows"
        class="w-12"
      />
      <field
        v-model.number="options.cellSize"
        type="number"
        label="Cell size"
        class="w-16"
      />
      <button @click="generateMaze" class="btn">
        <octicon name="sync"/>
      </button>
    </div>
    <div class="inline-flex flex-col max-w-full overflow-x-auto shadow-md">
      <div
        v-for="(row, i) in maze"
        :key="i"
        class="maze"
        :style="`--cell-size: ${options.cellSize}px`"
      >
        <div
          v-for="(col, j) in row"
          :key="j"
          :class="col ? 'path' : 'wall'"
          class="cell"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import MazeGenerator from "@/lib/maze";

export default {
  name: "Maze",
  props: {
    cols: {
      type: Number,
      default: 10,
    },
    rows: {
      type: Number,
      default: 10,
    },
    cellSize: {
      type: Number,
      default: 10,
    },
    showControls: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      maze: [],
      options: {
        cols: this.cols,
        rows: this.rows,
        cellSize: this.cellSize,
      },
    };
  },
  watch: {
    options: {
      handler: function () {
        this.generateMaze();
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    generateMaze() {
      const maze = new MazeGenerator(
        Math.max(1, this.options.cols),
        Math.max(1, this.options.rows)
      );
      maze.generate();
      this.maze = maze.get();
    },
  },
};
</script>

<style>
.maze {
  @apply flex;
}
.cell {
  @apply flex-shrink-0;
  transition: width 0.3s ease;
  transition: height 0.3s ease;
  transition: background-color 0.3s ease;
  width: var(--cell-size);
  height: var(--cell-size);
}
.path {
  @apply cursor-pointer bg-gray-900 dark:bg-gray-300 hover:bg-brand dark:hover:bg-brand;
}
.wall {
  @apply bg-white hover:bg-red-700 dark:bg-gray-900 dark:hover:bg-red-700;
  cursor: not-allowed;
}
</style>
