init: #HELP Initialize the local development environment
init: venv dev-requirements.txt
	./venv/bin/pip-sync \
		--quiet \
		dev-requirements.txt
	./venv/bin/pre-commit install

venv: # Create the local virtualenv
	python3.7 -m venv venv
	./venv/bin/pip install --quiet --upgrade pip
	./venv/bin/pip install pip-tools

requirements.txt: # Generate the lock file for production environments
requirements.txt: venv requirements.in
	./venv/bin/pip-compile \
		--quiet \
		--generate-hashes \
		--output-file requirements.txt \
		requirements.in

dev-requirements.txt: # Generate the lock file for development requirements
dev-requirements.txt: venv requirements.in dev-requirements.in
	./venv/bin/pip-compile \
		--quiet \
		--generate-hashes \
		--output-file dev-requirements.txt \
		requirements.in \
		dev-requirements.in
