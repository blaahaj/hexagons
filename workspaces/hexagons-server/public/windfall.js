main();

function main() {
	alerts();
	dropdowns();
	forms();
	modals();
}

function alerts() {
	let alertElements = document.querySelectorAll("[data-component=alert]");

	for (const alertElement of alertElements) {
		alertElement.show();

		setTimeout(() => {
			alertElement.close();
		}, 5000);
	}
}

function dropdowns() {
	document.addEventListener("click", handleClickEvent);
	document.addEventListener("keydown", handleKeydownEvent);

	function handleClickEvent(e) {
		let action, target;

		const isClickOnMenu = e.target.matches("[role=menu]");
		const isClickOnElementInMenu = e.target.matches("[role=menu] *");
		const isClickOnLinkInMenu = e.target.matches("[role=menu] a");

		if ((isClickOnMenu || isClickOnElementInMenu) && !isClickOnLinkInMenu) {
			return;
		}

		let element = e.target;

		while (element && !action && !target) {
			action = element.dataset.action;
			target = element.dataset.target;
			element = element.parentElement;
		}

		if (!element) {
			hideDropdownMenus();

			return;
		}

		if (action === "toggle") {
			let targetElement = document.querySelector(target);

			if (!targetElement) {
				return;
			}

			const dropdownMenus = document.querySelectorAll("[role=dropdown] [role=menu]");

			for (let dropdownMenu of dropdownMenus) {
				if (dropdownMenu == targetElement) {
					if (isDropdownMenuOpen(dropdownMenu)) {
						closeDropdownMenu(dropdownMenu);
					} else {
						openDropdownMenu(dropdownMenu);
					}
				} else if (isDropdownMenuOpen(dropdownMenu)) {
					closeDropdownMenu(dropdownMenu);
				}
			}
		}
	}

	function handleKeydownEvent(e) {
		if (e.key === "Escape") {
			hideDropdownMenus();
		}
	}

	function isDropdownMenuOpen(dropdownMenu) {
		return dropdownMenu.classList.contains("opacity-100");
	}

	async function openDropdownMenu(dropdownMenu) {
		clearTimeout(dropdownMenu.timeout);

		dropdownMenu.classList.remove("hidden");
		dropdownMenu.classList.remove("ease-in", "duration-75", "opacity-0", "scale-95");
		dropdownMenu.classList.add("ease-out", "duration-75", "opacity-100", "scale-100");
	}

	async function closeDropdownMenu(dropdownMenu) {
		dropdownMenu.classList.remove("ease-out", "duration-75", "opacity-100", "scale-100");
		dropdownMenu.classList.add("ease-in", "duration-75", "opacity-0", "scale-95");

		dropdownMenu.timeout = setTimeout(() => {
			dropdownMenu.classList.add("hidden");
		}, 75);
	}

	function hideDropdownMenus() {
		const dropdownMenus = document.querySelectorAll("[role=dropdown] [role=menu]");

		for (let dropdownMenu of dropdownMenus) {
			if (isDropdownMenuOpen(dropdownMenu)) {
				closeDropdownMenu(dropdownMenu);
			}
		}
	}
}

function forms() {
	document.addEventListener("input", handleInputEvent);

	const forms = document.querySelectorAll("form");

	for (const form of forms) {
		processForm(form);
	}

	function handleInputEvent(e) {
		const form = e.target.form;

		if (!form) {
			return;
		}

		processForm(form);
	}

	function processForm(form) {
		const validity = form.checkValidity();

		const buttons = document.querySelectorAll("button");

		for (const button of buttons) {
			if (button.form !== form) {
				continue;
			}

			if (button.type !== "submit") {
				continue;
			}

			button.disabled = !validity;
		}
	}
}

function modals() {
	document.addEventListener("click", handleClickEvent);

	function handleClickEvent(e) {
		let action, target;

		let element = e.target;

		if (element.matches("dialog")) {
			element.close();
		}

		while (element && !action && !target) {
			action = element.dataset.action;
			target = element.dataset.target;
			element = element.parentElement;
		}

		if (action === "show" || action === "showModal") {
			let targetElement = document.querySelector(target);

			if (!targetElement) {
				return;
			}

			targetElement[action]();
		} else if (action === "close") {
			let targetElement = document.querySelector(target) || e.target.closest("dialog");

			if (!targetElement) {
				return;
			}

			if (targetElement.close) {
				targetElement.close();
			}
		} else if (action === "remove") {
			let targetElement = e.target.closest(target) || document.querySelector(target);

			if (!targetElement) {
				return;
			}

			if (targetElement.remove) {
				targetElement.remove();
			}
		}
	}
}
