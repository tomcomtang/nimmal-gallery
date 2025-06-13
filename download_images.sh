#!/bin/bash

API_KEY="44328728-3e401556c50801f6eca7cf358"
BASE_URL="https://pixabay.com/api/"
PER_PAGE=20

# 下载函数
download_images() {
    local category=$1
    local query=$2
    local output_dir="public/images/gallery/$category"
    
    echo "Downloading $PER_PAGE images for $category..."
    
    # 获取图片URL
    response=$(curl -s "$BASE_URL?key=$API_KEY&q=$query&image_type=photo&per_page=$PER_PAGE&safesearch=true")
    
    # 下载每张图片
    for i in $(seq 0 $(($PER_PAGE-1))); do
        url=$(echo $response | jq -r ".hits[$i].webformatURL")
        if [ "$url" != "null" ]; then
            filename="$output_dir/${category}_$(($i+1)).jpg"
            echo "Downloading $filename..."
            curl -s "$url" -o "$filename"
            sleep 1  # 添加延迟以避免请求过快
        fi
    done
}

# 下载各个类别的图片
download_images "nature" "nature+landscape"
download_images "urban" "city+landscape"
download_images "travel" "travel+landscape"
download_images "architecture" "architecture+building"

echo "Download completed!" 