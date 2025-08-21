<template>
  <div class="mb-8 p-4 rounded-xl bg-white/60 dark:bg-midnight-800/60 backdrop-blur-sm border border-sandal-200/50 dark:border-midnight-700/50 shadow-sm">
    <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      
      <!-- Left Controls -->
      <div class="flex flex-wrap items-center gap-3">
        <select 
          :value="selectedTemplate"
          @change="$emit('loadTemplate', ($event.target as HTMLSelectElement).value)" 
          class="px-4 py-2 rounded-lg border border-sandal-300 dark:border-midnight-600 bg-white dark:bg-midnight-800 text-sandal-900 dark:text-midnight-100 text-sm focus:ring-2 focus:ring-amber-500 dark:focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Choose template...</option>
          <option value="flowchart">🔄 Flowchart</option>
          <option value="sequence">👥 Sequence</option>
          <option value="gantt">📊 Gantt Chart</option>
          <option value="pie">🥧 Pie Chart</option>
          <option value="class">🏗️ Class Diagram</option>
        </select>

        <div class="h-6 w-px bg-sandal-300 dark:bg-midnight-600"></div>

        <button 
          @click="$emit('clearEditor')" 
          class="px-3 py-2 rounded-lg border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm font-medium"
        >
          Clear
        </button>

        <button 
          @click="$emit('toggleAutoCompile')" 
          :class="[
            'px-3 py-2 rounded-lg border text-sm font-medium transition-colors',
            autoCompile 
              ? 'border-green-300 dark:border-green-700 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20' 
              : 'border-sandal-300 dark:border-midnight-600 text-sandal-700 dark:text-midnight-300 hover:bg-sandal-50 dark:hover:bg-midnight-800'
          ]"
        >
          Auto-compile {{ autoCompile ? 'ON' : 'OFF' }}
        </button>

        <button 
          v-if="!autoCompile" 
          @click="$emit('renderDiagram')" 
          class="px-4 py-2 rounded-lg bg-amber-500 dark:bg-blue-500 text-white hover:bg-amber-600 dark:hover:bg-blue-600 transition-colors text-sm font-medium"
        >
          Render
        </button>
      </div>

      <!-- Right Controls -->
      <div class="flex items-center gap-3">
        <button 
          @click="$emit('toggleLayout')" 
          class="p-2 rounded-lg border border-sandal-300 dark:border-midnight-600 text-sandal-700 dark:text-midnight-300 hover:bg-sandal-50 dark:hover:bg-midnight-800 transition-colors"
          :title="isVertical ? 'Switch to horizontal layout' : 'Switch to vertical layout'"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="isVertical" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 4v16M9 4l-4 4m4-4l4 4"></path>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 9h16M4 9l4-4m-4 4l4 4"></path>
          </svg>
        </button>

        <button 
          @click="$emit('toggleHelp')" 
          class="p-2 rounded-lg border border-sandal-300 dark:border-midnight-600 text-sandal-700 dark:text-midnight-300 hover:bg-sandal-50 dark:hover:bg-midnight-800 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </button>

        <div class="relative">
          <button 
            @click="toggleExportMenu" 
            class="p-2 rounded-lg border border-sandal-300 dark:border-midnight-600 text-sandal-700 dark:text-midnight-300 hover:bg-sandal-50 dark:hover:bg-midnight-800 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </button>
          
          <div v-if="showExportMenu" class="absolute right-0 top-full mt-1 w-40 py-2 bg-white dark:bg-midnight-800 rounded-lg shadow-lg border border-sandal-200 dark:border-midnight-700 z-10">
            <button 
              v-for="option in exportOptions" 
              :key="option.format"
              @click="handleExport(option.format)" 
              class="w-full px-4 py-2 text-left text-sm text-sandal-900 dark:text-midnight-100 hover:bg-sandal-50 dark:hover:bg-midnight-700"
            >
              {{ option.label }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Props
defineProps<{
  autoCompile: boolean;
  isVertical: boolean;
  selectedTemplate: string;
}>();

// Emits
const emit = defineEmits<{
  loadTemplate: [template: string];
  clearEditor: [];
  toggleAutoCompile: [];
  renderDiagram: [];
  toggleLayout: [];
  toggleHelp: [];
  exportAs: [format: string];
}>();

// Local state
const showExportMenu = ref(false);

const exportOptions = [
  { format: 'svg', label: 'SVG' },
  { format: 'png', label: 'PNG' },
  { format: 'mermaid', label: 'Mermaid Code' }
];

// Methods
const toggleExportMenu = () => {
  showExportMenu.value = !showExportMenu.value;
};

const handleExport = (format: string) => {
  showExportMenu.value = false;
  emit('exportAs', format);
};

// Click outside handler
document.addEventListener('click', (e) => {
  if (showExportMenu.value && !(e.target as Element)?.closest('.relative')) {
    showExportMenu.value = false;
  }
});
</script>