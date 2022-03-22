import { createWebHistory, createRouter } from 'vue-router';

import Animals from "./components/Animals.vue"
import Animal from "./components/Animal.vue"

const routes = [
	{
		path: '',
		component: Animals
	},
    {
        path: '/animals/:id',
        component: Animal
    },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;