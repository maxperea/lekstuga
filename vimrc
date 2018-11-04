set guioptions-=m  "remove menu bar
set guioptions-=T  "remove toolbar
set guioptions-=r  "remove right-hand scroll bar
set guioptions-=L  "remove left-hand scroll bar

set nowrap
set wildmenu
set wildignore=*.o,*.obj,*.bak,*.exe,*.py[co],*.swp,*~,*.pyc,.svn,*.class
set foldmethod=syntax
set nofoldenable
set term=screen-256color
set nocompatible              " be iMproved, required
filetype off                  " required
colorscheme gruvbox
set background=dark
set tabstop=8 softtabstop=0 expandtab shiftwidth=2 smarttab
set shortmess+=c
set hlsearch            " Highlight search results.
set ignorecase          " Make searching case insensitive
set smartcase           " ... unless the query has capital letters.
set incsearch           " Incremental search.
set magic               " Use 'magic' patterns (extended regular expressions).
set linebreak
set relativenumber
set number
set autoindent
syntax on
set ruler
set showmode
set showcmd
set splitbelow          " Horizontal split below current.
set splitright          " Vertical split to right of current.
set hidden
set matchtime=2

if !&scrolloff
  set scrolloff=3       " Show next 3 lines while scrolling.
endif
if !&sidescrolloff
  set sidescrolloff=5   " Show next 5 columns while side-scrolling.
endif

" Tell Vim which characters to show for expanded TABs,
" trailing whitespace, and end-of-lines. VERY useful!
if &listchars ==# 'eol:$'
  set listchars=tab:>\ ,trail:-,extends:>,precedes:<,nbsp:+
endif
set list                " Show problematic characters.

" Also highlight all tabs and trailing whitespace characters.
" highlight ExtraWhitespace ctermbg=darkgreen guibg=darkgreen
" match ExtraWhitespace /\s\+$\|\t/


" Use <C-L> to clear the highlighting of :set hlsearch.
if maparg('<C-L>', 'n') ==# ''
  nnoremap <silent> <C-L> :nohlsearch<CR><C-L>
endif

"vertical line indentation
let g:indentLine_color_term = 239
let g:indentLine_color_gui = '#404040'
let g:indentLine_char = '|'

" KEYBINDINGS
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

" Misc keys
imap jk <Esc>
imap ii <Esc>
map <CR> o<Esc>
let mapleader = "\<Space>"
map ö ^
map ä $

" LEADER KEYS

" Search and Replace
nmap <Leader>s :%s//gc<Left><Left><Left>
"Quick function brackets
nmap <Leader><CR> a {<CR>}<Esc>O

"Quick system copypaste
map <leader>y "+y
map <leader>p "+p


autocmd BufWritePost *.tex Dispatch! latexmk -pdf main.tex
