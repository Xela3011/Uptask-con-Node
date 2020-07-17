document.addEventListener('DOMContentLoaded', function(e) {
	var currentPage = document.querySelector('#currentPage');
	var totalPages = document.querySelector('#totalPages');
	var nextPageButton = document.querySelector('#nextPage');
	var previousPageButton = document.querySelector('#previousPage');
	var pages = document.querySelector('#pages');
	var pageContainer = document.querySelector('#pageContainer');
	var list = document.querySelector('#list');
	var format = document.querySelector('#formatSelect');

	(async function getData() {
		let data;
		try {
			data = await axios.get('http://localhost:5000/book').then((resp) => resp.data);
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Ha ocurrido un error'
			});
		}

		document.querySelector('#nextPage').addEventListener('click', function() {
			getNextPage();
		});
		document.querySelector('#previousPage').addEventListener('click', function() {
			getPreviousPage();
		});

		document.querySelector('#currentPage').addEventListener('keypress', function(e) {
			changePageByTextInput(e);
		});

		document.querySelector('#formatSelect').addEventListener('change', function() {
			changePageFormat(e);
		});

		data.books.forEach((book) => {
			/**********CREATE ELMENT********/
			var element = document.createElement('div');
			var textElement = document.createElement('p');
			var text = document.createTextNode(book.name);
			textElement.appendChild(text);

			element.insertAdjacentHTML('afterbegin', '<i class="material-icons">bookmark_border</i>');
			element.insertAdjacentElement('beforeend', textElement);
			element.className = 'book-link d-flex';
			list.appendChild(element);

			element.addEventListener('click', function() {
				pages.classList.remove('d-none');
				setFirstPage(book._id, book.totalPages);
				pageContainer.setAttribute('data-book-id', `${book._id}`);
				currentPage.setAttribute('data-current-page', 1);
			});
		});
	})();

	function setFirstPage(bookId, quantity) {
		currentPage.value = 1;
		totalPages.innerText = quantity;
		setPage(bookId, 1, format.value);
	}

	function convertPlainTextToHTML(pageContent) {
		var lines = pageContent.trim().split('\n');

		var htmlString = '';
		lines.forEach((line) => {
			if (line == '') {
				htmlString += '<br/>';
			} else {
				htmlString += `<p>${line}</p>`;
			}
		});
		return htmlString;
	}

	async function setPage(id, page, formatValue) {
		var pageContent;
		try {
			pageContent = await axios
				.get(`http://localhost:5000/book/${id}/page/${page}/${formatValue}`)
				.then((resp) => resp.data);
		} catch (error) {
			return Swal.fire({
				icon: 'error',
				title: 'Ha ocurrido un error'
			});
		}

		/***************INSERT PAGE TEXT**************/
		let pageTextContainer = document.querySelector('#pageTextContainer');
		while (pageTextContainer.firstChild) {
			pageTextContainer.removeChild(pageTextContainer.firstChild);
		}

		var htmlString = '';
		if (format.value === 'plain') {
			htmlString = convertPlainTextToHTML(pageContent);
		} else {
			htmlString = pageContent;
		}
		pageTextContainer.insertAdjacentHTML('afterbegin', htmlString);

		/******************SET BUTTONS STATUS************/
		if (Number(currentPage.value) > 1) {
			previousPageButton.disabled = false;
		} else {
			previousPageButton.disabled = true;
		}

		if (Number(currentPage.value) !== Number(totalPages.innerText)) {
			nextPageButton.disabled = false;
		} else {
			nextPageButton.disabled = true;
		}
	}

	function getNextPage() {
		var nextPage = Number(currentPage.value) + 1;
		setPage(pageContainer.getAttribute('data-book-id'), nextPage, format.value);
		currentPage.value = nextPage;
	}

	function getPreviousPage() {
		var previousPage = Number(currentPage.value) - 1;
		setPage(pageContainer.getAttribute('data-book-id'), previousPage, format.value);
		currentPage.value = previousPage;
	}

	function changePageByTextInput(e) {
		if (e.keyCode == 13 || event.which == 13) {
			if (currentPage.value > 0 && currentPage.value <= Number(totalPages.innerHTML)) {
				setPage(pageContainer.getAttribute('data-book-id'), currentPage.value, format.value);
				currentPage.setAttribute('data-current-page', currentPage.value);
			} else {
				currentPage.value = currentPage.getAttribute('data-current-page');
			}
		}
	}

	function changePageFormat() {
		setPage(pageContainer.getAttribute('data-book-id'), currentPage.value, format.value);
	}
});
