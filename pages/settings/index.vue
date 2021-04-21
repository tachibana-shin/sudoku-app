<template>
  <v-row>
    <v-col cols="12">
      <v-app-bar app fixed flat color="appbar">
        <v-btn icon @click="$router.back()">
          <v-icon> mdi-arrow-left </v-icon>
        </v-btn>
        <v-toolbar-title class="font-weight-medium">
          Cài đặt
        </v-toolbar-title>
      </v-app-bar>

      <div class="my-2">
        <template
          v-for="({ text, sub, divider, noSwitch, prop }, index) in $store.state.settings
            .properties"
        >
          <v-divider v-if="divider" :key="index"></v-divider>
          <v-list-item v-else :key="index" :three-line="!!sub">
            <v-list-item-content>
              <v-list-item-title> {{ text }} </v-list-item-title>
              <v-list-item-subtitle v-if="sub">
                {{ sub }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action v-if="!noSwitch && prop">
              <v-switch inset :input-value="$store.state.settings[prop]" @change="$store.commit(`settings/set`, { prop, value: $event })"></v-switch>
            </v-list-item-action>
          </v-list-item>
        </template>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  meta: {
    noBottom: true
  }
};
</script>
