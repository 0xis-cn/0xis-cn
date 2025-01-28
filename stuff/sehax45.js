function autoIter(data, mode, times) {
	const tab = [
		[0, 3, 6, 1, 5, 4, 2],
		[0, 5, 3, 2, 6, 1, 4],
		[0, 4, 1, 5, 2, 6, 3],
	]
		function r0(a, b) {
			return (a - b + 7) % 7;
		}
		
		function r12(a, b, ind) {
			if (a == b)
				return ind != 2 ? a : (-a + 7) % 7;
			return (Math.min(a, b) + tab[ind][Math.abs(a - b)]) % 7;
		}

		while (times-- > 0) {
			data[0] = data[data.length - 2]
			data[data.length - 1] = data[1]
			let next = new Array(data.length).fill(0)
			for (let i = 1; i < data.length - 1; i++)
				next[i] = r12(r0(data[i - 1], data[i]), r0(data[i], data[i + 1]), mode)
			data = next
		}
		return data
}

class Sehax45s {
	static get gfbiao() {
		return [
			0, 11, 27, 19, 43, 3, 35, 1, 47, 13, 46, 18, 36, 40, 17, 34, 15, 4, 29, 8, 14, 9, 44, 6, 7,
			48, 26, 21, 33, 45, 2, 24, 31, 30, 20, 41, 38, 32, 5, 28, 39, 10, 25, 16, 12, 42, 22, 37, 23
		]
	}
	static get igfbiao0() {
		return [
		3, 1, 4, 0, 2, 5, 3, 3, 2, 3, 5, 0, 6, 1, 2, 2, 6, 2, 1, 0, 4, 3, 6, 6, 4,
		6, 3, 0, 5, 2, 4, 4, 5, 4, 2, 0, 1, 6, 5, 5, 1, 5, 6, 0, 3, 4, 1, 1, 3
		]
	}
	static get igfbiao1() {
		return [
			4, 0, 2, 5, 3, 3, 2, 3, 5, 0, 6, 1, 2, 2, 6, 2, 1, 0, 4, 3, 6, 6, 4, 6, 3,
			0, 5, 2, 4, 4, 5, 4, 2, 0, 1, 6, 5, 5, 1, 5, 6, 0, 3, 4, 1, 1, 3, 1, 4
		]
	}
	static get x2se() {
		return [
			,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,  
			33, ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   29, ,   7,  ,   9,  6,  35, 13, 16, 8,  14, 45, 36, 21, ,   ,   ,   ,   ,   ,  
			,   37, 12, ,   5,  44, 24, ,   17, ,   ,   ,   39, ,   26, ,   ,   ,   ,   ,   9,  ,   15, ,   ,   19, ,   ,   ,   ,   ,   ,  
			,   31, 30, 43, 28, 20, 11, 47, 48, 41, 3,  40, 25, 23, 10, 42, 18, 21, 1,  2,  4,  27, 32, 38, 22, 46, 34, ,   ,   ,   ,   ,
		]
	}
	static get enc1() {
		return [6,
			1, 6, 5, 5, 1, 5, 1, 0, 3, 5, 2, 4, 6, 5, 3, 5, 6, 5, 1, 3, 3, 5, 0, 2, 3, 6, 0, 2, 3, 0, 3, 5, 0, 4, 0,
			2, 6, 4, 0, 5, 6, 5, 4, 6, 0, 0, 2, 5, 5, 2, 5, 4, 1, 0, 2, 5, 4, 0, 6, 6, 4, 1, 2, 0, 6, 4, 0, 2, 6, 3,
			1, 3, 6, 2, 6, 2, 1, 0, 2, 3, 6, 1, 6, 2, 1, 3, 2, 5, 1, 1, 1, 6, 0, 1, 4, 5, 6, 2, 0, 0, 1, 0, 1, 2, 0,
			4, 4, 4, 6, 2, 5, 3, 5, 2, 1, 3, 0, 6, 2, 0, 5, 6, 6, 4, 3, 0, 3, 3, 4, 5, 6, 2, 5, 0, 4, 1, 5, 4, 4, 4,
			3, 6, 3, 1, 2, 1, 3, 1, 2, 2, 2, 4, 2, 2, 5, 6, 2, 2, 4, 5, 6, 2, 1, 1, 0, 3, 3, 5, 6, 4, 3, 4, 0, 6, 0,
			6, 4, 1, 6, 6, 4, 5, 2, 5, 5, 2, 5, 2, 4, 5, 6, 6, 0, 0, 1, 0, 5, 3, 6, 2, 6, 2, 2, 2, 1, 6, 5, 4, 0, 2,
			6, 5, 3, 5, 6, 5, 1, 4, 2, 5, 1, 4, 3, 4, 2, 5, 6, 5, 0, 3, 5, 5, 6, 6, 0, 3, 0, 2, 2, 6, 0, 3, 0, 3, 6,
			2, 1, 2, 3, 3, 6, 4, 3, 2, 3, 4, 3, 5, 1, 6, 2, 6, 4, 3, 6, 5, 0, 4, 0, 2, 5, 0, 2, 3, 2, 4, 3, 4, 0, 2,
			6, 6, 3, 2, 1, 5, 6, 6, 6, 5, 6, 4, 3, 6, 2, 6, 5, 5, 4, 4, 5, 4, 4, 5, 6, 1, 2, 2, 3, 6, 0, 1, 4, 5, 6,
			2, 6, 0, 4, 0, 6, 6, 3, 5, 6, 1, 6, 5, 3, 1, 2, 2, 3, 0, 5, 5, 1, 4, 1, 4, 6, 5, 3, 5, 6, 5, 1, 6, 1, 6,
			4, 3, 6, 1, 2, 0, 3, 2, 0
		]
	}
	static get enc2() {
		return [2,
			3, 1, 3, 5, 1, 2, 3, 2, 2, 6, 5, 5, 6, 2, 0, 3, 4, 2, 5, 2, 1, 3, 3, 2, 6, 2, 1, 6, 6, 1, 5, 5, 1, 0, 2,
			5, 2, 1, 1, 6, 5, 5, 6, 5, 1, 0, 1, 1, 6, 1, 1, 5, 6, 1, 2, 4, 0, 5, 2, 5, 6, 3, 1, 6, 0, 1, 0, 6, 3, 4,
			6, 5, 0, 6, 6, 2, 0, 2, 3, 6, 0, 3, 2, 4, 3, 1, 3, 3, 6, 2, 1, 3, 5, 5, 6, 2, 5, 6, 4, 5, 1, 4, 2, 5, 6,
			5, 1, 0, 4, 0, 2, 5, 6, 4, 6, 1, 3, 6, 0, 4, 1, 2, 3, 6, 0, 3, 2, 4, 3, 4, 2, 4, 6, 5, 4, 4, 6, 2, 5, 2,
			2, 6, 2, 2, 1, 0, 3, 3, 6, 4, 3, 1, 5, 4, 0, 2, 6, 3, 5, 5, 6, 5, 0, 2, 4, 2, 5, 5, 1, 3, 1, 4, 3, 1, 4,
			5, 6, 2, 1, 3, 4, 6, 0, 6, 2, 6, 4, 1, 2, 0, 6, 5, 1, 3, 0, 2, 5, 1, 4, 0, 1, 3, 6, 1, 2, 3, 0, 3, 6, 5,
			0, 6, 1, 4, 4, 6, 2, 4, 1, 4, 5, 6, 5, 5, 6, 4, 3, 0, 5, 1, 6, 2, 3, 3, 4, 5, 6, 2, 0, 4, 6, 2, 5, 3, 3,
			5, 6, 4, 3, 0, 5, 1, 2, 0, 3, 2, 1, 2, 3, 4, 6, 5, 2, 5, 6, 1, 1, 5, 1, 0, 2, 5, 6, 4, 1, 2, 3, 1, 6, 4,
			0, 1, 1, 5, 6, 5, 4, 2, 3, 5, 5, 5, 0, 4, 2, 5, 6, 2, 5, 5, 3, 5, 6, 5, 2, 2, 3, 3, 6, 6, 0, 1, 4, 5, 6,
			6, 0, 1, 0, 2, 3, 2, 1, 2, 3, 3, 6, 2, 1, 4, 0, 2, 6, 5, 1, 4, 6, 5, 4, 3, 2, 5, 2, 3, 4, 0, 2, 6, 2, 6,
			6, 5, 1, 2, 1, 2, 3, 0, 5
		]
	}


