function themeWaloSystem() {
	const list = document.querySelector('body').classList
	if (window.matchMedia('(prefers-color-scheme: dark)').matches)
		list.add('dark-mode')
	else
		list.remove('dark-mode')
}
themeWaloSystem()

