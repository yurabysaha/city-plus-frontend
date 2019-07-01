import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Auth/Login'
import Registration from '@/components/Auth/Registration'
import Map from '@/components/Map'
import Topics from '@/components/Topics/Topics'
import Discounts from '@/components/Discounts/Discounts'
import MyDiscountCatalogs from '@/components/Discounts/MyDiscountCatalogs'
import Events from '@/components/Events/Events'
import EventDetail from '@/components/Events/EventDetail'
import EditProfile from '@/components/Profile/EditProfile'
import FriendList from '@/components/Friends/FriendList'


Vue.use(VueRouter);

export const router = new VueRouter({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/registration',
            name: 'registration',
            component: Registration
        },
        {
            path: '/map',
            name: 'map',
            component: Map
        },
        {
            path: '/topics',
            name: 'topics',
            component: Topics
        },
        {
            path: '/discounts',
            name: 'discounts',
            component: Discounts,
        },
        {
            path: '/discounts/my',
            name: 'my-discount-catalogs',
            component: MyDiscountCatalogs
        },
        {
            path: '/events',
            name: 'events',
            component: Events
        },
        {
            path: '/friends',
            name: 'friends',
            component: FriendList
        },
        {
            path: '/events/:eventId',
            name: 'event-detail',
            component: EventDetail,
            props: true,
        },
        {
            path: '/my_profile/edit',
            name: 'my-profile-edit',
            component: EditProfile,
        }

    ],
    mode: 'history'
});


router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login', '/registration'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('userToken');

    if (authRequired && !loggedIn) {
        return next('/login');
    }

    next();
});