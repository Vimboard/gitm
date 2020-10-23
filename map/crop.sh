#!/bin/bash
TILE_SIZE=128

[ -z "$1" ] && echo "Ivalid usage, try: crop.sh <image-file>" && exit 1
convert -version || (echo "Can't find 'convert' command" && exit 1)
identify -version || (echo "Can't find 'identify' command" && exit 1)

cp "$1" map7.png
convert "$1" -resize 50% map6.png
convert "$1" -resize 25% map5.png
convert "$1" -resize 12.5% map4.png

crop() {
    local zoom=$1
    mkdir "$zoom"
    convert map${zoom}.png -crop ${TILE_SIZE}x${TILE_SIZE} ${zoom}/map${zoom}-%d.png

    local height=$(identify -format "%[fx:h]" map${zoom}.png)
    local width=$(identify -format "%[fx:w]" map${zoom}.png)

    local rows=$(( height/TILE_SIZE ))
    (( height%TILE_SIZE > 0 )) && (( rows++ ))
    local cols=$(( width/TILE_SIZE ))
    (( width%TILE_SIZE > 0 )) && (( cols++ ))
    local count=$(( rows*cols ))

    for (( i=0; i < count; i++ ))
    do
        local r=$(( i/cols ))
        local c=$(( i%cols ))

        mv ${zoom}/map${zoom}-${i}.png ${zoom}/map${zoom}-${r}x${c}.png
    done
}

crop 7
crop 6
crop 5
crop 4

