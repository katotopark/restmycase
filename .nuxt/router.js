import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _6b29e33c = () => import('../src/pages/pfive.vue' /* webpackChunkName: "pages/pfive" */).then(m => m.default || m)
const _dd0d36fa = () => import('../src/pages/caseRandom.vue' /* webpackChunkName: "pages/caseRandom" */).then(m => m.default || m)
const _b922cd36 = () => import('../src/pages/alp.vue' /* webpackChunkName: "pages/alp" */).then(m => m.default || m)
const _91307566 = () => import('../src/pages/about.vue' /* webpackChunkName: "pages/about" */).then(m => m.default || m)
const _a8125700 = () => import('../src/pages/aqp.vue' /* webpackChunkName: "pages/aqp" */).then(m => m.default || m)
const _304cc203 = () => import('../src/pages/cases.vue' /* webpackChunkName: "pages/cases" */).then(m => m.default || m)
const _1a9b0b74 = () => import('../src/pages/cases/index.vue' /* webpackChunkName: "pages/cases/index" */).then(m => m.default || m)
const _a39ae31c = () => import('../src/pages/cases/mintConfirm.vue' /* webpackChunkName: "pages/cases/mintConfirm" */).then(m => m.default || m)
const _ba167536 = () => import('../src/pages/cases/loba3.vue' /* webpackChunkName: "pages/cases/loba3" */).then(m => m.default || m)
const _ba4ed33a = () => import('../src/pages/cases/loba1.vue' /* webpackChunkName: "pages/cases/loba1" */).then(m => m.default || m)
const _07c99c14 = () => import('../src/pages/cases/caseNaming.vue' /* webpackChunkName: "pages/cases/caseNaming" */).then(m => m.default || m)
const _ba32a438 = () => import('../src/pages/cases/loba2.vue' /* webpackChunkName: "pages/cases/loba2" */).then(m => m.default || m)
const _b30ab4b6 = () => import('../src/pages/cases/lobas.vue' /* webpackChunkName: "pages/cases/lobas" */).then(m => m.default || m)
const _6b06562e = () => import('../src/pages/cases/_id.vue' /* webpackChunkName: "pages/cases/_id" */).then(m => m.default || m)
const _7b990231 = () => import('../src/pages/cases/_id/index.vue' /* webpackChunkName: "pages/cases/_id/index" */).then(m => m.default || m)
const _bc564ea2 = () => import('../src/pages/participantPool.vue' /* webpackChunkName: "pages/participantPool" */).then(m => m.default || m)
const _51c0bfdc = () => import('../src/pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)



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
			path: "/pfive",
			component: _6b29e33c,
			name: "pfive"
		},
		{
			path: "/caseRandom",
			component: _dd0d36fa,
			name: "caseRandom"
		},
		{
			path: "/alp",
			component: _b922cd36,
			name: "alp"
		},
		{
			path: "/about",
			component: _91307566,
			name: "about"
		},
		{
			path: "/aqp",
			component: _a8125700,
			name: "aqp"
		},
		{
			path: "/cases",
			component: _304cc203,
			children: [
				{
					path: "",
					component: _1a9b0b74,
					name: "cases"
				},
				{
					path: "mintConfirm",
					component: _a39ae31c,
					name: "cases-mintConfirm"
				},
				{
					path: "loba3",
					component: _ba167536,
					name: "cases-loba3"
				},
				{
					path: "loba1",
					component: _ba4ed33a,
					name: "cases-loba1"
				},
				{
					path: "caseNaming",
					component: _07c99c14,
					name: "cases-caseNaming"
				},
				{
					path: "loba2",
					component: _ba32a438,
					name: "cases-loba2"
				},
				{
					path: "lobas",
					component: _b30ab4b6,
					name: "cases-lobas"
				},
				{
					path: ":id",
					component: _6b06562e,
					children: [
						{
							path: "",
							component: _7b990231,
							name: "cases-id"
						}
					]
				}
			]
		},
		{
			path: "/participantPool",
			component: _bc564ea2,
			name: "participantPool"
		},
		{
			path: "/",
			component: _51c0bfdc,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
