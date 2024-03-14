(() => {
	document.querySelector('.ml-menu-button').addEventListener('click', () => {
		document.querySelector('main').classList.toggle('with-drawer')
	})

	const base = document.getElementById('advanced')
	const btn = document.createElement('button')
	btn.classList.add('ml-menu-button')
	btn.innerText = '\u2383'
	btn.title = '\u5173\u706f'
	base.appendChild(btn)

	btn.addEventListener('click', () => {
		document.querySelector('body').classList.toggle('dark-mode')
	})
})()

