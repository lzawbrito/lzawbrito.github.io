#!/bin/zsh

SRC="/Users/lzawbrito/Documents/notes/"
DEST="/Users/lzawbrito/projects/lzawbrito.github.io/public/docs/notes/"

rsync -av \
	--exclude={'.*','*.mtc*','*.toc','*.maf','*.aux','_minted*','*.log'} \
	${SRC} ${DEST}

rsync -av \
	{/Users/lzawbrito/latex-templates/lzawbrito-template.sty,/Users/lzawbrito/latex-templates/color-palette.tex} \
	"${DEST}/latex-templates"

# rsync /Users/lzawbrito/Documents/latex-templates/color-palette.tex \ 
# 		${DEST}


	