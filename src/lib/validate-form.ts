interface IConfig {
	name: { pattern: RegExp };
	email: { pattern: RegExp };
	message: { pattern: RegExp };
}

type IErrors = {
	[K in keyof IConfig]: boolean;
};

type IInput = HTMLInputElement | HTMLTextAreaElement;

const form: HTMLFormElement | null = document.querySelector('.feedback-section__form');

const config: IConfig = {
	name: { pattern: /[<>!@#$%^&*()_]/g },
	email: { pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]{2,6}$/ },
	message: { pattern: /[<>!@#$%^&*()_]/g }
};

const errors: Partial<IErrors> = {};

let startValidation = false;

if (form) {
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		//При первом взаимодействии с формой - вешаем на форму слушатель "input"
		//И сразу же валидируем все инпуты
		if (!startValidation) {
			const inputs: NodeListOf<HTMLElement> = form.querySelectorAll('input, textarea');

			startValidationInputs();

			inputs.forEach((input) => {
				validateInputs(input as IInput);
			});

			startValidation = true;
		}
		// флаг доступа к отправке формы
		const isAllowedSubmit = !Object.values(errors).some((value) => value === true);

		if (isAllowedSubmit) {
			const formData = new FormData(form);

			for (let [key, value] of formData) {
				console.log({
					name: key,
					value,
					valid: true
				});
			}
			// ...
		}
	});
}

function validateEmail(input: IInput) {
	const inputName = input.name as keyof IConfig;

	if (inputName) {
		const pattern = config[inputName].pattern;

		if (!input.value.trim()) {
			setError(input);
			errors[inputName] = true;
		} else if (pattern.test(input.value)) {
			hideError(input);
			errors[inputName] = false;
		} else {
			setError(input);
			errors[inputName] = true;
		}
	}
}

function validateSimpleInput(input: IInput) {
	const inputName = input.name as keyof IConfig;
	if (inputName) {
		const pattern = config[inputName].pattern;
		if (pattern) {
			input.value = input.value.replace(pattern, '');
		}

		if (!input.value.trim()) {
			setError(input);
			errors[inputName] = true;
		} else {
			hideError(input);
			errors[inputName] = false;
		}
	}
}

function setError(input: IInput): void {
	input.classList.add('error');
}

function hideError(input: IInput): void {
	input.classList.remove('error');
}

function validateInputs(input: IInput) {
	const tagName = input.tagName.toLowerCase();

	switch (tagName) {
		case 'input':
			if (input.type === 'email') {
				validateEmail(input);
			} else {
				validateSimpleInput(input);
			}
			break;
		case 'textarea':
			validateSimpleInput(input);
			break;
		default:
			break;
	}
}

// Функция добавляющая прослушку события на форму
function startValidationInputs() {
	form?.addEventListener('input', (e) => {
		const target = e.target as IInput;
		validateInputs(target);
	});
}
