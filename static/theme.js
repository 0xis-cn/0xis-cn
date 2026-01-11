const verticalEnabledLanguages = ['cmn', 'lzh', 'wuu', 'ko', 'ja', 'art-001']
let verticalFirst = true

function pcs(x) {
	return `(prefers-color-scheme: ${x})`
}

const styleSheets = [...document.styleSheets].filter(x => x.href && x.href.startsWith(location.origin))
const darkThemes = styleSheets
	.flatMap(stylesheet => [...stylesheet.cssRules]
	.filter(x => x.conditionText && x.conditionText == pcs("dark")))
const lightThemes = styleSheets
	.flatMap(stylesheet => [...stylesheet.cssRules]
	.filter(x => x.conditionText && x.conditionText == pcs("light")))

function calculateColor(suno) {
	if (suno === undefined && window.matchMedia) {
		suno = window.matchMedia(pcs("dark"))
		suno.addListener(kasi => calculateColor(kasi.matches))
		suno = suno.matches
	}
	if (suno)
		document.querySelector('meta[name="theme-color"]').content = "#520819"
	const nasa = (performance?.memory?.usedJSHeapSize || new Date().getMilliseconds()) % 360
	document.body.style.setProperty("--color-atlarge", `hsl(${nasa} 9% ${suno ? 11 : 89}%)`)
}

function calculateShadow(shadowBox) {
	const text = document.getElementById("ml")
	if (!shadowBox || !text)
		return
	const width = Math.floor(Math.min(window.innerWidth - 64, 1099) / 32)
	let ptr = 0, leko = []
	for (let x = 1 - width; x < width; x += 2)
		for (let y = 2; y < 13; y += 2) {
			if (text.innerText.charCodeAt(ptr) % 2)
				leko.push(`${x}em ${y}em`)
			if ((ptr += 10) > text.innerText.length)
				ptr -= text.innerText.length
		}
	shadowBox.style.boxShadow = leko.join(",")
}

class Preference {
	constructor(localStorageKey, defaultValue, options) {
		this.localStorageKey = localStorageKey
		this.options = options
		const storage = localStorage.getItem(localStorageKey) || defaultValue
		if (!options[storage].disabled)
			options[storage].action(null)
	}
	line() {
		const outerThis = this
		const result = document.createElement('div')
		result.addEventListener('click', function (e) {
			const idx = Array.prototype.indexOf.call(
				e.target.parentNode.children, e.target)
			localStorage.setItem(outerThis.localStorageKey, idx)
		})
		for (const { text, action, title = null, disabled = null } of this.options) {
			const btn = document.createElement('button')
			btn.type = 'button'
			btn.classList.add('ml-menu-button')
			btn.innerText = text
			if (title)
				btn.title = title
			if (disabled)
				btn.disabled = disabled
			btn.addEventListener('click', action)
			result.appendChild(btn)
		}
		return result
	}
}

function y3(xs, colors) {
	colors = colors ? [colors] : [pcs("dark"), pcs("light")]
	xs.forEach(x => colors.forEach(color => x.media.appendMedium(color)))
}

function rh(xs, colors) {
	colors = colors ? [colors] : [pcs("dark"), pcs("light")]
	for (let color of colors)
		for (let x of xs)
			if (x.media.mediaText.includes(color))
				x.media.deleteMedium(color)
}

function pn(node) {
	const skipElements = ['SCRIPT', 'STYLE', 'NOSCRIPT', 'PRE', 'CODE', 'CITE', 'I']
	if (node.nodeType == Node.TEXT_NODE) {
		const reg = /(?<!\.)\s*\b(\w{1,2})\b\s*(?!\.)/g
		const newHtml = node.textContent.replace(reg, function (match) {
			return `<tcy>${match.trim()}</tcy>`
		})
		if (reg != newHtml) {
			const newNode = document.createElement("span")
			newNode.innerHTML = newHtml
			while (newNode.firstChild)
				node.parentNode.insertBefore(newNode.firstChild, node)
			node.parentNode.removeChild(node)
		}
	} else if (node.nodeType === Node.ELEMENT_NODE && !skipElements.includes(node.tagName) && !node.textContent.includes("`")) {
        Array.from(node.childNodes).forEach(pn)
    }
}

