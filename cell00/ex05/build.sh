for x in "$@"; do
    if [[ ! -d "$x" ]]; then 
        mkdir "ex$x"
    fi
done
