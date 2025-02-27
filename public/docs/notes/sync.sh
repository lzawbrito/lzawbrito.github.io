#!/bin/zsh

# This will sync both the logs and the latex template and push to the site

SITEDIR="/Users/lzawbrito/projects/lzawbrito.github.io/"
SRC="/Users/lzawbrito/Documents/notes/"
DEST="${SITEDIR}public/docs/notes/"

rsync -av \
	--exclude={'.*','*.mtc*','*.toc','*.maf','*.aux','_minted*','*.log','scripts/','*/handwritten/'} \
	${SRC} ${DEST}

rsync -av \
	{/Users/lzawbrito/latex-templates/lzawbrito-template.sty,/Users/lzawbrito/latex-templates/color-palette.tex} \
	"${DEST}/latex-templates"

# deploy to site
cd $SITEDIR
./deploy.sh
cd -

	