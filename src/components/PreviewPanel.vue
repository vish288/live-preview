<template>
  <div class="rounded-xl bg-white/60 dark:bg-midnight-800/60 backdrop-blur-sm border border-sandal-200/50 dark:border-midnight-700/50 shadow-sm overflow-hidden">
    <div class="flex items-center justify-between px-4 py-3 border-b border-sandal-200/50 dark:border-midnight-700/50 bg-sandal-50/50 dark:bg-midnight-900/50">
      <div class="flex items-center space-x-3">
        <div class="flex space-x-1.5">
          <div class="w-3 h-3 rounded-full bg-red-400"></div>
          <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div class="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <span class="text-sm font-medium text-sandal-800 dark:text-midnight-200">Preview</span>
      </div>
      <div class="flex items-center space-x-2">
        <div :class="['w-2 h-2 rounded-full', diagramHTML ? 'bg-green-400' : 'bg-sandal-400 dark:bg-midnight-500']"></div>
        <span class="text-xs text-sandal-600 dark:text-midnight-400">{{ diagramHTML ? 'Ready' : 'Waiting' }}</span>
      </div>
    </div>
    
    <div class="h-full p-4 overflow-auto bg-gradient-to-br from-sandal-25 to-white dark:from-midnight-950 dark:to-midnight-900">
      <div 
        v-if="diagramHTML" 
        v-html="diagramHTML" 
        class="flex items-center justify-center min-h-full"
      ></div>
      <div v-else-if="error" class="flex items-center justify-center min-h-full text-center">
        <div class="text-red-500">
          <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p class="font-medium">Syntax Error</p>
          <p class="text-sm text-red-400 mt-1">{{ error }}</p>
        </div>
      </div>
      <div v-else class="flex items-center justify-center min-h-full text-center">
        <div class="text-sandal-400 dark:text-midnight-500">
          <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <p class="text-sm">Your diagram will appear here</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props
defineProps<{
  diagramHTML: string;
  error: string;
}>();
</script>