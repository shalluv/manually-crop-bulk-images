export const formatNumber = (n: number) => {
	return n.toString().padStart(3, '0');
}

export const crop = (src: string, dest: string, left: number, top: number, right: number, bottom: number) => {
	const cw = right - left;
	const ch = bottom - top;
	const c = document.createElement("canvas");
	const ctx = c.getContext("2d");
	const link = document.createElement("a");

	let imgData: string;

	const img = new Image();
	img.onload = () => {
		c.width = cw;
		c.height = ch;
		ctx.drawImage(img, left, top, cw, ch, 0, 0, cw, ch);
		imgData = c.toDataURL("image/jpeg", 10.0);

		link.download = `${dest}-cropped.jpg`;
		link.href = imgData;
		link.click();

		link.remove();
		img.remove();
		c.remove();
	};
	img.src = src;
}