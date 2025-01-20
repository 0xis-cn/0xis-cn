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
		{ text: '\u23fe', title: 'Lights off', action: () => { document.querySelector('body').classList.add('dark-mode') }},
		{ text: '\u2b59', title: 'System', action: themeWaloSystem },
		{ text: '\u23fd', title: 'Lights on', action: () => { document.querySelector('body').classList.remove('dark-mode') }},
	]),
	new Preference('lukinLinja', 0, [
		{ text: 'Serif', action: () => { document.querySelector('body').classList.add('serif') } },
		{ text: 'Sans',  action: () => { document.querySelector('body').classList.remove('serif') } },
	]),
	new Preference('lukinSupaSinpin', 0, [
		{ text: '\u2b82', title: 'Horizontal', action: () => { document.querySelector('body').classList.remove('advanced-vertical') } },
		{ text: '\u2b87', title: 'Vertical',
			disabled: !['cmn', 'lzh', 'wuu', 'ko', 'ja'].includes(document.documentElement.lang), 
			action: () => {
				document.querySelector('body').classList.add('advanced-vertical') 
				document.querySelector('.ml-title').scrollIntoView()
			} 
		},
	]),
];

(() => {
	const menuBtn = document.querySelector('.ml-menu-button')
	if (menuBtn)
		menuBtn.addEventListener('click', () => {
			document.querySelector('main').classList.toggle('with-drawer')
		})

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
	const line = document.createElement('hr')
	menu.appendChild(line)
	const notbyai = '<a href="https://notbyai.fyi"><img class=ml-wordmark src="/assets/notbyai.svg" alt="Written by Human, Not by AI"></a>'
	line.insertAdjacentHTML('afterend', notbyai)
})()
