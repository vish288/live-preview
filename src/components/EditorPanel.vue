<template>
  <div class="rounded-xl bg-white/60 dark:bg-midnight-800/60 backdrop-blur-sm border border-sandal-200/50 dark:border-midnight-700/50 shadow-sm overflow-hidden">
    <div class="flex items-center justify-between px-4 py-3 border-b border-sandal-200/50 dark:border-midnight-700/50 bg-sandal-50/50 dark:bg-midnight-900/50">
      <div class="flex items-center space-x-3">
        <div class="flex space-x-1.5">
          <div class="w-3 h-3 rounded-full bg-red-400"></div>
          <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div class="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <span class="text-sm font-medium text-sandal-800 dark:text-midnight-200">Editor</span>
      </div>
      <span class="text-xs text-sandal-600 dark:text-midnight-400">{{ code.length }} chars</span>
    </div>
    
    <textarea 
      :value="code"
      @input="handleInput"
      class="w-full h-full p-4 bg-transparent border-none outline-none resize-none font-mono text-sm text-sandal-900 dark:text-midnight-100 placeholder-sandal-500 dark:placeholder-midnight-500"
      placeholder="# Start typing your Mermaid diagram here...
graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action 1]
    B -->|No| D[Action 2]"
      spellcheck="false"
    />
  </div>
</template>

<script setup lang="ts">
// Props
defineProps<{
  code: string;
}>();

// Emits
const emit = defineEmits<{
  updateCode: [code: string];
}>();

// Methods
const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  emit('updateCode', target.value);
};
</script>

<style scoped>
/* Custom scrollbar for textarea */
textarea::-webkit-scrollbar {
  width: 8px;
}

textarea::-webkit-scrollbar-track {
  background: transparent;
}

textarea::-webkit-scrollbar-thumb {
  background: rgba(107, 114, 128, 0.3);
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: rgba(107, 114, 128, 0.5);
}

/* Dark mode scrollbar */
.dark textarea::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.3);
}

.dark textarea::-webkit-scrollbar-thumb:hover {
  background: rgba(148, 163, 184, 0.5);
}
</style>