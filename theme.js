const verticalEnabledLanguages = ['cmn', 'lzh', 'wuu', 'ko', 'ja', 'art-x-danayo']

function pcs(x) {
	return `(prefers-color-scheme: ${x})`
}

const darkThemes = [...document.styleSheets]
	.flatMap(stylesheet => [...stylesheet.cssRules]
	.filter(x => x.conditionText && x.conditionText == pcs("dark")))
const lightThemes = [...document.styleSheets]
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
	const nasa = (performance.memory.usedJSHeapSize || new Date().getMilliseconds()) % 360
	document.querySelector("body").style.setProperty("--color-atlarge", `hsl(${nasa} 9% ${suno ? 11 : 89}%)`)
}

function calculateShadow() {
	const shadowBox = document.querySelector(".skip-link")
	const text = document.getElementById("ml")
	if (!shadowBox || !text)
		return
	const width = Math.floor(Math.min(window.innerWidth - 64, 896) / 32)
	let ptr = 0, leko = []
	for (let x = 1 - width; x < width; x += 2)
		for (let y = 1; y < 13; y += 2) {
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

const preferences = [
	new Preference('lukinWalo', 1, [
		{ text: '\u23fe', title: 'Lights off', action: () => { rh(darkThemes), y3(darkThemes), rh(lightThemes), y3(lightThemes, "not all"); calculateColor(true) }},
		{ text: '\u2b59', title: 'System', action: () => { y3(lightThemes, pcs("light")), rh(lightThemes, pcs("dark")), y3(darkThemes, pcs("dark")), rh(darkThemes, pcs("light")); calculateColor() }},
		{ text: '\u23fd', title: 'Lights on', action: () => { rh(lightThemes), y3(lightThemes), rh(darkThemes), y3(darkThemes, "not all"); calculateColor(false) }},
	]),
	new Preference('lukinLinja', 1, [
		{ text: 'Serif', action: () => { document.querySelector('body').classList.add('serif') } },
		{ text: 'Sans',  action: () => { document.querySelector('body').classList.remove('serif') } },
	]),
	new Preference('lukinSupaSinpin', 0, [
		{ text: '\u2b82', title: 'Horizontal', action: () => { document.querySelector('body').classList.remove('advanced-vertical') } },
		{ text: '\u2b87', title: 'Vertical',
			disabled: !verticalEnabledLanguages.includes(document.documentElement.lang), 
			action: () => {
				document.querySelector('body').classList.add('advanced-vertical') 
				document.querySelector('h1').scrollIntoView()
			} 
		},
	]),
];

(() => {
	const menuBtn = document.querySelector('.ml-menu-button')
	if (menuBtn) {
		if (1279 < window.innerWidth)
			menuBtn.click()
	}

	const base = document.getElementById('advanced')
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

	document.querySelector(".ml-drawer")?.addEventListener('click', (e) => {
		if (menuBtn && e.target === e.currentTarget)
			menuBtn.click()
	})

	if (!document.querySelector('body').classList.contains('advanced-vertical'))
		calculateShadow()
})()
