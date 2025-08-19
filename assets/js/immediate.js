const nasa = (performance.memory.usedJSHeapSize || screen.height || 43) % 360

function calculateColor(suno) {
	document.querySelector("body").style.setProperty("--color-atlarge", `hsl(${nasa} 9% ${suno ? 11 : 89}%)`)
}

function themeWaloSystem() {
	const list = document.querySelector('body').classList
	if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
		list.add('dark-mode')
		calculateColor(true)
	} else {
		list.remove('dark-mode')
		calculateColor(false)
	}
}
themeWaloSystem()

