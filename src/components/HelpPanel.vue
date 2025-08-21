<template>
  <transition name="slide-fade">
    <div v-if="show" class="fixed right-0 top-0 h-full w-96 bg-github-canvas border-l border-github-border-default shadow-2xl z-50 overflow-hidden flex flex-col">
      <div class="bg-github-canvas-subtle px-6 py-4 border-b border-github-border-default flex justify-between items-center">
        <h2 class="text-lg font-semibold text-github-fg-default">Help & Documentation</h2>
        <button @click="$emit('update:show', false)" class="text-github-fg-muted hover:text-github-fg-default">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div class="flex-1 overflow-auto p-6">
        <div class="text-github-fg-muted">
          Help Panel (Phase 2.2) - Will contain documentation and examples
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
// Placeholder component
// Will be fully implemented in Phase 2.2: Component Architecture

interface Props {
  show: boolean;
  readmeContent?: string;
}

defineProps<Props>();

defineEmits<{
  'update:show': [value: boolean];
}>();
</script>