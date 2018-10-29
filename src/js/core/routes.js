import The404Page from '../pages/The404Page.vue';
import TheBourbonPage from '../pages/TheBourbonPage.vue';
import TheCocktailsPage from '../pages/TheCocktailsPage.vue';
import TheElementsPage from '../pages/TheElementsPage.vue';
import TheFindPage from '../pages/TheFindPage.vue';
import TheHomePage from '../pages/TheHomePage.vue';
import TheStoryPage from '../pages/TheStoryPage.vue';

const routes = [
  { path: '/', component: TheHomePage, meta: { skipLoading: true } },
  { path: '/bourbon', component: TheBourbonPage },
  { path: '/cocktails', component: TheCocktailsPage },
  { path: '/elements', component: TheElementsPage },
  { path: '/find', component: TheFindPage },
  { path: '/story', component: TheStoryPage },
  { path: '*', name: '404', component: The404Page }
];

export default routes;
