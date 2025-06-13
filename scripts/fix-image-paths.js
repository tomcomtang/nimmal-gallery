const fs = require('fs');
const path = require('path');

// 读取 gallery.json 文件
const galleryPath = path.join(__dirname, '../app/config/gallery.json');
const gallery = JSON.parse(fs.readFileSync(galleryPath, 'utf8'));

// 生成1-20之间的随机整数
function getRandomId() {
  return Math.floor(Math.random() * 20) + 1;
}

// 修改图片路径的函数
function fixImagePaths(categories) {
  for (const category in categories) {
    const albums = categories[category].albums;
    for (const album of albums) {
      // 修改封面图片路径
      if (album.coverImage) {
        album.coverImage = album.coverImage.replace(/\d+_\d+\.(jpg|png)$/, `_${getRandomId()}.$1`);
      }
      
      // 修改相册中的图片路径
      if (album.photos) {
        for (const photo of album.photos) {
          if (photo.url) {
            photo.url = photo.url.replace(/\d+_\d+\.(jpg|png)$/, `_${getRandomId()}.$1`);
          }
        }
      }
    }
  }
}

// 执行修改
fixImagePaths(gallery.categories);

// 写回文件
fs.writeFileSync(galleryPath, JSON.stringify(gallery, null, 2), 'utf8');

console.log('图片路径修改完成！'); 