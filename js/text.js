let wipeStatusBarText = () => {
	statusText.setAttribute('text', 'value', '');
};

let hideStatusBar = () => {
	statusText.setAttribute('visible', false);
};

let showStatusBar = (text = null) => {
	if (text) statusText.setAttribute('text', 'value', text);
	statusText.setAttribute('visible', true);
};