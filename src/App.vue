<template>
  <router-view />
</template>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
}
*,
*::before,
*::after {
  box-sizing: border-box;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #49757a;
}
</style>
