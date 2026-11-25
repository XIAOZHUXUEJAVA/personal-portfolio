<template>
  <header class="section-heading handdrawn-rule">
    <div>
      <p class="section-eyebrow">{{ number }} / {{ label }}</p>
      <h2 :id="headingId" class="section-title">{{ title }}</h2>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  number: string;
  label: string;
  title: string;
  headingId?: string;
}>();
</script>