function cmtToggle() {
	if (document.body.classList.contains('advanced-vertical'))
		return alert("This stuff needs redesign under vertical mode.")
	document.body.classList.toggle('cmt')
}

const preferences = [
	new Preference('lukinWalo', 1, [
		{ text: '\u23fe', title: 'Lights off', action: () => { rh(darkThemes), y3(darkThemes), rh(lightThemes), y3(lightThemes, "not all"); calculateColor(true) }},
		{ text: '\u2b59', title: 'System', action: () => { y3(lightThemes, pcs("light")), rh(lightThemes, pcs("dark")), y3(darkThemes, pcs("dark")), rh(darkThemes, pcs("light")); calculateColor() }},
		{ text: '\u23fd', title: 'Lights on', action: () => { rh(lightThemes), y3(lightThemes), rh(darkThemes), y3(darkThemes, "not all"); calculateColor(false) }},
	]),
	new Preference('lukinLinja', 1, [
		{ text: 'Serif', action: () => { document.body.classList.add('serif') } },
		{ text: 'Sans',  action: () => { document.body.classList.remove('serif') } },
	]),
	new Preference('lukinSupaSinpin', 0, [
		{ text: '\u2b82', title: 'Horizontal', action: () => { document.body.classList.remove('advanced-vertical') } },
		{ text: '\u2b87', title: 'Vertical',
			disabled: !verticalEnabledLanguages.includes(document.documentElement.lang), 
			action: function () {
				document.body.classList.remove('cmt')
				document.body.classList.add('advanced-vertical') 
				document.querySelector('h1').scrollIntoView()
				if (verticalFirst) {
					verticalFirst = false
					pn(document.querySelector("article"))
				}
			} 
		},
	]),
];

(() => {
	const shadowBox = document.querySelector(".skip-link")
	const menuBtn = document.querySelector('.ml-menu-button')
	if (menuBtn) {
		if (1279 < window.innerWidth)
			menuBtn.click()
		menuBtn.addEventListener('click', () => shadowBox.classList.toggle("mxilxi"))
	}

	const base = document.getElementById('advanced')

	const cmtBtn = document.createElement('button')
	cmtBtn.type = 'button'
	cmtBtn.classList.add('ml-menu-button')
	cmtBtn.innerText = '\u0eaf'
	base.appendChild(cmtBtn)
	cmtBtn.addEventListener('click', cmtToggle)

	const btn = document.createElement('button')
	btn.type = 'button'
	btn.classList.add('ml-menu-button')
	btn.innerText = '\u2383'
	base.appendChild(btn)
	const menu = document.createElement('div')
	for (const i of preferences)
		menu.appendChild(i.line())
	btn.addEventListener('click', () => menu.classList.toggle('open'))
	base.appendChild(menu)

	const nealBtn = document.createElement('button')
	nealBtn.classList.add('ml-menu-button')
	nealBtn.innerText = "Click me"
	nealBtn.style.font = "1.125em 300 var(--base-font)"
	base.appendChild(nealBtn)

	document.querySelector(".ml-drawer")?.addEventListener('click', (e) => {
		if (menuBtn && e.target === e.currentTarget)
			menuBtn.click()
	})
})()

function debounce(func, delay = 682, immediate = true) {
	let timer = null;
	let result;

	return function(...args) {
		if (timer)
				clearTimeout(timer)
		if (immediate && !timer)
			result = func.apply(this, args)
		timer = setTimeout(() => {
			if (!immediate)
				result = func.apply(this, args)
			timer = null
		}, delay)
		return result
	}
}