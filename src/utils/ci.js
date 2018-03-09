const ci = {
    base: (imgUrl, width, height, mode) => {
        width ? `/w/${width}` : '';
        height ? `/h/${height}` : '';
        return `${url}${imgUrl}?imageView2/${mode}${width}${height}`;
    },
    equalRadio: (imgUrl, width, height) => this.base(imgUrl, width, height, 0),
};
