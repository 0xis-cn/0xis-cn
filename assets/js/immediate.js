(() => {
	if (window.matchMedia('(prefers-color-scheme: dark)').matches)
		document.querySelector('body').classList.toggle('dark-mode')
})()

