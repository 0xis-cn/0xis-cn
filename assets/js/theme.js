const verticalEnabledLanguages = ['cmn', 'lzh', 'wuu', 'ko', 'ja', 'art-x-danayo']

function calculateShadow() {
	const shadowBox = document.querySelector(".skip-link")
	if (!shadowBox)
		return
	const width = Math.floor(Math.min(window.innerWidth - 64, 896) / 32)
	const text = document.getElementById("ml").innerText
	let ptr = 0, leko = []
	for (let x = 1 - width; x < width; x += 2)
		for (let y = 0; y < 13; y += 2) {
			if (text.charCodeAt(ptr) % 2)
				leko.push(`${x}em ${y}em`)
			if ((ptr += 10) > text.length)
				ptr -= text.length
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

const preferences = [
	new Preference('lukinWalo', 1, [
		{ text: '\u23fe', title: 'Lights off', action: () => { document.querySelector('body').classList.add('dark-mode'); calculateColor(true) }},
		{ text: '\u2b59', title: 'System', action: themeWaloSystem },
		{ text: '\u23fd', title: 'Lights on', action: () => { document.querySelector('body').classList.remove('dark-mode'); calculateColor(false) }},
	]),
	new Preference('lukinLinja', 0, [
		{ text: 'Serif', action: () => { document.querySelector('body').classList.add('serif') } },
		{ text: 'Sans',  action: () => { document.querySelector('body').classList.remove('serif') } },
	]),
	new Preference('lukinSupaSinpin', 0, [
		{ text: '\u2b82', title: 'Horizontal', action: () => { document.querySelector('body').classList.remove('advanced-vertical') } },
		{ text: '\u2b87', title: 'Vertical',
			disabled: !verticalEnabledLanguages.includes(document.documentElement.lang), 
			action: () => {
				document.querySelector('body').classList.add('advanced-vertical') 
				document.querySelector('.ml-title').scrollIntoView()
			} 
		},
	]),
];

(() => {
	const menuBtn = document.querySelector('.ml-menu-button')
	if (menuBtn) {
		menuBtn.addEventListener('click', () => {
			document.querySelector('main').classList.toggle('with-drawer')
		})
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
	// const line = document.createElement('hr')
	// menu.appendChild(line)
	// const notbyai = '<a href="https://notbyai.fyi" style="margin-left:4px"><img class=ml-wordmark src="/assets/notbyai.svg" alt="Written by Human, Not by AI"></a>'
	// line.insertAdjacentHTML('afterend', notbyai)

	document.querySelector(".ml-drawer")?.addEventListener('click', (e) => {
		if (menuBtn && e.target === e.currentTarget)
			menuBtn.click()
	})

	const article = document.querySelector(".ml-article")
	if (article
		&& document.documentElement.lang == "cmn"
		&& localStorage.getItem("lukinSupaSinpin") === null) {
		function link(text, val) {
			const result = document.createElement('a')
			const btnLine = menu.children[2].children
			result.innerText = text
			result.addEventListener('click', () => {
				btnLine[val].click()
				result.parentNode.remove()
			})
			return result
		}
		const sinpinBanner = document.createElement("blockquote")
		sinpinBanner.append(
			"🙋🏻嘿！",
			"羞于干扰视线，但您可知道本站支持纵版？",
			link("立即切换", 1),
			"或在右下角菜单调节。",
			link("关闭且不再提示", 0),
		)
		article.prepend(sinpinBanner)
	}
	
	calculateShadow()
})()