	/**
	 * 用于元素乘法。. 以下为原注：
	 *
	 * @param sh 是对应得到的代表希顶字母的编
	 * @param x1 是上面随机编码中取的
	 * @param x2 是上面随机编码中取的
	 * @return 用于元素乘法
	 */
	static elmult(sh, x1, x2) {
		return (Sehax45s.gfbiao[sh] + Sehax45s.gfbiao[x1 * 7 + x2]) % 48;
	}

	fillSeventh(pos, code, cycle) {
		const lpos = Sehax45s.elmult(code, Sehax45s.enc1[pos + cycle], Sehax45s.enc1[pos + 1 + cycle])
		const rpos = Sehax45s.elmult(code, Sehax45s.enc2[pos + cycle], Sehax45s.enc2[pos + 1 + cycle])
		this.left [pos + 1]	= Sehax45s.igfbiao0[lpos];
		this.left [pos + 2]	= Sehax45s.igfbiao1[lpos];
		this.right[pos + 1]	= Sehax45s.igfbiao0[rpos];
		this.right[pos + 2]	= Sehax45s.igfbiao1[rpos];
	}

	/**
	 * 计算 SEHAX45 的主流程，无卫语句。.
	 *
	 * @param input 输入串，要求仅含有允许字符
	 * @return 所得数组
	 */
	digestUnguarded(input) {
		this.left  = new Array(182).fill(0)
		this.right = new Array(182).fill(0)
		let [remainder, cycle] = (() => {
			let cycle = 0
			while (true) {
				for (let i = 0; i < 180; i += 2) {
					const character = input.read();
					if (!character)
						return [i, cycle]
					this.fillSeventh(i, Sehax45s.x2se[character], cycle);
				}
				cycle = 180 ^ cycle;
			}
		})();

		input.close();
		if (remainder != 0) {
			while (remainder != 180) {
				this.fillSeventh(remainder, 33, cycle)
				remainder += 2;
			}
		}
		for (let i = 1; i < 181; i++) {
			this.left[i] %= 7;
			this.right[i] %= 7;
		}
		this.left  = autoIter(this.left,  0, 12)
		this.right = autoIter(this.right, 1, 12)
		this.right[0] = this.right[180];	  		// 使下方可用模数来取
		let outIter = new Array(182).fill(0)
		for (let i = 1; i < 181; i++)
			outIter[i] = (this.right[(11 + i) % 180] + this.left[i]) % 7;
		outIter = autoIter(outIter, 2, 12)
		let result = new Array(45)
		for (let i = 0; i < 45; i++)
			result[i] = (outIter[i + 1] + outIter[i + 46] + outIter[i + 91] + outIter[i + 136]) % 7;
		return result;
	}
}

class TextFakeReader {
	constructor (text) {
		this.text = text
		this.ptr = 0
	}
	read () {
		if (this.text.length == this.ptr)
			return null
		return this.text.charCodeAt(this.ptr++)
	}
	close() {}
}

function processFile() {
	for (const file of this.files) {

	}
}

(() => {
	document.getElementById("input").addEventListener("change", processFile)
})()
