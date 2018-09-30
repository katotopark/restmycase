import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _0aeb6be7 = () => import('../src/pages/questionPool.vue' /* webpackChunkName: "pages/questionPool" */).then(m => m.default || m)
const _94c5268c = () => import('../src/pages/participantPool.vue' /* webpackChunkName: "pages/participantPool" */).then(m => m.default || m)
const _7251d7ce = () => import('../src/pages/cases.vue' /* webpackChunkName: "pages/cases" */).then(m => m.default || m)
const _9b36685e = () => import('../src/pages/cases/index.vue' /* webpackChunkName: "pages/cases/index" */).then(m => m.default || m)
const _dbf36900 = () => import('../src/pages/cases/mintSuccess.vue' /* webpackChunkName: "pages/cases/mintSuccess" */).then(m => m.default || m)
const _62a716f0 = () => import('../src/pages/cases/loba3.vue' /* webpackChunkName: "pages/cases/loba3" */).then(m => m.default || m)
const _628ae7ee = () => import('../src/pages/cases/loba1.vue' /* webpackChunkName: "pages/cases/loba1" */).then(m => m.default || m)
const _6d138969 = () => import('../src/pages/cases/caseNaming.vue' /* webpackChunkName: "pages/cases/caseNaming" */).then(m => m.default || m)
const _6298ff6f = () => import('../src/pages/cases/loba2.vue' /* webpackChunkName: "pages/cases/loba2" */).then(m => m.default || m)
const _662cf730 = () => import('../src/pages/cases/lobas.vue' /* webpackChunkName: "pages/cases/lobas" */).then(m => m.default || m)
const _55a58e79 = () => import('../src/pages/cases/_id.vue' /* webpackChunkName: "pages/cases/_id" */).then(m => m.default || m)
const _e13cd388 = () => import('../src/pages/cases/_id/index.vue' /* webpackChunkName: "pages/cases/_id/index" */).then(m => m.default || m)
const _0c70242d = () => import('../src/pages/pfive.vue' /* webpackChunkName: "pages/pfive" */).then(m => m.default || m)
const _1924b5dd = () => import('../src/pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/questionPool",
			component: _0aeb6be7,
			name: "questionPool"
		},
		{
			path: "/participantPool",
			component: _94c5268c,
			name: "participantPool"
		},
		{
			path: "/cases",
			component: _7251d7ce,
			children: [
				{
					path: "",
					component: _9b36685e,
					name: "cases"
				},
				{
					path: "mintSuccess",
					component: _dbf36900,
					name: "cases-mintSuccess"
				},
				{
					path: "loba3",
					component: _62a716f0,
					name: "cases-loba3"
				},
				{
					path: "loba1",
					component: _628ae7ee,
					name: "cases-loba1"
				},
				{
					path: "caseNaming",
					component: _6d138969,
					name: "cases-caseNaming"
				},
				{
					path: "loba2",
					component: _6298ff6f,
					name: "cases-loba2"
				},
				{
					path: "lobas",
					component: _662cf730,
					name: "cases-lobas"
				},
				{
					path: ":id",
					component: _55a58e79,
					children: [
						{
							path: "",
							component: _e13cd388,
							name: "cases-id"
						}
					]
				}
			]
		},
		{
			path: "/pfive",
			component: _0c70242d,
			name: "pfive"
		},
		{
			path: "/",
			component: _1924b5dd,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
