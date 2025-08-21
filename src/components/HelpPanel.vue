<template>
  <div v-if="show" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" @click="$emit('close')">
    <div class="bg-white dark:bg-midnight-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden" @click.stop>
      <div class="flex items-center justify-between p-6 border-b border-sandal-200 dark:border-midnight-700">
        <h3 class="text-xl font-bold text-sandal-900 dark:text-midnight-100">Mermaid Syntax Help</h3>
        <button @click="$emit('close')" class="p-2 rounded-lg hover:bg-sandal-100 dark:hover:bg-midnight-700 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div class="p-6 overflow-y-auto max-h-96">
        <div class="space-y-4 text-sm text-sandal-700 dark:text-midnight-300">
          <div>
            <h4 class="font-semibold mb-2">Basic Flowchart</h4>
            <pre class="p-3 bg-sandal-50 dark:bg-midnight-900 rounded text-xs overflow-x-auto">graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Process]
    B -->|No| D[Alternative]</pre>
          </div>
          <div>
            <h4 class="font-semibold mb-2">Sequence Diagram</h4>
            <pre class="p-3 bg-sandal-50 dark:bg-midnight-900 rounded text-xs overflow-x-auto">sequenceDiagram
    Alice->>Bob: Hello Bob!
    Bob-->>Alice: Hello Alice!</pre>
          </div>
          <div>
            <h4 class="font-semibold mb-2">Gantt Chart</h4>
            <pre class="p-3 bg-sandal-50 dark:bg-midnight-900 rounded text-xs overflow-x-auto">gantt
    title Project Timeline
    section Phase 1
    Task A :done, a1, 2024-01-01, 7d
    Task B :active, b1, after a1, 5d</pre>
          </div>
          <div>
            <h4 class="font-semibold mb-2">Pie Chart</h4>
            <pre class="p-3 bg-sandal-50 dark:bg-midnight-900 rounded text-xs overflow-x-auto">pie title Language Usage
    "JavaScript" : 45
    "TypeScript" : 30
    "Python" : 15
    "Other" : 10</pre>
          </div>
          <div>
            <h4 class="font-semibold mb-2">Class Diagram</h4>
            <pre class="p-3 bg-sandal-50 dark:bg-midnight-900 rounded text-xs overflow-x-auto">classDiagram
    class User {
        +String name
        +login()
        +logout()
    }
    User --> Post : creates</pre>
          </div>
          <p class="text-xs text-sandal-600 dark:text-midnight-400 pt-4 border-t border-sandal-200 dark:border-midnight-700">
            Visit <a href="https://mermaid-js.github.io/mermaid/" target="_blank" class="text-amber-600 dark:text-blue-400 hover:underline">mermaid-js.github.io</a> for complete documentation.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props
defineProps<{
  show: boolean;
}>();

// Emits
defineEmits<{
  close: [];
}>();
</script>