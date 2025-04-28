<template>
    <v-app class="gradient-background">
        <v-navigation-drawer class="transparent-drawer">
            <!-- style="background: rgb(23, 38, 64); color: white;"> -->
            <v-list>
                <div class="!p-4 !font-bold !mx-5 d-flex align-center">
                    <h1>AgricultorUI</h1> <b>IAO</b>
                </div>
                <template v-for="(item, index) in menuItems" :key="index">
                    <v-list-group v-if="item.children" :prepend-icon="item.icon">
                        <template #activator="{ props }">
                            <v-list-item v-bind="props" :title="item.title" class="font-bold pt-2s" />
                        </template>

                        <v-list-item v-for="(child, idx) in item.children" :key="idx" :title="child.title"
                            :to="child.to" link class="font-bold" />
                    </v-list-group>

                    <v-list-item v-else :title="item.title" :to="item.to" :prepend-icon="item.icon" link
                        class="font-bold" />
                </template>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app
            style="margin-top: 0px ;background: linear-gradient(to right, rgb(19, 163, 217), rgb(33, 60, 112)); color: white;">
            <v-app-bar-nav-icon @click="$refs.drawer.toggle()" />
            <h1></h1>

            <v-spacer />

            <v-btn icon>
                <v-icon>mdi-bell</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>mdi-account-circle</v-icon>
            </v-btn>

        </v-app-bar>

        <v-main>
            <v-container class="py-4">
                <slot />
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>
import { menuItems } from '@/composables/menu'
</script>

<style scoped>
* {
    margin: 0;
    padding: 2px;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
}
</style>
