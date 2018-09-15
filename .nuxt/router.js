import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _7251d7ce = () => import('../src/pages/cases.vue' /* webpackChunkName: "pages/cases" */).then(m => m.default || m)
const _9b36685e = () => import('../src/pages/cases/index.vue' /* webpackChunkName: "pages/cases/index" */).then(m => m.default || m)
const _2226e3b3 = () => import('../src/pages/cases/mint.vue' /* webpackChunkName: "pages/cases/mint" */).then(m => m.default || m)
const _82a75a56 = () => import('../src/pages/cases/lobaloba.vue' /* webpackChunkName: "pages/cases/lobaloba" */).then(m => m.default || m)
const _6d138969 = () => import('../src/pages/cases/caseNaming.vue' /* webpackChunkName: "pages/cases/caseNaming" */).then(m => m.default || m)
const _04e007f2 = () => import('../src/pages/cases/lobalobaTest.vue' /* webpackChunkName: "pages/cases/lobalobaTest" */).then(m => m.default || m)
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
			path: "/cases",
			component: _7251d7ce,
			children: [
				{
					path: "",
					component: _9b36685e,
					name: "cases"
				},
				{
					path: "mint",
					component: _2226e3b3,
					name: "cases-mint"
				},
				{
					path: "lobaloba",
					component: _82a75a56,
					name: "cases-lobaloba"
				},
				{
					path: "caseNaming",
					component: _6d138969,
					name: "cases-caseNaming"
				},
				{
					path: "lobalobaTest",
					component: _04e007f2,
					name: "cases-lobalobaTest"
				}
			]
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
